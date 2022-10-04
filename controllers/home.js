const Listing = require("../models/Listing");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: "desc" }).lean();
      res.render("index.ejs", { listings: listings });
    } catch (err) {
      console.log(err);
    }
  },
};
