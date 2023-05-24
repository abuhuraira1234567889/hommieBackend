"use strict";
const clientController = require("../controller/client");
module.exports = (app) => {
    app.route("/addClient").post(clientController.add);
    // app.route("/checkClient/:id").get(clientController.checkClient)
    app.route("/updateClient/:id").put(clientController.updateClient);
    app.route("/getClient").get(clientController.getClient);
    app.route("/removeClient/:id").delete(clientController.removeClient);
};
