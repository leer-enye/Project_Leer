export const DUMMY_PARAGRAPH = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud.`;
export const FLEX_ROW_TYPE = 'flex';
export const FLEX_ROW_JUSTIFY_CENTER = 'center';

// export const BASE_URL = 'http://leer.tosinamuda.com';
// export const BASE_URL = 'http://localhost:5000';
export const BASE_URL = ' https://leer-app.herokuapp.com';

export const SELECTED_MENU_ITEM = {
    challenge: 'challenge',
    home: 'home',
    practice: 'practice',
    profile: 'profile',
    resources: 'resources',
};

export const NEXT_LINKS = {
    challengeInfoLink: '/admin/challenge/challenge-info',
    challengeResultLink: '/admin/challenge/challenge-result',    
    courseSelectLink: '/admin/challenge/',
    modeSelectLink: '/admin/challenge/select-mode',
    opponentSelectLink: '/admin/challenge/choose-opponent',
    quizLink: '/admin/challenge/quiz',
};

export const PAGES_TEXT = {
    homePage: {
        label: 'Home section',
    },
    practicePage: {
        label: 'Practice section',
    },
    profilePage: {
        editText: 'edit',    
        primaryText: 'primary',
        viewText: 'view',
    },
    resourcesPage: {
        label: 'Resources section',
    },
};

export const CLASS_NAMES = {
    mb1: 'mb-1',
};

export const DEFAULT_PROPS = {
    quizPage: {
        questions: [
            {
                answer: 1,
                id: 1,
                options: [
                    { id: 1, value: 'Manny' },
                    { id: 2, value: 'Uche' },
                    { id: 3, value: 'Jude' },
                    { id: 4, value: 'Tosin' },
                ],
                question: DUMMY_PARAGRAPH.substring(0, 60),
            },
            {
                answer: 3,
                id: 2,
                options: [
                    { id: 1, value: 'CodeBoy' },
                    { id: 2, value: 'Ola' },
                    { id: 3, value: 'Eric' },
                    { id: 4, value: 'Merdoth' },
                ],
                question: DUMMY_PARAGRAPH.substring(0, 90),
            },
            {
                answer: 1,
                id: 3,
                options: [
                    { id: 1, value: 'Justice' },
                    { id: 2, value: 'Firecoder' },
                    { id: 3, value: 'Michael' },
                    { id: 4, value: 'Miracle' },
                ],
                question: DUMMY_PARAGRAPH.substring(0, 70),
            },
            {
                answer: 2,
                id: 4,
                options: [
                    { id: 1, value: 'Uche' },
                    { id: 2, value: 'Teenoh' },
                    { id: 3, value: 'Jude' },
                    { id: 4, value: 'Tosin' },
                ],
                question: DUMMY_PARAGRAPH.substring(0, 80),
            },
        ],
    },
};
