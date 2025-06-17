import { Request, Response, NextFunction } from "express";

export const attachSessionUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionUser = (req.session as any)?.user;

  if (!sessionUser || !sessionUser._id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: no user in session" });
  }

  // Attach user to request
  (req as any).user = sessionUser;
  next();
};
