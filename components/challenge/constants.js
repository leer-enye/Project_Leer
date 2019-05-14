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

export const CLASSNAMES = {

    challengerInfo: 'challenger-info',
    challengersBox: 'challengers-box',
    courseCard: 'course-card',
    mb1: 'mb-1',
    mb4: 'mb-4',
    modeCard: 'mode-card',
    modeCardIcon: 'mode-card__icon',
    mt1 : 'mt-1',
    mt4: 'mt-4',    
    onlineIcon: 'online-icon',
    opponentCard: 'opponent-card',
    opponentCardImg: 'opponent-card__img',
    opponentCardTextContent: 'opponent-card__text-content',
    textCenter: 'text-center',
    
};

export const DEFAULT_PROPS = {
    challengeInfo: {
        challengers: [
            { id: 1, image: '/static/images/uche.jpg', level: 'Level 1', username: 'Uche' },
            { id: 2, image: '/static/images/uche.jpg', level: 'Level 2', username: 'Manny' },
        ],
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
};

export const BUTTON_SIZE_LG = 'large';
export const BUTTON_TYPE_PRIMARY = 'primary';
export const DUMMY_PARAGRAPH = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco 
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
dolor in reprehenderit in voluptate velit esse cillum dolore eu 
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
proident, sunt in culpa qui officia deserunt mollit anim id est 
laborum.`;
export const FLEX_ROW_TYPE = 'flex';
export const FLEX_ROW_JUSTIFY_CENTER = 'center';
export const FLEX_ROW_ALIGN_CENTER = 'middle';
export const USER_ICON_TYPE = 'user';
export const SELECT_RANDOMLY = 'Select Randomly';

export const EXTRA_TEXTS = {
    details: 'Details',
    startNow: 'Start Now',
    vs: 'Vs',
};
