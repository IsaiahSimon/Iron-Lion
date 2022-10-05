// TODO Implement the contact form, requires other node modules

module.exports = {
  getContact: (req, res) => {
    try {
      res.render("contact.ejs", {user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  postContact: (req, res) => {
    console.log(req.body);
    res.redirect("/contact");
  }
};
