import { Router } from "express";

import { boardController } from "../controllers/board.controller";

const router = Router();
router.post("/", boardController.createBoard);
router.get("/:id", boardController.getBoardById);
router.get("/hash/:hashId", boardController.getBoardByHashId);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

export const BoardRouter = router;
