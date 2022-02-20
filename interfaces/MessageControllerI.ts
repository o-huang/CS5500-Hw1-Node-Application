import { Request, Response } from "express";

/**
 * @file Controller interface RESTful Web service API for messages resource
 */
export default interface MessageControllerI {
    userMessagesAnotherUser(req: Request, res: Response): void;
    userViewsSentMessages(req: Request, res: Response): void;
    userViewsRecievedMessages(req: Request, res: Response): void;
    userDeletesAMessage(req: Request, res: Response): void;

    userDeleteAllSentMessages(req: Request, res: Response): void;
    userViewSentMessagesToAUser(req: Request, res: Response): void;
};