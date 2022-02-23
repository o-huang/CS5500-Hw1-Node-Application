/**
 * @file Controller RESTful Web service API for message resource
 */
import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/messages/Message"

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * 
 * <ul>
 *     <li>POST /api/users/:uid/message/:auid to create a new message sent from one user to another
 *     </li>
 *     <li>GET /api/users/:uid/message to retrieve all messages a user has sent
 *     </li>
 *     <li>GET /api/users/:uid/messagereceived to retrieve all messages that was sent to user
 *     </li>
 *     <li>DELETE /api/message/:mid to delete a message user has sent</li>
 *     <li>DELETE /api/users/:uid/message to delete all messages that user has sent</li>
 *     <li>GET /api/users/:uid/message/:auid to retrieve messages sent to a specific user
 *     </li>
 * </ul>
 * 
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns MessageController
     */
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
    /**
     * Creates a new message instance in database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who is messenging, the auid who the message 
     * is sent to, and the body which is the message content
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.params.uid, req.params.auid, req.body)
            .then((message: Message) => res.json(message))
    /**
     * Retrieve all sent message by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the all message objects a user has sent
     */
    userViewsSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsSentMessages(req.params.uid)
            .then(messages => res.json(messages))
    /**
     * Retrieve all messages sent to a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the all message objects sent to the user
     */
    userViewsRecievedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsRecievedMessages(req.params.uid)
            .then(messages => res.json(messages))

    /**
     * Remove a message instance
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing message object to be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesAMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesAMessage(req.params.mid)
            .then(status => res.send(status));
    /**
    * Remove all message a user has sent
    * @param {Request} req Represents request from client, including the path
    * parameter uid representing user 
    * @param {Response} res Represents response to client, including status
    * on whether deleting allthe messages was successful or not
    */
    userDeleteAllSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteAllSentMessages(req.params.uid)
            .then(status => res.send(status));
    /**
     * Retrieve a ll message that was sent to another user specifically
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who is messenging, the auid who the message 
     * is sent to
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the all message objects user has sent to other user
     */
    userViewSentMessagesToAUser = (req: Request, res: Response) =>
        MessageController.messageDao.userViewSentMessagesToAUser(req.params.uid, req.params.auid)
            .then(messages => res.json(messages))

}