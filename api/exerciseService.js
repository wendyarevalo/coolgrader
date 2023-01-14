import { executeQuery } from "./database.js";

const saveUser = async (uuid) => {
  await executeQuery(
    "INSERT INTO users (uuid) VALUES ($1)",
    uuid,
  );
  console.log("user saved");
};

const solvedByUser = async (uuid) => {
  const response = await executeQuery(
    "SELECT DISTINCT exercises.id AS id, title, uuid FROM exercises_by_user JOIN users ON exercises_by_user.user_id = users.id AND users.uuid = $1 RIGHT JOIN exercises ON exercise_id = exercises.id ORDER BY id;",
    uuid,
  );
  const solvedE = [];
  response.rows.forEach(function (exercise) {
    const ex = {
      url: "http://localhost:7800/exercises/" + exercise.id,
      title: exercise.title,
      solved: "FALSE",
    };
    if (exercise.uuid === uuid) {
      ex.url = "http://localhost:7800/graded/" + exercise.id
      ex.solved = "TRUE";
    }
    solvedE.push(ex);
  });

  return solvedE;
};

const saveCode = async (uuid, exerciseId, code, grade) => {
  await executeQuery(
    "INSERT INTO exercises_by_user (user_id, exercise_id, grade, code) VALUES((SELECT id FROM users WHERE uuid = $1), $2, $3, $4)",
    uuid,
    exerciseId,
    grade,
    code,
  );
};

const updateGrade = async (uuid, exerciseId, grade) => {
  await executeQuery(
    "UPDATE exercises_by_user SET grade = $1 WHERE user_id = (SELECT id FROM users WHERE uuid = $2) AND exercise_id = $3",
    grade,
    uuid,
    exerciseId,
  );
};

const getGrade = async (uuid, exerciseId) => {
  try {
    const grades = await executeQuery(
      "SELECT grade FROM exercises_by_user WHERE user_id = (SELECT id FROM users WHERE uuid = $1) AND exercise_id = $2 ORDER BY id DESC",
      uuid,
      exerciseId,
    );
    return grades.rows[0];
  } catch (error) {
    console.log(error)
    return false
  }
};

const getSingleExercise = async (exerciseId) => {
  const exercise = await executeQuery(
      "SELECT title, description FROM exercises WHERE id = $1",
      exerciseId,
  );
  return exercise.rows[0];
};

export { getGrade, saveCode, saveUser, solvedByUser, updateGrade, getSingleExercise };
