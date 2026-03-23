import { Router, type IRouter } from "express";
import healthRouter from "./health";
import documentsRouter from "./documents";
import templatesRouter from "./templates";
import statsRouter from "./stats";
import downloadRouter from "./download";

const router: IRouter = Router();

router.use(healthRouter);
router.use(documentsRouter);
router.use(templatesRouter);
router.use(statsRouter);
router.use(downloadRouter);

export default router;
