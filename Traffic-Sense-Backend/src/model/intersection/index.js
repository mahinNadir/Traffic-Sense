const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const intersection = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    intersectionId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    east: {
      type: Number,
      default: 0
    },
    west: {
      type: Number,
      default: 0
    },
    north: {
      type: Number,
      default: 0
    },
    south: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

intersection.plugin(uniqueValidator, { message: "{PATH} already exist." });

const Intersection = mongoose.model("intersection", intersection);

module.exports = Intersection;
