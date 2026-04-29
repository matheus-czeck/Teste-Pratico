import express, {Request, Response} from 'express';

const app = express();
app.use(express.json());
const routes = (app)=>{
    app.routes
}

export default app;