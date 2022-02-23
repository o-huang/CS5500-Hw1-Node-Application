/**
 * @file Controller RESTful Web service API for follows resource
 */
import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";
/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * 
 * <ul>
 *     <li>POST /api/users/:uid/follows/:auid to create a new follow from one user to another</li>
 *     <li>DELETE /api/users/:uid/follows/:auid to unfollow a user from another user</li>
 *     <li>GET /api/users/:uid/follows to retrieve all the users a user is following</li>
 *     <li>GET /api/users/:uid/followedby to retrieve a user's followers</li>
 *     <li>DELETE /api/users/:uid/follows to delete all users a user is following</li>
 *     <li>DELETE /api/users/:uid/followedby to delete all users who is following the user</li>
 * </ul>
 * 
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns FollowController
     */
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


    /**
    * Creates a new follow instance in database
    * @param {Request} req Represents request from client, including the path
    * parameter uid representing the user who is following and the auid representing user who is being followed
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON arrays containing the follow objects
    */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.auid)
            .then(follows => res.json(follows));
    /**
     * Delete a follow instance in the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who is following and the auid representing user who is being followed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnfollowAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowAnotherUser(req.params.uid, req.params.auid)
            .then(status => res.send(status));
    /**
     * Retrieve all users a user is following
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllUsersFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowing(req.params.uid)
            .then(follows => res.json(follows));
    /**
     * Retrieve all users who is following a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllUsersFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowers(req.params.uid)
            .then(follows => res.json(follows));
    /**
      * Removes all instance of user who a user is following
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
    userUnfollowAllUsers = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowAllUsers(req.params.uid)
            .then(status => res.send(status));
    /**
     * Removes all followers a user has
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user being followed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userRemovesAllUsersFollowingThem = (req: Request, res: Response) =>
        FollowController.followDao.userRemovesAllUsersFollowingThem(req.params.uid)
            .then(status => res.send(status));

}