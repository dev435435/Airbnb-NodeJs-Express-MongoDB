//External Module
const express = require('express'); 
const storeRouter = express.Router();

//Local module
const storeController = require("../Controller/storeController");

storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homes",storeController.getHomes);
storeRouter.get("/bookings",storeController.getBookings);
storeRouter.get("/favourite-list",storeController.getFavourites);
storeRouter.post("/favourite-list",storeController.postAddToFavourites);
storeRouter.post("/favourite-list/delete-fav/:homeID",storeController.postDeleteToFavourites);
storeRouter.get("/homes/:homeID",storeController.getHomeDetails);
storeRouter.get("/rules/:homeID",storeController.getHomeRules);



module.exports = storeRouter;