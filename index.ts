import express, { Router } from "express";
import cors from 'cors';
import 'express-async-errors';
import {ProductRouter} from "./routes/product";
import {handleError} from "./utils/errors";
import './utils/db';
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));

app.use(express.json());



const router = Router();

router.use('/product', ProductRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});
