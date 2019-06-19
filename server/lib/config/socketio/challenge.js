const { LOADING_STATE } = require('./constant');

const { loading, loaded, notLoaded } = LOADING_STATE;

class Challenge {
    constructor(roomId, subject, userScores, scoresReceivedStatus) {
        this.roomId = roomId;
        this.subject = subject;
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.scores = userScores;
        this.scoresReceivedStatus = scoresReceivedStatus;
        this.loadingState = notLoaded;
    }

    increaseQuestionIndex() {
        this.currentQuestionIndex += 1;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    updateLoadingStatus(newState) {
        if (newState === this.loadingState) return;
        if (
            newState === loaded ||
			newState === loading ||
			newState === notLoaded
        )
            this.loadingState = newState;
    }

    submitScore(userId, score) {
        this.scores.set(userId, score);
        this.scoresReceivedStatus.set(userId, true);
    }
}
module.exports = Challenge;
