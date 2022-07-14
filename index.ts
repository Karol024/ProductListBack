import * as express from "express";
import* as cors from 'cors';
import 'express-async-errors';
import './utils/db';

const app = express();

app.use(cors({
    origin:'http://localhost:3000',
}));


app.use(express.json());




app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});