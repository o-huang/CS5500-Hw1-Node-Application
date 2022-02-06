
import express, { Request, Response } from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";


//Uncomment this line below to connect to local host
// mongoose.connect('mongodb://localhost:27017/tuiter-db');

//Uncomment this line below to connect to mongo server online
mongoose.connect("mongodb+srv://frostyfeet1998:cs5500password@cluster0.erteh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);