const { check } = require("express-validator");

exports.userSignupValidator = [
  check("surname")
    .not()
    .isEmpty()
    .withMessage("Surname is required"),

  check("firstname")
    .not()
    .isEmpty()
    .withMessage("Firstname is required"),

  check("othername")
    .not()
    .isEmpty()
    .withMessage("Othername is required"),

  check("email")
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("phonenumber")
    .isMobilePhone()
    .withMessage("Phone Number is required"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),

  check("subject")
    .notEmpty()
    .isArray()
    .withMessage("Subject cant be empty")
];
