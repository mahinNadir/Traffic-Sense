const FormData = require("form-data");

const api = require("../../constants/api");

const utils = {};

utils.senseImages = async (data) => {
  try {
    const formData = new FormData();

    for (const file of data) {
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    }

    const response = await api.senseImages(formData);

    return response;
  } catch (e) {
    return {
      error: e.message,
    };
  }
};

utils.arrangeOnPriority = (
  vehiclePredictions,
  executedOnce,
  executedTwice,
  unexecuted
) => {
  try {
    console.log(vehiclePredictions);
    // const vehiclePredictions = [
    //   { detected_ambulance: 10, detected_objects: 10, name: "east.jpg" },
    //   { detected_ambulance: 3, detected_objects: 20, name: "north.jpg" },
    //   { detected_ambulance: 4, detected_objects: 5, name: "south.jpg" },
    //   { detected_ambulance: 10, detected_objects: 10, name: "west.jpg" },
    // ];

    // const executedOnce = ["east", "north"];
    // const executedTwice = ["south"];
    // const unexecuted = ["west"];

    const unexecutedLaneData = vehiclePredictions.filter((lane) =>
      unexecuted.includes(lane.name.split(".")[0])
    );
    const executedOnceLanceData = vehiclePredictions.filter((lane) =>
      executedOnce.includes(lane.name.split(".")[0])
    );
    const executedTwiceLanceData = vehiclePredictions.filter((lane) =>
      executedTwice.includes(lane.name.split(".")[0])
    );

    const sortedLanes = [
      ...unexecutedLaneData,
      ...executedOnceLanceData,
      ...executedTwiceLanceData,
    ].sort((a, b) => {
      if (a.detected_ambulance > b.detected_ambulance) {
        return -1;
      } else if (a.detected_ambulance < b.detected_ambulance) {
        return 1;
      }

      if (a.detected_objects === b.detected_objects) {
        if (
          unexecuted.includes(a.name.split(".")[0]) &&
          !unexecuted.includes(b.name.split(".")[0])
        ) {
          return -1;
        } else if (
          !unexecuted.includes(a.name.split(".")[0]) &&
          unexecuted.includes(b.name.split(".")[0])
        ) {
          return 1;
        } else if (
          executedOnce.includes(a.name.split(".")[0]) &&
          !executedOnce.includes(b.name.split(".")[0])
        ) {
          return -1;
        } else if (
          !executedOnce.includes(a.name.split(".")[0]) &&
          executedOnce.includes(b.name.split(".")[0])
        ) {
          return 1;
        }
      }
      return -1;
    });

    let highestPredictedLane = sortedLanes[0];

    const isExecutedOnce = executedOnce.includes(
      highestPredictedLane.name.split(".")[0]
    );
    const isExecutedTwice = executedTwice.includes(
      highestPredictedLane.name.split(".")[0]
    );
    const isUnexecuted = unexecuted.includes(
      highestPredictedLane.name.split(".")[0]
    );

    if (highestPredictedLane.detected_ambulance === 0) {
      if (isExecutedOnce) {
        highestPredictedLane.status = "green";
        highestPredictedLane.execution = 2;
      } else if (isExecutedTwice) {
        let highestExecutedOnce = null;
        let highestUnExecuted = null;

        if (unexecutedLaneData.length > 0) {
          highestUnExecuted = unexecutedLaneData?.reduce((prev, current) => {
            return prev.detected_objects > current.detected_objects
              ? prev
              : current;
          });
        }
        if (executedOnceLanceData.length > 0) {
          highestExecutedOnce = executedOnceLanceData?.reduce(
            (prev, current) => {
              return prev.detected_objects > current.detected_objects
                ? prev
                : current;
            }
          );
        }

        if (highestUnExecuted && highestExecutedOnce) {
          if (
            highestUnExecuted.detected_objects >=
            highestExecutedOnce.detected_objects
          ) {
            highestPredictedLane = highestUnExecuted;
            highestPredictedLane.execution = 1;
          } else {
            highestPredictedLane = highestExecutedOnce;
            highestPredictedLane.execution = 2;
          }
        } else if (highestUnExecuted) {
          highestPredictedLane = highestUnExecuted;
          highestPredictedLane.execution = 1;
        } else if (highestExecutedOnce) {
          highestPredictedLane = highestExecutedOnce;
          highestPredictedLane.execution = 2;
        }

        highestPredictedLane.status = "green";
      } else if (isUnexecuted) {
        highestPredictedLane.status = "green";
        highestPredictedLane.execution = 1;
      }

      return highestPredictedLane;
    }

    if (highestPredictedLane.detected_ambulance > 0) {
      if (isExecutedOnce) {
        highestPredictedLane.status = "green";
        highestPredictedLane.execution = 2;
      } else if (isExecutedTwice) {
        highestPredictedLane.status = "green";
        highestPredictedLane.execution = 2;
      } else if (isUnexecuted) {
        highestPredictedLane.status = "green";
        highestPredictedLane.execution = 1;
      }
    }

    highestPredictedLane.name = highestPredictedLane.name;
    return highestPredictedLane;
  } catch (e) {
    console.log(e);
    return {
      error: e.message,
    };
  }
};

module.exports = utils;
