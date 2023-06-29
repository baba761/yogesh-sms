import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Sms } from "../models/sms";
import mongoose from "mongoose";
const router = express.Router();

router.post(
    "/api/sms",
    [
        body("number").notEmpty().withMessage("number is required"),
        body("name").notEmpty().withMessage("name is required"),
        body("msg").notEmpty().withMessage("msg is required"),
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).send(validationErrors.array());
        }
        const { name, number, msg, description, type } = req.body;
        const createdAt = new Date();
        createdAt.setHours(createdAt.getHours() + 5);
        createdAt.setMinutes(createdAt.getMinutes() + 30);
        const sms = Sms.build({
            name,
            number,
            msg,
            description,
            type,
            createdAt: createdAt,
        });
        await sms.save();
        res.status(201).send(sms);
    }
);
router.get(
    "/api/sms",
    async (req: Request, res: Response, next: NextFunction) => {
        const sms = await Sms.find();
        res.status(200).send(sms);
    }
);
router.get(
    "/api/sms/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.status(400).send("Invalid Id");
        }
        const sms = await Sms.findById(req.params.id);
        if (!sms) {
            res.status(400).send("Not found");
        }
        res.status(200).send(sms);
    }
);

export default router;
