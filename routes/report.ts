const reportController=require("../controller/report")
module.exports = (app: any) => {

    app.route("/addReport").post(reportController.add);
    // app.route("/getReport").get(reportController.getReport);
    // app.route("/deleteReport/:id").delete(reportController.deleteReport);



}