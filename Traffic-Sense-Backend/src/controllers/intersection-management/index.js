const {
  registerIntersection,
  getIntersection,
  updateIntersection,
} = require("../../model/intersection/methods");
const utils = require("../../utils/detections");

exports.registerIntersectionFunc = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name) {
      throw new Error("Name is required");
    }
    if (!data.intersectionId) {
      throw new Error("Intersection Id is required");
    }

    const intersection = await registerIntersection(data);

    res
      .status(200)
      .send({ message: "Intersection Registered Successfully", intersection });
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e.message });
  }
};

exports.manageSignals = async (req, res) => {
  console.log("FILESS",req.files)
  console.log(req.body.intersectionId)
  try {
    let uploadedFiles = req.files;
    const intersectionId = req.body.intersectionId;

    if (!intersectionId) {
      throw new Error();
    }
    if (!uploadedFiles ) {
      throw new Error();
    }

    const intersectionDetails = await getIntersection(intersectionId);
    let executedOnce = [];
    let executedTwice = [];
    let unexecuted = [];
    const directions = ["east", "west", "north", "south"];

    directions.forEach((direction) => {
      const executionCount = intersectionDetails[direction];
      if (executionCount === 0) {
        unexecuted.push(direction);
      } else if (executionCount === 1) {
        executedOnce.push(direction);
      } else if (executionCount === 2) {
        executedTwice.push(direction);
      }
    });

    if (executedTwice.length === 4) {
      await updateIntersection(intersectionId, {
        east: 0,
        west: 0,
        north: 0,
        south: 0,
      });

      executedOnce = [];
      executedTwice = [];
      unexecuted = ["east", "west", "north", "south"];
    }

    const response = await utils.senseImages(uploadedFiles);
    console.log("response pridiction",response)
    const sortedPredictions = utils.arrangeOnPriority(
      response?.predictions,
      executedOnce,
      executedTwice,
      unexecuted
    );

    sortedPredictions.name = sortedPredictions.name.split(".")[0];

    await updateIntersection(intersectionId, {
      [sortedPredictions.name]: sortedPredictions.execution,
    });

    res.status(200).send({
      message: "Image Processed Successfully",
      predictions: sortedPredictions,
    });
  } catch (e) {
    console.log("Error",e);
    res
      .status(400)
      .send({
        error:
          "No File Found or File in Bad Format or Intersection id is not given. Try again later.",
      });
  }
};
