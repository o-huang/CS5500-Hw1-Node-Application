import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    userMessagesAnotherUser(uid: string, auid: string, message: Message): Promise<Message>;
    userViewsSentMessages(uid: string): Promise<Message[]>;
    userViewsRecievedMessages(uid: string): Promise<Message[]>;
    userDeletesAMessage(mid: string): Promise<any>;

    userDeleteAllSentMessages(uid: string): Promise<any>;
    userViewSentMessagesToAUser(uid: string, auid: string): Promise<Message[]>;

};