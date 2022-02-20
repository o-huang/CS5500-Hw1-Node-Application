/**
 * @file Declares follow data type representing between user and follows.
 */
import User from "../users/User";


export default interface Follow {
    following: User,
    followBy: User
};