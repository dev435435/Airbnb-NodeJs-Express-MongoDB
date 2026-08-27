const {check, validationResult}= require("express-validator");
const users = require("../Model/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "Login",
    isLoggedIn: false,
    errors:[],
    oldInput : {email:""},
    user:{},
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await users.findOne({ email});
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "Login",
      isLoggedIn: false,
      errors: ["Such user does not exist"],
      oldInput: {email},
      user:{} 
    });
  }
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch){
  return  res.status(422).render("auth/login", {
    pageTitle: "Login",
    currentPage: "Login",
    isLoggedIn: false,
    errors: ["Invalid password"],
    oldInput: { email},
    user:{}
  });
}


  req.session.isLoggedIn = true;
  req.session.user = {
  _id: user._id.toString(),
  email: user.email,
  userType: user.userType,
};

req.session.save((err) => {
  if (err) {
    console.log("Session save error:", err);
  }
  res.redirect("/homes");
});

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};


exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "Signup",
    isLoggedIn: false,
    errors:[],
    oldInput : {firstname:"",lastname:"",email:"", password:"", userTypeName:""},
    user:{}, 
  });
};
exports.postSignUp = [
  check("firstname")
    .notEmpty()
    .withMessage("First name is require")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should have minimum 2 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters"),

  check("lastname")
    .notEmpty()
    .withMessage("Last name is require")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name should have minimum 2 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name can only contain letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .notEmpty()
    .withMessage("Password is require")
    .isLength({ min: 8 })
    .withMessage("Password should have minimum 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast one lower case letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast one upper case letter")
    .matches(/[!@#$%^&*()-_+=<>.,]/)
    .withMessage("Password must contain one special character")
    .trim(),

  check("confirmpassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("User type is require")
    .isIn(["guest", "host"])
    .withMessage("Invalid userType"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept terms and conditions")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("Please accept terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const {firstname,lastname,email, password, userType} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).render("auth/signup",{
      pageTitle : "Signup",
      currentPage: "Signup",
      isLoggedIn : false,
      errors: errors.array().map(err=>err.msg),
      oldInput:{firstname,lastname,email, password, userType},
      user:{},
    });
    }
    
   bcrypt.hash(password, 12).then(hashedPassword=>{
    const user = new users({firstname,lastname,email, password:hashedPassword, userType});
    return user.save();
   }).then(()=>{
    res.redirect("/login");
   }).catch(err=>{
    return res.status(422).render("auth/signup",{
      pageTitle : "Signup",
      currentPage: "Signup",
      isLoggedIn : false,
      errors: [err.message],
      oldInput:{firstname,lastname,email, password, userType},
      user:{},
    });
   });
  }
]

