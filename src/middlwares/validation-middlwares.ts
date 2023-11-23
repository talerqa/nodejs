import {body, validationResult} from "express-validator";
import {Request, Response} from "express";

export const titleValidation = body('title').isLength({
  min: 3,
  max: 20
}).trim().withMessage('Message length should be more than 2 symbols')

export const bioValidation = body('bio').trim().isLength({
  min: 10,
  max: 100
}).withMessage('bio should' +
  ' be more than 10 symbols')


export const handlerError = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({errors: result.array()});
  }
}