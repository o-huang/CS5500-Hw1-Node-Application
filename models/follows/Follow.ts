/**
 * @file Declares follow data type representing between user and follows.
 */
import User from "../users/User";

/**
 * @typedef Follow Represents relationship between a user and a follow.
 * @property {User} following User who is being followed
 * @property {User} followBy User who is doing the following
 */
export default interface Follow {
    following: User,
    followBy: User
};