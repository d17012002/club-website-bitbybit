// const Leaderboard = require("../models/Leaderboard");

const express = require("express");
const router = express.Router();
const Cumulative = require("../models/Leaderboard");
const fs = require("fs");
// Usage:
// download G-Sheet in .csv --> convert to JSON online
// save it as "checkdata.json" in the root folder
// uncomment the checkData function in function below.
async function checkData(dbData) {
  let dbArr = [],
    jsonArr = [];
  dbData.forEach((e) => {
    dbArr.push(e.regNumber.toUpperCase());
  });
  dbArr.sort();

  fs.readFile("checkdata.json", (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);
    jsonData.forEach((element) => {
      jsonArr.push(element.regNo.toUpperCase());
    });
    jsonArr.sort();
    let matched = 0,
      unmatched = 0;
    let size;
    if (jsonArr.length > dbArr.length) {
      size = jsonArr.length;
    } else {
      size = dbArr.length;
    }
    for (let i = 0; i < size; i++) {
      if (jsonArr[i] == dbArr[i]) {
        matched++;
      } else {
        unmatched++;
        console.log(
          jsonArr[i] + " not matched with " + dbArr[i] + " from database"
        );
      }
    }
    console.log(
      "Out of " +
        size +
        " entries, " +
        matched +
        " Matched entries " +
        ", " +
        unmatched +
        " Unmatched entries & " +
        (size - matched - unmatched) +
        " undefined"
    );
  });
}

router.get("/leaderboard", fetchLeaderboard);

async function fetchLeaderboard(req, res) {
  try {
    const leaderboard = await Cumulative.find(
      {},
      {
        _id: 0,
      }
    ).sort({
      score: -1,
    });
    // checkData(leaderboard);
    res.render("leaderboard", {
      participants: leaderboard,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
