import UserModel, { type IUser } from "../models/user.model";
import { z } from "zod";
import RoleModel from "../models/role.model";
import { ROLE } from "../enums/role.enum";
import { getEnv } from "../utils/get-env";
import jwt from "jsonwebtoken";
import session from "express-session";
import { UnauthorizedException } from "../utils/appError";

// Define Zod schemas for service input validation
const userRegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().optional(),
});

const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

// Infer types from Zod schemas
type UserRegisterInput = z.infer<typeof userRegisterSchema>;
type UserLoginInput = z.infer<typeof userLoginSchema>;

export const registerUser = async (
    userData: UserRegisterInput
): Promise<Omit<IUser, "password" | "omitPassword" | "comparePassword">> => {
    // Validate input data
    const validatedData = userRegisterSchema.parse(userData);

    const { email } = validatedData;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const userRole = await RoleModel.findOne({ name: ROLE.USER });
    if (!userRole) {
        throw new Error(
            "Default user role not found. Please run database seeder."
        );
    }

    const newUser = new UserModel({ ...validatedData, roleId: userRole._id });
    await newUser.save();
    return newUser.omitPassword();
};

export const loginUser = async (
    credentials: UserLoginInput
): Promise<
    Omit<IUser, "password"> & {
        roleName: string;
        accessToken: string;
    }
> => {
    const validatedData = userLoginSchema.parse(credentials);
    const { email, password } = validatedData;

    const user = await UserModel.findOne({ email })
        .select("+password")
        .populate("roleId", "name");

    if (!user || !user.password) {
        throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        throw new UnauthorizedException("Invalid credentials");
    }

    const userWithoutPassword = user.omitPassword();
    const accessToken = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: (user.roleId as any).name,
        },
        getEnv("SESSION_SECRET"),
        { expiresIn: "15m" }
    );

    return {
        ...userWithoutPassword,
        roleName: (user.roleId as any).name,
        accessToken,
    };
};
