export const VIEW_PROFILE_FIELDS = {
    bioLabel: 'Bio',
    dateJoinedLabel: 'Date Joined',
    fullNameLabel: 'Full Name',
    highSchoolLabel: 'High School',
    intendedUniLabel: 'Intended University',
    scoreLabel: 'Score',
    socialsLabel: 'Social Accounts',
    usernameLabel: 'Username',  
};

export const EDIT_PROFILE_FIELDS = {
    ...VIEW_PROFILE_FIELDS,
    bioLabel: 'My Bio',
    firstNameLabel: 'First Name',
    getLocationLabel: 'Get Location',
    lastNameLabel: 'Last Name',
    locationLabel: 'Location',
    profilePhotoLabel: 'Profile Photo',
    profilePhotoPreviewAlt: 'Profile Preview',
    uploadLabel: 'Upload',
};

export const EDIT_PROFILE_UPLOAD_LIST_TYPE = 'picture-card';

export const EDIT_PROFILE_TITLE = 'Update Profile';

export const DEFAULT_USER_PROPS = {
    bio: 'I love mathematics, physics, chemistry and further maths',
    dateJoined: '24th April 2019',
    firstName: 'Patrick',
    highSchool: 'Airforce Secondary School, Ikeja',
    intendedUni: 'University of Nigeria',
    lastName: 'Akpatabor',
    score: 100,
    socials: [
        { type: 'facebook', url: '/' },
        { type: 'twitter', url: '/' },
        { type: 'instagram', url: '/' },
    ],
    username: 'Pato53',
};

export const CLASS_NAMES = {
    antUploadText: 'ant-upload-text',
    card: 'card',
    infoField: 'info-field',
    locationInput: 'location-input',
    mb1: 'mb-1',
    mb2: 'mb-2',
    socialIcon: 'social-icon',
    socialIcons: 'social-icons',
    textCenter: 'text-center',
    w100: 'w-100',
    w80: 'w-80',
};

export const BUTTON_PRIMARY = 'primary';

export const ICONS = {
    facebook: 'facebook',
    instagram: 'instagram',
    plus: 'plus',
    twitter: 'twitter',
};

export const SOCIAL_ICON_THEME = 'filled';

export const TARGET_BLANK = '_blank';
