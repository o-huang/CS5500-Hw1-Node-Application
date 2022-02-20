import { Request, Response } from "express";

/**
 * @file Controller interface RESTful Web service API for bookmarks resource
 */
export default interface BookmarkControllerI {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnbookmarksTuit(req: Request, res: Response): void;
    findAllUsersBookmarks(req: Request, res: Response): void;

    userUnbookmarkAllTuits(req: Request, res: Response): void;
    userGetABookmark(req: Request, res: Response): void;
};