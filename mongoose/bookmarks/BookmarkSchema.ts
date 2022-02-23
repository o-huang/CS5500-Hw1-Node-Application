/**
 * @file Implements mongoose schema for bookmark
 */
import mongoose, { Schema } from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";


/**
 * @typedef Bookmark Represents user's bookmark
 * @property {ObjectId} bookmark Tuit being bookmarked
 * @property {ObjectId} bookmarkBy User who bookmarking the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmark: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "bookmarks" });
export default BookmarkSchema;