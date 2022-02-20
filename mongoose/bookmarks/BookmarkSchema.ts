import mongoose, { Schema } from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmark: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "bookmarks" });
export default BookmarkSchema;