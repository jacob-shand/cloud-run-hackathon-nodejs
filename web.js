const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Let the battle begin!");
});

app.post("/", function (req, res) {
  currentPlayers = req.body.arena;
  currentX =
    req.body.arena.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"].x;
  currentY =
    req.body.arena.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"].y;
  currentDirection =
    req.body.arena.state["https://attitudepebbles-2kxpytz2oa-ts.a.run.app"]
      .direction;

  moveNeeded = true;

  if (currentDirection != "W" && currentX != 0) {
    // console.log("turn left for X");
    moveNeeded = false;
    move = faceLeft(currentDirection, currentPlayers, currentX, currentY);
  } else if (currentX != 0 && moveNeeded) {
    // console.log("move forward for x");
    moveNeeded = false;
    checkShootValue = checkShoot(
      currentPlayers,
      currentDirection,
      currentX,
      currentY
    );
    console.log(checkShootValue);
    if (checkShootValue == "T") {
      move = "T";
    } else {
      move = "F";
    }
  } else if (currentDirection != "N" && currentY != 0 && moveNeeded) {
    // console.log("face up for y");
    moveNeeded = false;
    move = faceUp(currentDirection, currentPlayers, currentX, currentY);
  } else if (currentY != 0 && moveNeeded) {
    // console.log("move forward for y");
    moveNeeded = false;
    move = "F";
  } else if (currentDirection != "E" && currentDirection != "S" && moveNeeded) {
    moveNeeded = true;
    // console.log("face east");
    move = faceEast(currentDirection);
  } else if (currentDirection == "E") {
    moveNeeded = true;
    // console.log("check other players");
    move = checkOtherPlayers(currentPlayers, currentDirection);
  } else if (currentDirection == "S") {
    moveNeeded = true;
    // console.log("check other players");
    move = checkOtherPlayers(currentPlayers, currentDirection);
  }

  res.send(move);
});
app.listen(process.env.PORT || 8080);

function checkShoot(currentPlayers, currentDirection, currentX, currentY) {
  console.log(currentPlayers);
  for (const [key, value] of Object.entries(currentPlayers.state)) {
    console.log(key);
    switch (currentDirection) {
      case "N":
        if (
          value.x == currentX &&
          value.y + 4 < currentY &&
          key != "https://attitudepebbles-2kxpytz2oa-ts.a.run.app"
        ) {
          console.log("throw");
          return "T";
        }
      case "E":
        console.log(value.x);
        if (
          value.y == currentY &&
          value.x - 4 < currentX &&
          key != "https://attitudepebbles-2kxpytz2oa-ts.a.run.app"
        ) {
          console.log("throw why ");
          return "T";
        }
      case "W":
        if (
          value.y == currentY &&
          value.x + 4 > currentX &&
          key != "https://attitudepebbles-2kxpytz2oa-ts.a.run.app"
        ) {
          console.log("throw");
          return "T";
        }
      case "S":
        if (
          value.x == currentX &&
          value.y - 4 > currentY &&
          key != "https://attitudepebbles-2kxpytz2oa-ts.a.run.app"
        ) {
          console.log("throw");
          return "T";
        }
    }
  }
}

function faceEast(currentDirection) {
  switch (currentDirection) {
    case "N":
      return "R";
    case "W":
      return "R";
    case "S":
      return "L";
  }
}

function faceLeft(currentDirection, currentPlayers, currentX, currentY) {
  checkShootValue = checkShoot(
    currentPlayers,
    currentDirection,
    currentX,
    currentY
  );
  if (checkShootValue == "T") {
    return "T";
  }
  switch (currentDirection) {
    case "N":
      return "L";
    case "E":
      return "L";
    case "S":
      return "R";
  }
}

function faceUp(currentDirection, currentPlayers, currentX, currentY) {
  checkShootValue = checkShoot(
    currentPlayers,
    currentDirection,
    currentX,
    currentY
  );
  if (checkShootValue == "T") {
    return "T";
  }
  switch (currentDirection) {
    case "E":
      return "L";
    case "W":
      return "R";
    case "S":
      return "R";
  }
}

function checkOtherPlayers(currentPlayers, currentDirection) {
  console.log(currentDirection);
  for (const [key, value] of Object.entries(currentPlayers.state)) {
    console.log(key);
    if (
      ((value.x < 4 && value.y == 0 && currentDirection == "E") ||
        (value.y < 4 && value.x == 0 && currentDirection == "S")) &&
      key != "https://attitudepebbles-2kxpytz2oa-ts.a.run.app"
    ) {
      return "T";
    }
  }
  if (currentDirection == "E") {
    return "R";
  } else {
    return "L";
  }
}
