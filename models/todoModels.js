const { Schema, model, ObjectId } = require("mongoose");

const TodoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },

    author: {
      type: String,
    },

    isComplete: {
      type: Boolean,
      default: false,
    },

    user: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = model("todo", TodoSchema);
