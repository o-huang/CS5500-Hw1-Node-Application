/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {


    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() { }


    /**
     * Insert new message instance in database
     * @param {string} uid Primary key of user who is sending messages
     * @param {string} auid Primary key of user whom message is being sent to
     * @param {Message} message The message that is being sent
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesAnotherUser = async (uid: string, auid: string, message: Message): Promise<Message> =>
        MessageModel.create({ ...message, to: auid, from: uid })


    /**
     * Retrieve all message the user sends from database
     * @param {string} uid Primary key of user who is sending messages
     * @returns Promise To be notified when message of user is retrieved from database
     */
    userViewsSentMessages = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ from: uid })


    /**
     * Retrieve all message sent to the user from database
     * @param {string} uid Primary key of user who is being sent messages
     * @returns Promise To be notified when message sent to user is retrieved from database
     */
    userViewsRecievedMessages = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ to: uid })


    /**
     * Removes a message from database
     * @param {string} mid Primary key of message to be deleted
     * @returns Promise To be notified when the message is removed from the
     * database
     */
    userDeletesAMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: mid })


    /**
     * Removes all message sent by user from database
     * @param {string} uid Primary key of user whos message is to be deleted
     * @returns Promise To be notified when all messages by user are removed from the
     * database
     */
    userDeleteAllSentMessages = async (uid: string): Promise<any> =>
        MessageModel.deleteMany({ from: uid })


    /**
     * Retrieve all message sent to a specific user
     * @param {string} uid Primary key of user who is sending message
     * @param {string} auid Primary key of user who is recieving the message
     * @returns Promise To be notified when all messages sent to other user is retrieved from database
     */
    userViewSentMessagesToAUser = async (uid: string, auid: string): Promise<Message[]> =>
        MessageModel
            .find({ from: uid, to: auid })
            .populate("message")
            .exec();

}