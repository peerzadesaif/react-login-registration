const fs = require("fs");
const path = require("path");

const versionRoutePath = path.join(__dirname, "");

const UsersRoute = require("./UserRoutes");

const initRoute = (app) => {
  app.use(`/api/`, UsersRoute);
};
export default initRoute;
