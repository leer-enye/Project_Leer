class Challenge {
    constructor(roomId, subjectId, userScore) {
        this.roomId = roomId;
        this.subjectId = subjectId;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.score = userScore;
    }

    increaseQuestionIndex() {
        this.currentQuestionIndex += 1;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
}
module.exports = Challenge;
