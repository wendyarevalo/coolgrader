import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as controller from "./controller.js";

const app = new Application();

const router = new Router();

router.get("/getSolved", controller.getSolved);
router.get("/result", controller.getResult);
router.get("/getExercise", controller.getExercise);
router.get("/singleGrade", controller.singleGrade);
router.post("/saveUser", controller.saveNewUser);
router.post("/saveCode", controller.saveCode);

app.use(router.routes());

app.listen({ port: 7778 });
