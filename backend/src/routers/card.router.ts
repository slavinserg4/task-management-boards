import { Router } from "express";

import { cardController } from "../controllers/card.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CardValidator } from "../validators/card.validator";

const router = Router();
router.post(
    "/",
    commonMiddleware.validateBody(CardValidator.create),
    cardController.createCard,
);
router.put(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(CardValidator.update),
    cardController.updateCard,
);
router.delete(
    "/:id",
    commonMiddleware.isIdValidate("id"),
    cardController.deleteCard,
);
router.get(
    "/cardsbycolumn/:columnId",
    commonMiddleware.isIdValidate,
    cardController.getCardsByColumn,
);
router.post(
    "/move",
    commonMiddleware.validateBody(CardValidator.move),
    cardController.moveCard,
);
router.post(
    "/reorder",
    commonMiddleware.validateBody(CardValidator.reorder),
    cardController.reorderCards,
);

export const CardRouter = router;
