import Tuit from "../models/Tuit";

export default interface TuitDao {

   findTuitsByUser(uid: string): Promise<Tuit[]>;
   createTuit (uid: string, tuit: Tuit): Promise<Tuit>;

   findAllTuits(): Promise<Tuit[]>;
   findTuitById(tid: string): Promise<Tuit>;
   updateTuit(tid: string, tuit: Tuit): Promise<any>;
   deleteTuit(tid: string): Promise<any>;
}
