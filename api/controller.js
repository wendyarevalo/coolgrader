import * as exerciseService from "./exerciseService.js";
import { grade } from "./grade.js"
import { Queue } from "./deps.js";

const queue = new Queue();

const getSolved = async ({ request, response }) => {
  console.log("get solved request");
  response.body = await exerciseService.solvedByUser(
    request.url.searchParams.get("uuid"),
  );
};

const getExercise = async ({ request, response }) => {
  console.log("get single exercise request")
  response.body = await exerciseService.getSingleExercise(
      request.url.searchParams.get("exerciseId"),
  );
};

const saveNewUser = async ({ request, response }) => {
  console.log("save user request")
  const body = request.body();
  const params = await body.value;
  await exerciseService.saveUser(params.get("uuid"));
  response.body = { status: "success" };
  return response;
};

const saveCode = async ({ request, response }) => {
  console.log("save code request")
  const body = request.body();
  const params = await body.value;
  const uuid = params.get("uuid");
  const ex_id = params.get("exercise_id");

  const result = await exerciseService.getGrade(uuid, ex_id);
    if(!result){
      console.log("No graded");
      gradeCode(uuid, ex_id, params.get("code"));
      return response.redirect(
        "http://localhost:7800/wait/"+ex_id
      );
    }else{
      console.log("No grading needed");
      return response.redirect(
        "http://localhost:7800/graded/"+ex_id
      );
    }

};

const gradeCode = async (uuid, ex_id, code) => {
  console.log("New submission");
  queue.push(async () => {
    await exerciseService.saveCode(
      uuid,
      ex_id,
      code,
      "TEMP",
    );
    await grade(code, uuid, ex_id);
  });
    
}

const getResult = async ({ request, response }) => {
  console.log("I received a sse connection");

  response.headers = new Headers({
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  response.status = 200

  const result = await exerciseService.getGrade(request.url.searchParams.get("uuid"),
  request.url.searchParams.get("exercise_id"))

  response.body = `data: ${JSON.stringify(result)}\n\n`
  console.log(response);
  return response.body;
  
};

const singleGrade = async ({ request, response }) => {
  console.log("I received a petition");

  response.body = await exerciseService.getGrade(request.url.searchParams.get("uuid"),
  request.url.searchParams.get("exercise_id"))

  return response.body;
  
};

export { getResult, getSolved, saveCode, saveNewUser, getExercise, singleGrade };
