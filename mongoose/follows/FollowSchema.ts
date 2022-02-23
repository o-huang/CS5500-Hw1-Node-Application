/**
 * @file Implements mongoose schema for follow
 */
import mongoose, { Schema } from "mongoose";
import Follow from "../../models/follows/Follow";
/**
 * @typedef Follow Represents follows and how following who
 * @property {ObjectId} following User who is being followed
 * @property {ObjectId} followBy User who is doing the following
 */
const FollowSchema = new mongoose.Schema<Follow>({
    following: { type: Schema.Types.ObjectId, ref: "UserModel" },
    followBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "follows" });
export default FollowSchema;