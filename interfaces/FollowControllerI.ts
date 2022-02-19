import { Request, Response } from "express";

export default interface FollowControllerI {
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowAnotherUser(req: Request, res: Response): void;
    findAllUsersFollowing(req: Request, res: Response): void;
    findAllUsersFollowers(req: Request, res: Response): void;

    userUnfollowAllUsers(req: Request, res: Response): void;
    userRemovesAllUsersFollowingThem(req: Request, res: Response): void;
};