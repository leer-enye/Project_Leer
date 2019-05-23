import { DUMMY_PARAGRAPH } from '../common/constants';

export const BUTTON_SIZE_LG = 'large';
export const BUTTON_TYPE_PRIMARY = 'primary';
export const FLEX_ROW_TYPE = 'flex';
export const FLEX_ROW_JUSTIFY_CENTER = 'center';
export const FLEX_ROW_ALIGN_CENTER = 'middle';
export const USER_ICON_TYPE = 'user';
export const SELECT_RANDOMLY = 'Select Randomly';

export const EXTRA_TEXTS = {
    backToHome: 'Back to Home',
    details: 'Details',
    greatGame: 'Great Game!',
    startNow: 'Start Now',
    timeLeft: 'Time Left',
    viewResults: 'View Results',
    vs: 'Vs',
    
};

export const CHALLENGE_MODES = [
    {
        icon: 'user',
        name: 'Solo',
        next: '/admin/challenge/challenge-info',
    },
    {
        icon: 'thunderbolt',
        name: 'Versus',
        next: '/admin/challenge/choose-opponent',
    },
];

export const CHALLENGE_PAGES_HEADERS = {
    'challengeInfoLabel': 'Challenge Info',
    'chooseOpponentLabel': 'Choose Opponent',
    'courseSelectLabel': 'Select Course',
    'modeSelectLabel': 'Select Mode',
    'opponentSelectLabel': 'Choose Opponent',
};

export const CLASS_NAMES = {
    challengerInfo: 'challenger-info',
    challengerInfo1: 'challenger-info--1',
    challengerInfoName: 'challenger-info__name',
    challengerInfoScore: 'challenger-info__score',
    challengersBox: 'challengers-box',
    courseCard: 'course-card',
    loser: 'loser',
    mb1: 'mb-1',
    mb4: 'mb-4',
    modeCard: 'mode-card',
    modeCardIcon: 'mode-card__icon',
    mr1: 'mr-1',
    mt1 : 'mt-1',
    mt4: 'mt-4',    
    onlineIcon: 'online-icon',
    opponentCard: 'opponent-card',
    opponentCardImg: 'opponent-card__img',
    opponentCardTextContent: 'opponent-card__text-content',
    quizCard: 'quiz-card',
    quizCardHeader: 'quiz-card__header',
    quizCardMain: 'quiz-card__main',
    quizCardOption: 'quiz-card__option',
    quizCardQuestion: 'quiz-card__question',
    resultCard: 'result-card',
    textCenter: 'text-center',
    timer: 'timer',
    timerLabel: 'timer__label',
    timerTime: 'timer__time',
    vsDivider: 'vs-divider',
    winner: 'winner',
};

export const DEFAULT_PROPS = {
    challengeInfo: {
        challengers: [
            { id: 1, image: '/static/images/uche.jpg', level: 'Level 1', username: 'Uche' },
            { id: 2, image: '/static/images/uche.jpg', level: 'Level 2', username: 'Manny' },
        ],
    },
    challengeResult: {
        defaultChallengers: [
            { 
                id: 1,
                image: '/static/images/uche.jpg',
                score: 120, 
                status: 'win', 
                username: 'Uche',
            },
            { 
                id: 2, 
                image: '/static/images/uche.jpg', 
                score: 100, 
                status: 'lose', 
                username: 'Manny',
            },
        ],
        defaultResultInfo: 'YOU WON',
    },
    courseSelect: {
        subjects: [
            { id: 1, name: 'Mathematics' },
            { id: 2, name: 'English' },
            { id: 3, name: 'Biology' },
            { id: 4, name: 'Physics' },
            { id: 5, name: 'Chemistry' },
            { id: 6, name: 'Government' },
        ],
    },
    opponentSelect: {
        opponents: [
            { id: 1, image: '/static/images/uche.jpg', username: 'Uche' },
            { id: 2, image: '/static/images/uche.jpg', username: 'Manny' },
            { id: 3, image: '/static/images/uche.jpg', username: 'Tosin' },
            { id: 4, image: '/static/images/uche.jpg', username: 'Jude' },
            { id: 5, image: '/static/images/uche.jpg', username: 'Teenoh' },
            { id: 6, image: '/static/images/uche.jpg', username: 'Ola' },
        ],
    },
    quiz: {
        defaultChallengers: [
            {
                id: 1,
                image: '/static/images/uche.jpg',
                score: 120,
                status: 'win',
                username: 'Uche',
            },
            {
                id: 2,
                image: '/static/images/uche.jpg',
                score: 100,
                status: 'lose',
                username: 'Manny',
            },
        ],
        question: {
            answer: 1,
            id: 1,
            options: [
                { id: 1, value: 'Manny' },
                { id: 2, value: 'Uche' },
                { id: 3, value: 'Jude' },
                { id: 4, value: 'Tosin' },
            ],
            question: DUMMY_PARAGRAPH,
        },
            
    },
};

