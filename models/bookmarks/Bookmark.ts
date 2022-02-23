/**
 * @file Declares bookmark data type representing a relationship between user and bookmarks.
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark Represents relationship between a user and a bookmark.
 * @property {Tuit} bookmark Tuit being bookmarked
 * @property {User} bookmarkBy User who bookmarking the tuit
 */
export default interface Bookmark {
    bookmark: Tuit,
    bookmarkBy: User
};