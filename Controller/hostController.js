//Local Module
const Home = require("../Model/home");
const fs = require("fs");

exports.getAddhome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Addhome",
    currentPage: "Addhome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};


exports.getEditHomes = (req, res, next) => {
  const homeID = req.params.homeID;
  const editing = req.query.editing === 'true';
  Home.findById(homeID).then(Home => {
    if (!Home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      Home: Home,
      pageTitle: "Addhome",
      currentPage: "Addhome",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  })
};

exports.postEditHomes = (req, res, next) => {
  const { houseName, Pricepernight, Locations, Ratings, description, id } = req.body;
  Home.findById(id).then((home) => {
    home.houseName = houseName, home.Pricepernight = Pricepernight, home.Locations = Locations, home.Ratings = Ratings, home.description = description;

    if (req.file) {
      fs.unlink(home.Photo, (err) => {
        if (err) {
          console.log("Error while deleting previous image:", err);
        };
      });
      home.Photo = req.file.path.replace(/\\/g, "/");
    }

    home.save().then((result) => {
      console.log("home updated", result);
    }).catch(err => {
      console.log("Error while updating", err);
    })
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("Error while updating", err);
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "hosthomes",
      currentPage: "host-home-list",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    })
  });
};

exports.postGetAddhome = (req, res, next) => {
  const { houseName, Pricepernight, Locations, Ratings, description } = req.body;
  //can be deleted
  console.log(req.file);
  if (!req.file) {
    return res.status(422).send("Image upload failed");
  }
  //upto here

  const Photo = req.file.path.replace(/\\/g, "/");
  const home = new Home({ houseName, Pricepernight, Locations, Ratings, description, Photo });
  home.save().then(() => {
    console.log('Home is saved');
  });
  res.redirect("/host/host-home-list");
};

exports.postDeleteHomes = (req, res, next) => {
  const homeID = req.params.homeID;
  console.log('Came to delete', homeID);
  Home.findByIdAndDelete(homeID).then(() => {
    res.redirect("/host/host-home-list");
  }).catch(err => {
    console.log("error when deleting", err);
  });

};  