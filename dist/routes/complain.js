"use strict";
const complainController = require("../controller/complain");
module.exports = (app) => {
    app.route("/addComplain").post(complainController.add);
    app.route("/getComplain").get(complainController.getComplain);
    app.route("/approveComplain/:id").put(complainController.closeComplain);
    // app.route("/removeComplain/:id").delete(complainController.removeComplain);
};
