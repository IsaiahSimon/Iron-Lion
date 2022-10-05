const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/listings");
const contactController = require("../controllers/contact");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Shows the homepage
// @route   GET /
router.get("/", homeController.getIndex);

//@desc   Show user profile
//@Route  GET /profile/
router.get("/account", ensureAuth, postsController.getAccount);

//@desc   Show user feed
//@Route  GET /feed
router.get("/listings", postsController.getListings);

//@desc   show login page
//@Route  GET /login/
router.get("/login", authController.getLogin);

//@desc   process login request
//@Route  POST /login
router.post("/login", authController.postLogin);

// @desc    Logout user
// @route   GET /logout
router.get("/logout", authController.logout);

//@desc   show signup page
//@Route  GET /signup
router.get("/signup", authController.getSignup);

//@desc   process signup request
//@Route  POST /signup
router.post("/signup", authController.postSignup);

//@desc   Show contact page
//@Route  GET /contact/
router.get('/contact', contactController.getContact);

//@desc   process signup request
//@Route  POST /signup
router.post('/contact', contactController.postContact);

module.exports = router;
