const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateTaskInput = [
    check('title')
        .exists({ checkFalsy: true }),
    check('assignee')
        .exists({ checkFalsy: true }),
    handleValidationErrors
]