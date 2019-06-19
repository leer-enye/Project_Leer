class Challenge {
    constructor(roomId, subject, userScore) {
        this.roomId = roomId;
        this.subject = subject;
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
