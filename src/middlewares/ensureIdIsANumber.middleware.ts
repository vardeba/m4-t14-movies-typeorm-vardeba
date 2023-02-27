import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureIdIsANumberMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const movieId: any = req.params.id;

    if (movieId % 1 !== 0) {
        throw new AppError(`The id ${movieId} is not a number!`, 404);
    }

    return next();
};
