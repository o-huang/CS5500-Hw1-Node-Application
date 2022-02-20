/**
 * @file Declares tuit data type representing a tuit, who posted it, and when it was posted.
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents relationship between a user and a tuit.
 * @property {string} tuit Tuit create by user
 * @property {User} likedBy User who created tuit
 * @property {Date} postedOn The date the user created tuit
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};
