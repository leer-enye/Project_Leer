const dotenv = require('dotenv');
const mongoose = require('mongoose');
const accounts = require('./accounts');
const biology = require('./biology');
const chemistry = require('./chemistry');
const commerce = require('./commerce');
const crs = require('./crs');
const economics = require('./economics');
const english = require('./english');
const government = require('./government');
const literature = require('./literature');
const mathematics = require('./mathematics');
const physics = require('./physics');
const subjects = require('./subjects.json');
const { Subject, Question } = require('../../server/models');

dotenv.config();
const { NODE_ENV, DATABASE, DB_CONNECT_TIMEOUT } = process.env;
const dev = NODE_ENV !== 'production';
const _DB_CONNECT_TIMEOUT = !dev ? Number(DB_CONNECT_TIMEOUT) : 4000;
const DB_OPTIONS = {
    connectTimeoutMS: _DB_CONNECT_TIMEOUT,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
};

const subjectMap = new Map([
    ['accounts', accounts],
    ['biology', biology],
    ['chemistry', chemistry],
    ['commerce', commerce],
    ['crs', crs],
    ['economics', economics],
    ['english', english],
    ['government', government],
    ['literature', literature],
    ['mathematics', mathematics],
    ['physics', physics],
]);

const connectDb = async (connectionString, options) => {
    try {
        await mongoose.connect(connectionString, options);
        console.log(`MongoDB connected to ${DATABASE}`);
    } catch (err) {
        console.log(err);
    }
};
const clearDb = async Model => {
    try {
        await Model.deleteMany({});
    } catch (exception) {
        console.error(exception);
    }
};

const batchInsert = async (Model, modelList) => {
    let response;
    try {
        const data = await Model.insertMany(modelList);
        response = data;
    } catch (exception) {
        console.error(exception);
    }
    return response;
};

const run = async () => {
    await connectDb(DATABASE, DB_OPTIONS);
    [Subject, Question].forEach(async item => clearDb(item));
    const subjectModelList = subjects.map(s => new Subject(s));
    const allSubjects = await batchInsert(Subject, subjectModelList);

    subjectMap.forEach((value, key) => {
        value.forEach(item => {
            const [foundSubject] =
				allSubjects.filter(s => s.name === key) || [];
            // eslint-disable-next-line no-param-reassign
            if (foundSubject) item.subjectId = foundSubject._id;
        });
    });

    const questions = [
        ...accounts,
        ...biology,
        ...chemistry,
        ...commerce,
        ...crs,
        ...economics,
        ...english,
        ...government,
        ...literature,
        ...mathematics,
        ...physics,
    ];
    const questionModelListPromise = await questions.map(
        async q => new Question(q)
    );
    const questionModelList = await Promise.all(questionModelListPromise);
    const allQuestions = await batchInsert(Question, questionModelList);

    return allQuestions;
};

run()
    .then(data => console.log(data))
    .catch(ex => {
        console.log(ex);
    });
