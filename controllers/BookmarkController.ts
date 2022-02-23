/**
 * @file Controller RESTful Web service API for bookmark resource
 */
import { Express, Request, Response } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * 
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark for the user</li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to remove a user's bookmark</li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the user's bookmark</li>
 *     <li>DELETE /api/users/:uid/bookmarks to delete all user's bookmarks</li>
 *     <li>GET /api/bookmarks/:bid to retrieve a single user's bookmark</li>
 * </ul>
 * 
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {

    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;


    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns BookmarkController
     */
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

    /**
     * Create a new bookmark instance
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user and tid representing the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark object that was bookmarked
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));
    /**
     * Removes a bookmark a user has
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user and tid representing the bookmark to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Find all instances of bookmarks for a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects a user has
     */
    findAllUsersBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersBookmarks(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Removes all bookmark a user has
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarks was successful or not
     */
    userUnbookmarkAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarkAllTuits(req.params.uid)
            .then(status => res.send(status));
    /**
     * Find a single instance of a bookmark
     * @param {Request} req Represents request from client, including the path
     * parameter bid representing a bookmark
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark object
     */
    userGetABookmark = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userGetABookmark(req.params.bid)
            .then(bookmarks => res.json(bookmarks));

}