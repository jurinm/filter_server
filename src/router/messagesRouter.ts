import { Router } from "express";
import { filterController } from "../controllers/filterController";

const router = Router();

router.post("/messages/filter", filterController);

export default router;
