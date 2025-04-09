const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Article = require('./../models/article')

const router = express.Router();

// GET Signup Page
router.get("/signup", (req, res) => {
  res.render("auth/signup", { error: null });
});

// POST Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.render("auth/signup", { error: "Email already exists" });
    }
    user = new User({ name, email, password });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// GET Login Page
router.get("/login", (req, res) => {
  res.render("auth/login", { error: null });
});

// POST Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.render("auth/login", { error: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render("auth/login", { error: "Invalid email or password" });
      }
  
      req.session.user = user;
  
      // Fetch articles before rendering index.ejs
      const articles = await Article.find().sort({ createdAt: "desc" });
  
      res.render("articles/index", { articles }); // Redirecting to index.ejs with articles data
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
  

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
