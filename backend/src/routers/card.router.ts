import { Router } from "express";

import { cardController } from "../controllers/card.controller";

const router = Router();
router.post("/", cardController.createCard);
router.put("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);
router.post("/move", cardController.moveCard);

export const CardRouter = router;
