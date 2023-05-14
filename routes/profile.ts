
const profileController = require("../controller/profile");
module.exports = (app: any) => {
  app.route("/addProfile").post(profileController.add);
  app.route("/updateProfile/:id").put(profileController.approve)
  app.route("/getUser").get(profileController.getProfile);
  app.route("/signin").post(profileController.signin);
 


};