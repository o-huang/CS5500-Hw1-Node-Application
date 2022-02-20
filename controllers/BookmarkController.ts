/**
 * @file Controller RESTful Web service API for bookmark resource
 */
import { Express, Request, Response } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";


export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;



    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();

            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllUsersBookmarks);
            app.delete("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.userUnbookmarkAllTuits);
            app.get("/api/bookmarks/:bid", BookmarkController.bookmarkController.userGetABookmark);

        }
        return BookmarkController.bookmarkController;
    }

    private constructor() { }


    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));


    findAllUsersBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersBookmarks(req.params.uid)
            .then(bookmarks => res.json(bookmarks));


    userUnbookmarkAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarkAllTuits(req.params.uid)
            .then(status => res.send(status));

    userGetABookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userGetABookmark(req.params.bid)
            .then(bookmarks => res.json(bookmarks));

}