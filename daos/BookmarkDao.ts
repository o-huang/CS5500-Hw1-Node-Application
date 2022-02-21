/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

export default class BookmarkDao implements BookmarkDaoI {

    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() { }

    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({ bookmark: tid, bookmarkBy: uid });


    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmark: tid, bookmarkBy: uid })


    findAllUsersBookmarks = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkBy: uid })
            .populate('bookmark')
            .exec();

    userUnbookmarkAllTuits = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({ bookmarkBy: uid })

    userGetABookmark = async (bid: string): Promise<any> =>
        BookmarkModel.findById(bid)
            .populate("bookmark")
            .exec();

}