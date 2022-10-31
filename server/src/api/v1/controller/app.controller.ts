import { NextFunction, Request, Response} from "express";

export default class AppController {
    public index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({message: "System ok!"});
        } catch (error) {
            next(error);
        }
    }
}