/**
 * @file Declares message data type representing relationship between user and messages.
 */

import User from "../users/User";


export default interface Message {
    message: String,
    to: User,
    from: User,
    sentOn?: Date
};