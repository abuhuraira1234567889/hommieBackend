"use strict";
const requestClient = require("../controller/request");
module.exports = (app) => {
    app.route("/addRequest").post(requestClient.add);
    app.route("/updateRequest/:id").put(requestClient.approve);
    app.route("/getRequest").get(requestClient.getRequests);
    app.route("/deleteRequest/:id").delete(requestClient.deleteRequest);
    app.route("/notification/:id").get(requestClient.notification);
};
