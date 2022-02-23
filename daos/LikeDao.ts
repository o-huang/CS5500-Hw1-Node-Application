/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() { }


    /**
     * Retrieve all users who like a tuit from database
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when all users instance who like the tuit are retrieved from the
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({ tuit: tid })
            .populate("likedBy")
            .exec();


    /**
     * Retrieve all liked tuits by a user from database
     * @param {string} uid Primary key of the user 
     * @returns Promise To be notified when all like instance  of user is retrieved from the
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({ likedBy: uid })
            .populate("tuit")
            .exec();


    /**
     * Insert a like instance into the database
     * @param {string} uid Primary key of the user who is liking
     * @param {string} tid Primary key of the tuit that is being liked
     * @returns Promise To be notified when like instance is inserted into the
     * database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });

        

    /**
     * Removes a like instance from database
     * @param {string} uid Primary key of the user who is unliking
     * @param {string} tid Primary key of the tuit that is being unliked
     * @returns Promise To be notified when like instance is removed from the
     * database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}