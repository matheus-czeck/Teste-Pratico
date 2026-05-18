import express from "express";
import routes from "./routes/index";
import cors from 'cors'
import { errorMiddleware } from "./middlewares/erroMiddleware";
const app = express();

app.use(cors())
routes(app);

app.use(errorMiddleware)

export default app;
