import { Router } from "express";

import { columnController } from "../controllers/column.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    columnController.getColumnsById,
);
export const ColumnRouter = router;
