/**
 * @file Implements mongoose schema for tuit
 */
import mongoose, { Schema } from "mongoose";
import Tuit from "../../models/tuits/Tuit";
/**
 * @typedef Tuit Represents tuits made by users
 * @property {string} tuit Tuit create by user
 * @property {ObjectId} postedBy User who created tuit
 * @property {Date} postedOn The date the user created tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    postedOn: { type: Date, default: Date.now }
}, { collection: "tuits" });
export default TuitSchema;