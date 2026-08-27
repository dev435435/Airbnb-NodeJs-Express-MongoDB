  //External Module
  const express = require('express'); 
  const hostRouter = express.Router();

  //Local module
  const hostController = require("../Controller/hostController");

  hostRouter.get("/addhome",hostController.getAddhome);
  hostRouter.post("/addhome",hostController.postGetAddhome);
  hostRouter.get("/host-home-list",hostController.getHostHomes);
  hostRouter.get("/edit-home/:homeID",hostController.getEditHomes);
  hostRouter.post("/edit-home",hostController.postEditHomes);
  hostRouter.post("/delete-home/:homeID",hostController.postDeleteHomes);
  exports.hostRouter = hostRouter;

