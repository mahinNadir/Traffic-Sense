const errorStrings = require("../../constants/errorStrings");
const Intersection = require("./index");

exports.registerIntersection = async (data) => {
  try {
    const isExist = await Intersection.findOne({ intersectionId: data.intersectionId });

    if (isExist) {
      throw new Error(errorStrings.INVALID_INTERSECTION_ID);
    }

    const record = new Intersection({
      name: data.name,
      intersectionId: data.intersectionId,
    });

    const savedRecord = await record.save();
    return savedRecord;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getIntersection = async (intersectionId) => {
  try {
    const intersection = await Intersection.findOne({ intersectionId: intersectionId });

    if (!intersection) {
      throw new Error(errorStrings.INVALID_INTERSECTION_ID);
    }

    return intersection;
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateIntersection = async (intersectionId, data) => {
  try {
    const intersection = await Intersection.findOne({ intersectionId: intersectionId });

    if (!intersection) {
      throw new Error(errorStrings.INVALID_INTERSECTION_ID);
    }

    const updatedIntersection = await Intersection.findOneAndUpdate(
      { intersectionId: intersectionId },
      data,
      { new: true }
    );

    return updatedIntersection;
  } catch (error) {
    throw new Error(error);
  }
}
