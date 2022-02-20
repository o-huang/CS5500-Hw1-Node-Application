/**
 * @file Controller RESTful Web service API for message resource
 */
import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/messages/Message"
export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;




    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            app.post("/api/users/:uid/message/:auid", MessageController.messageController.userMessagesAnotherUser);
            app.get("/api/users/:uid/message", MessageController.messageController.userViewsSentMessages);
            app.get("/api/users/:uid/messagereceived", MessageController.messageController.userViewsRecievedMessages);
            app.delete("/api/message/:mid", MessageController.messageController.userDeletesAMessage);
            app.delete("/api/users/:uid/message", MessageController.messageController.userDeleteAllSentMessages);
            app.get("/api/users/:uid/message/:auid", MessageController.messageController.userViewSentMessagesToAUser);

        }
        return MessageController.messageController;
    }

    private constructor() { }

    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.params.uid, req.params.auid, req.body)
            .then((message: Message) => res.json(message))

    userViewsSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsSentMessages(req.params.uid)
            .then(messages => res.json(messages))

    userViewsRecievedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsRecievedMessages(req.params.uid)
            .then(messages => res.json(messages))


    userDeletesAMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesAMessage(req.params.mid)
            .then(status => res.send(status));

    userDeleteAllSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteAllSentMessages(req.params.uid)
            .then(status => res.send(status));

    userViewSentMessagesToAUser = (req: Request, res: Response) =>
        MessageController.messageDao.userViewSentMessagesToAUser(req.params.uid, req.params.auid)
            .then(messages => res.json(messages))

}