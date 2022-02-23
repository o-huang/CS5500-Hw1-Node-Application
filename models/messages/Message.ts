/**
 * @file Declares message data type representing relationship between user and messages.
 */

import User from "../users/User";

/**
 * @typedef Message Represents relationship between a user and a message.
 * @property {String} message Message being sent
 * @property {User} to User whom message being sent to
 * @property {User} from User who is sending the message
 * @property {Date} sentOn The date the message was sent
 */
export default interface Message {
    message: String,
    to: User,
    from: User,
    sentOn?: Date
};