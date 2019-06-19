const AuthUrls = {
    loginURL: '/login',
    logoutURL: 'https://%s/logout',
    returnToURL: '/admin/profile',
};

const StatusText = {
    ERROR: 'error',
    FAIL: 'fail',
    SUCCESS: 'success',
};

const Ports = {
    httpPort: 80,
    httpsPort: 443,
};

module.exports = { AuthUrls, Ports, StatusText };
