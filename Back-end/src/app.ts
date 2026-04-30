import express, {Request, Response} from 'express';
import routes from './routes/index';

const app = express()

routes(app)


export default app;