/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() { }


    /**
     * Insert a bookmark instance into the database
     * @param {string} uid Primary key of the user
     * @param {string} tid Primary key of the bookmark
     * @returns Promise To be notified when a user's bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({ bookmark: tid, bookmarkBy: uid });


    /**
     * Remove a bookmark a user has from the database
     * @param {string} uid Primary key of the user
     * @param {string} tid Primary key of the bookmark
     * @returns Promise To be notified when a user's bookmark is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmark: tid, bookmarkBy: uid });


    /**
     * Retrieve all bookmarks a user has from the database
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when all user's bookmark is retrived from the database
     */
    findAllUsersBookmarks = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkBy: uid })
            .populate('bookmark')
            .exec();


    /**
    * Remove all bookmarks a user has from the database
    * @param {string} uid Primary key of the user
    * @returns Promise To be notified when all user's bookmarks are removed from the database
    */
    userUnbookmarkAllTuits = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({ bookmarkBy: uid });

        
    /**
     * Retrieve a bookmark from the database
     * @param {string} bid Primary key of the bookmark
     * @returns Promise To be notified when the bookmark is retrived from the database
     */
    userGetABookmark = async (bid: string): Promise<any> =>
        BookmarkModel.findById(bid)
            .populate("bookmark")
            .exec();

}