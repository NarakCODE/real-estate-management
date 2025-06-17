import "express-session";
import { type IUser } from "../models/user.model";

declare global {
    namespace Express {
        interface User extends IUser {
            _id: any;
        }
        interface Session {
            user?: Omit<IUser, "password">;
            [key: string]: any; // Allow dynamic properties
        }
    }
}
