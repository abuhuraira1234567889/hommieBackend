"use strict";
const nocsController = require("../controller/nocs");
module.exports = (app) => {
    app.route("/applyNocs").post(nocsController.add);
    app.route("/approveNocs/:id").put(nocsController.approveNocs);
    app.route("/getNocs").get(nocsController.getNocs);
    app.route("/removeNocs/:id").delete(nocsController.deleteNocs);
};
