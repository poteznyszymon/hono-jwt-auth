import { Hono } from "hono";
import registerRouter from "./routes/auth/register.route";
import loginRouter from "./routes/auth/login.route";
import logoutRouter from "./routes/auth/logout.route";
import myProfileRouter from "./routes/user/myProfile.route";

const app = new Hono();

app
  .basePath("/api")
  .route("/", registerRouter)
  .route("/", loginRouter)
  .route("/", logoutRouter)
  .route("/", myProfileRouter);

export default app;
