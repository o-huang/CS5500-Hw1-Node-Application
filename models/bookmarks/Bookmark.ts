/**
 * @file Declares bookmark data type representing a relationship between user and bookmarks.
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default interface Bookmark {
    bookmark: Tuit,
    bookmarkBy: User
};