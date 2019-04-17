const express = require('express');

const router = express.Router();
const UserController = require('../../controllers/user');

/**
 * @route GET api/users/test
 * @desc Tests user route
 * @access Public
 */
router.get('/test', UserController.test);

module.exports = router;
