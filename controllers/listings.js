const cloudinary = require("../middleware/cloudinary");
const Listing = require("../models/Listing");


module.exports = {
  //TODO move getAccount to auth controller
  getAccount: async (req, res) => {
    try {
      res.render("account.ejs", {user: req.user})
    } catch (err) {
      console.log(err);
    }
  },
  getListings: async (req, res) => {
    try {
      const foundListings = await Listing.find().sort({ createdAt: "desc" }).lean();
      const foundListing = await Listing.findById(req.params.id);
      res.render("listings.ejs", { listings: foundListings, user: req.user, listing: foundListing });
    } catch (err) {
      console.log(err);
      s;
    }
  },
  showNewListingForm: (req, res) => {
    try {
      res.render("newListing.ejs", {user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createListing: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Listing.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.description,
        price: req.body.price,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        user: req.user.id,
      });
      console.log("Listing has been added!");
      res.redirect("/listings");
    } catch (err) {
      console.error(err);
      res.render("newListing.ejs");
    }
  },
  showListing: async (req, res) => {
    try {
      const foundListing = await Listing.findById(req.params.id);
      const foundListings = await Listing.find().sort({ createdAt: "desc" }).lean();
      res.render("showListing.ejs", { listing: foundListing, user:req.user, listings: foundListings });
    } catch (err) {
      console.log(err);
    }
  },
  showEditListingForm: async (req, res) => {
    try {
      const foundListing = await Listing.findById(req.params.id);
      res.render("editListing.ejs", { listing: foundListing, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  editListing: async (req, res) => {
    try {
      const foundListing = await Listing.findById(req.params.id);
      res.render("editListing.ejs", { listing: foundListing });
    } catch (err) {
      console.log(err);
    }
  },
  deleteListing: async (req, res) => {
    try {
      // Find post by id
      let listing = await Listing.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(listing.cloudinaryId);
      // Delete post from db
      await Listing.remove({ _id: req.params.id });
      console.log("Deleted Listing");
      res.redirect("/listings");
    } catch (err) {
      res.redirect("/listings");
    }
  },
};
