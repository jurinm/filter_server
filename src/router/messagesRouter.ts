import { Router } from "express";
import { filterController } from "../controllers/filterController";

const router = Router();

router.get("/messages/filter", filterController);

export default router;
