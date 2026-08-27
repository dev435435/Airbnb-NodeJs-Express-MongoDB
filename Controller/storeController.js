//Local Module
const Home = require("../Model/home");
const { param } = require("../routes/storeRouter");
const users = require("../Model/user");
const path = require("path");
const rootDir = require("../utils/pathUtils");


exports.getHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "home",
      currentPage: "home-list",
      isLoggedIn: req.isLoggedIn,
      user:req.session.user,
    })
  });
};

exports.getIndex = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "index",
      currentPage: "index",
     isLoggedIn: req.isLoggedIn,
      user:req.session.user,
    })
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/bookings", {
      registeredHomes: registeredHomes,
      pageTitle: "My bookings",
      currentPage: "bookings",
      isLoggedIn: req.isLoggedIn,
      user:req.session.user,
    })
  });
};

exports.getFavourites = async (req, res, next) => {
  const userID = req.session.user._id;
  console.log("UserID in favourites:", userID);
  const user =await users.findById(userID).populate('favourites');
      res.render("store/favourite-list", {
        favouriteHomes: user.favourites,
        pageTitle: "My favourites",
        currentPage: "favourite-list",
        isLoggedIn: req.isLoggedIn,
        user:req.session.user
      });
    
  };

exports.getHomeDetails = (req, res, next) => {
  const homeID = req.params.homeID;
  Home.findById(homeID).then(home => {
    console.log("HomeID is:", homeID);
    if (!home) {
      console.log("Home not found!");
      res.redirect("/homes");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-list",
        isLoggedIn: req.isLoggedIn,
        user:req.session.user,
      });
    }
  });
};

exports.postAddToFavourites = async (req, res, next) => {
  const HomeID = req.body.id;
  const userID = req.session.user._id;
  const user = await users.findById(userID);
     if (!user.favourites.includes(HomeID)) {
    user.favourites.push(HomeID);
    await user.save();
  }
  res.redirect("/favourite-list");
};




exports.postDeleteToFavourites = async (req, res, next) => {
   const HomeID = req.params.homeID;
   const userID = req.session.user._id;
   const user = await users.findById(userID);
   console.log("HomeID to remove:", HomeID);
   if (user.favourites.includes(HomeID)) {
    user.favourites = user.favourites.filter(fav => fav != HomeID);
   await user.save();
  }
  res.redirect("/favourite-list");
};

exports.getHomeRules = [(req, res, next) => {
  if(!req.session.isLoggedIn){
    return res.redirect("/login");
  }
  next(); 
},

(req, res, next) => {
  console.log("Downloading rules file");
  const homeID = req.params.homeID;
  const rulesFileName = '6959e619ce63bef48914f9b6.pdf'; // Assuming a static rules file for simplicity
  const filePath = path.join(rootDir,'rules', rulesFileName);
  res.download(filePath, 'rulesFileName.pdf')
}

];