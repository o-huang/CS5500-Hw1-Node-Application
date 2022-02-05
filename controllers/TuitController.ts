import TuitDao from "../daos/TuitDao";
import Tuit from "../models/Tuit";
import { Express, Request, Response } from "express";
import TuitControllerI from "../interfaces/TuitController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export default class TuitController implements TuitControllerI {

    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();

            app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit);

            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/tuits/:tid", TuitController.tuitController.findTuitById);
            app.put("/api/tuits/:tid", TuitController.tuitController.updateTuit);
            app.delete("/api/tuits/:tid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }

    private constructor() { }

    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));


    createTuit = (req: Request, res: Response) =>
    TuitController.tuitDao.createTuit(req.params.uid,
		req.body).then((tuit: Tuit) => res.json(tuit));



    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit: Tuit) => res.json(tuit));

    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.send(status));
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then((status) => res.send(status));
}
