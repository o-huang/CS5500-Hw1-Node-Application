import TuitModel from "../mongoose/TuitModel";
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() { }

    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({ postedBy: uid });
    createTuit = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({ ...tuit, postedBy: uid });


    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find().exec();

    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid);

    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            { _id: tid },
            { $set: tuit });
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({ _id: tid });
};