import { NextFunction, Request, Response } from "express";
import { connected } from "process";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err.name === "CastError") {
        console.log("Here");
        const message = `Resource not found`;
        res.status(400).send({ message: message });
    }
    res.status(400).send({ message: err.message });
};
