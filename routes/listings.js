const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const listingsController = require("../controllers/listings");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Shows new form for new listing entry
// @route   GET /listings/newListing
router.get("/newListing", ensureAuth, listingsController.showNewListingForm);

// @desc    Creates a new listing
// @route   POST /listings
router.post("/", upload.single("file"), listingsController.createListing);

// @desc    Shows the listing with the given id
// @route   GET /listings/:id
router.get("/:id", ensureAuth, listingsController.showListing);

// @desc    Shows the edit form for the listing with the given id
// @route   GET /listings/:id/edit
router.get("/:id/edit", ensureAuth, listingsController.showEditListingForm);

// @desc    Update the listing with the given id
// @route   GET /listings/:id
router.put("/:id", ensureAuth, listingsController.editListing);

// @desc    Delete the listing with the given id
// @route   DELETE /listings/:id
router.delete("/:id", listingsController.deleteListing);

module.exports = router;
