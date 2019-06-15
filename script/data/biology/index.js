/* eslint-disable no-param-reassign */
const exam2010 = require('./2010.json');
const exam2011 = require('./2011.json');
const exam2012 = require('./2012.json');
const exam2013 = require('./2013.json');
const exam2014 = require('./2014.json');
const exam2015 = require('./2015.json');
const exam2016 = require('./2016.json');
const exam2017 = require('./2017.json');

const years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

const questions = [];

const formatQuestion = (question, year) => {
	const answers = { A: 0, B: 1, C: 2, D: 3 };
	question.forEach(item => {
		item.text = item.question;
		item.options = [
			item.option_a,
			item.option_b,
			item.option_c,
			item.option_d
		];
		item.answer = answers[item.answer];
		item.tags = ['JAMB', year];

		delete item.option_a;
		delete item.option_b;
		delete item.option_c;
		delete item.option_d;
		delete item.solution;
		delete item.question;

		questions.push(item);
	});
};

[
	exam2010,
	exam2011,
	exam2012,
	exam2013,
	exam2014,
	exam2015,
	exam2016,
	exam2017
].forEach((item, index) => formatQuestion(item, years[index]));

module.exports = questions;
