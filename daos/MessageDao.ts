/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/Messages/MessageModel";
import Message from "../models/Messages/Message";

export default class MessageDao implements MessageDaoI {


    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() { }

    userMessagesAnotherUser = async (uid: string, auid: string, message: Message): Promise<Message> =>
        MessageModel.create({ ...message, to: auid, from: uid })

    userViewsSentMessages = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ from: uid })

    userViewsRecievedMessages = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ to: uid })

    userDeletesAMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: mid })

    userDeleteAllSentMessages = async (uid: string): Promise<any> =>
        MessageModel.deleteMany({ from: uid })

    userViewSentMessagesToAUser = async (uid: string, auid: string): Promise<Message[]> =>
        MessageModel
            .find({ from: uid, to: auid })
            .populate("message")
            .exec();

}