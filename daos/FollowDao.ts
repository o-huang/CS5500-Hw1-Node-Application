import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/Follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {


    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() { }


    userFollowsAnotherUser = async (uid: string, auid: string): Promise<any> =>
        FollowModel.create({ following: auid, followBy: uid });

    userUnfollowAnotherUser = async (uid: string, auid: string): Promise<any> =>
        FollowModel.deleteOne({ following: auid, followBy: uid })


    findAllUsersFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ followBy: uid })
            .populate('following')
            .exec();

    findAllUsersFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ following: uid })
            .populate('followBy')
            .exec();

    userUnfollowAllUsers = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({ followBy: uid })

    userRemovesAllUsersFollowingThem = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({ following: uid })

}