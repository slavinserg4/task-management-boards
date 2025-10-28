import { Router } from "express";

import { columnController } from "../controllers/column.controller";

const router = Router();
router.post("/", columnController.createColumn);
router.get("/board/:boardId", columnController.getColumnsByBoard);
router.put("/:id", columnController.updateColumn);
router.delete("/:id", columnController.deleteColumn);
export const ColumnRouter = router;
