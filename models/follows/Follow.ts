import User from "../users/User";


export default interface Follow {
    following: User,
    followBy: User
};