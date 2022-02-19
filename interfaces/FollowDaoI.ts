import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsAnotherUser(uid: string, auid: string): Promise<Follow>;
    userUnfollowAnotherUser(uid: string, auid: string): Promise<any>;
    findAllUsersFollowing(uid: string): Promise<Follow[]>;
    findAllUsersFollowers(uid: string): Promise<Follow[]>;

    userUnfollowAllUsers(uid: string): Promise<any>;
    userRemovesAllUsersFollowingThem(uid: string): Promise<any>;

};