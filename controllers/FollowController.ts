/**
 * @file Controller RESTful Web service API for follows resource
 */
import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

export default class FollowController implements FollowControllerI {

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;


    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();

            app.post("/api/users/:uid/follows/:auid", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/follows/:auid", FollowController.followController.userUnfollowAnotherUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowing);
            app.get("/api/users/:uid/followedby", FollowController.followController.findAllUsersFollowers);
            app.delete("/api/users/:uid/follows", FollowController.followController.userUnfollowAllUsers);
            app.delete("/api/users/:uid/followedby", FollowController.followController.userRemovesAllUsersFollowingThem);

        }
        return FollowController.followController;
    }

    private constructor() { }



    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.auid)
            .then(follows => res.json(follows));

    userUnfollowAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowAnotherUser(req.params.uid, req.params.auid)
            .then(status => res.send(status));

    findAllUsersFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowing(req.params.uid)
            .then(follows => res.json(follows));

    findAllUsersFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowers(req.params.uid)
            .then(follows => res.json(follows));

    userUnfollowAllUsers = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowAllUsers(req.params.uid)
            .then(status => res.send(status));

    userRemovesAllUsersFollowingThem = (req: Request, res: Response) =>
        FollowController.followDao.userRemovesAllUsersFollowingThem(req.params.uid)
            .then(status => res.send(status));

}