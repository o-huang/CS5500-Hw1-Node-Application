/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {


    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() { }



    /**
     * Insert a instance of a follow in the database
     * @param {string} uid Primary key of the user who is doing the following
     * @param {string} auid Primary key of the user who is followed
     * @returns Promise To be notified when the follow instance is inserted into the database
     */
    userFollowsAnotherUser = async (uid: string, auid: string): Promise<any> =>
        FollowModel.create({ following: auid, followBy: uid });


    /**
     * Remove a instance of a follow in the database
     * @param {string} uid Primary key of the user 
     * @param {string} auid Primary key of the user who is followed
     * @returns Promise To be notified when the follow instance is removed from the database
     */
    userUnfollowAnotherUser = async (uid: string, auid: string): Promise<any> =>
        FollowModel.deleteOne({ following: auid, followBy: uid });


    /**
     * Retrieve all the users a user is following from the database
     * @param {string} uid Primary key of the user 
     * @returns Promise To be notified when all follows instance for the user is retrived from the database
     */
    findAllUsersFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ followBy: uid })
            .populate('following')
            .exec();


    /**
     * Retrieve all the followers a user has from the database
     * @param {string} uid Primary key of the user 
     * @returns Promise To be notified when all followers of the user is retrived from the database
     */
    findAllUsersFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ following: uid })
            .populate('followBy')
            .exec();


    /**
     * Remove all other users the user is following from database
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when all users the user is following is removed from the
     * database
     */
    userUnfollowAllUsers = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({ followBy: uid });


    /**
     * Remove all followers the user has from database
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when all followers of the user removed from the
     * database
     */
    userRemovesAllUsersFollowingThem = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({ following: uid });

}