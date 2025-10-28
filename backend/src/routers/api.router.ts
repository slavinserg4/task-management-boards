import { Router } from "express";

import { BoardRouter } from "./board.router";
import { CardRouter } from "./card.router";
import { ColumnRouter } from "./column.router";

const router = Router();

router.use("/board", BoardRouter);
router.use("/column", ColumnRouter);
router.use("/card", CardRouter);

export const ApiRouter = router;
