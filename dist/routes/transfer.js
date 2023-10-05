"use strict";
const transferController = require("../controller/transfer");
module.exports = (app) => {
    app.route("/registerProperty").post(transferController.registerProperty);
    //   app.route("/applyNocs").post(transferController.add);
    app.route("/transferProperty/:id").put(transferController.transferProperty);
    //   app.route("/aproveTransfer/:id").put(transferController.approve);
    //   app.route("/getNocs").get(transferController.getNocs);
    //   app.route("/removeNocs/:id").delete(transferController.deleteNocs);
    app.route("/getRegisterProperty").get(transferController.getRegisterProperty);
    app.route("/searchProperty/:id").get(transferController.searchPlot);
};
