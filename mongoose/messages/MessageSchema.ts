/**
 * @file Implements mongoose schema for message
 */
import mongoose, { Schema } from "mongoose";
import Message from "../../models/messages/Message";
/**
 * @typedef Message Represents messages sent between users
 * @property {String} message Message being sent
 * @property {ObjectId} to User whom message being sent to
 * @property {ObjectId} from User who is sending the message
 * @property {Date} sentOn The date the message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: { type: String, required: true },
    to: { type: Schema.Types.ObjectId, ref: "UserModel" },
    from: { type: Schema.Types.ObjectId, ref: "UserModel" },
    sentOn: { type: Date, default: Date.now }
}, { collection: "messages" });
export default MessageSchema;