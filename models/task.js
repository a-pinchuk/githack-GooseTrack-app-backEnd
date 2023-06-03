const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const regexpData =
  /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/;
const regexpTime = /^([01]\d|2[0-3]):[0-5]\d$/;
const typeCategory = ["to-do", "in-progress", "done"];
const typePriority = ["low", "medium", "high"];

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "DB: Title is required"],
    },
    date: {
      type: String,
      required: [true, "DB: Date is required"],
      match: regexpData,
      //  YYYY-MM-DD
    },
    start: {
      type: String,
      required: [true, "DB: Start is required"],
      match: regexpTime,
      //  09:00
    },
    end: {
      type: String,
      required: [true, "DB: End is required"],
      match: regexpTime,
      //  09:00
      // end > start
    },
    priority: {
      type: String,
      required: [true, "DB: Priority is required"],
      enum: typePriority,
      default: typePriority[0],
      // low | medium | high
    },
    category: {
      type: String,
      required: [true, "DB: Category is required"],
      enum: typeCategory,
      default: typeCategory[0],
      // to-do | in-progress | done
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: [true, "Set owner contact"],
    // },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

// * JOI
// * Validation start < end
const validateStartEndTime = (obj, helpers) => {
  function toMinute(time) {
    const arrTime = time.split(":");
    return Number(arrTime[0]) * 60 + Number(arrTime[1]);
  }
  const { start, end } = obj;

  if (toMinute(start) >= toMinute(end)) {
    return helpers.error("any.invalid");
  }
};

const schemaAddTask = Joi.object({
  title: Joi.string().max(250).required(),
  date: Joi.string().pattern(regexpData).min(10).max(10).required().messages({
    "string.pattern.base": `The field "date" must be of the following type "YYYY-MM-DD"`,
  }),
  start: Joi.string().pattern(regexpTime).min(5).max(5).required().messages({
    "string.pattern.base": `The field "start" must be of the following type "hh:mm"`,
  }),

  end: Joi.string().pattern(regexpTime).min(5).max(5).required().messages({
    "string.pattern.base": `The field "end" must be of the following type "hh:mm"`,
  }),
  priority: Joi.string()
    .valid(...typePriority)
    .required(),

  category: Joi.string()
    .valid(...typeCategory)
    .required(),
})
  .custom(validateStartEndTime)
  .messages({
    "any.invalid": `The following condition must be met start<end`,
  });

const schemaChangeCategoryTask = Joi.object({
  category: Joi.string()
    .valid(...typeCategory)
    .required(),
});

const schemas = {
  schemaAddTask,
  schemaChangeCategoryTask,
};

const modelTask = model("task", taskSchema);

module.exports = {
  modelTask,
  schemas,
};
