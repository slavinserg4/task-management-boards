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
router.get(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    boardController.getBoardById,
);
router.get("/hash/:hashId", boardController.getBoardByHashId);
router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(BoardValidator.update),
    boardController.updateBoard,
);
router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    boardController.deleteBoard,
);

export const BoardRouter = router;
