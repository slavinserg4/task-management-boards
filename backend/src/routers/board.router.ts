import { Router } from "express";

import { boardController } from "../controllers/board.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { BoardValidator } from "../validators/board.validator";

const router = Router();
router.post(
    "/",
    commonMiddleware.validateBody(BoardValidator.create),
    boardController.createBoard,
);
router.get("/:id", commonMiddleware.isIdValidate, boardController.getBoardById);
router.get("/hash/:hashId", boardController.getBoardByHashId);
router.put(
    "/:id",
    commonMiddleware.isIdValidate,
    commonMiddleware.validateBody(BoardValidator.update),
    boardController.updateBoard,
);
router.delete(
    "/:id",
    commonMiddleware.isIdValidate,
    boardController.deleteBoard,
);

export const BoardRouter = router;
