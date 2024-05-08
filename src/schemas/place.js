import joi from "joi";

const userSchema = joi.object({
  name: joi
    .string()
    .required()
    .min(2)
    .max(20)
    .trim()
    .pattern(new RegExp("^[a-zA-Z\\d\\s]+$"))
    .messages({
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be less than or equal to 20 characters long",
      "string.pattern.base": "Name must only contain alphabetic characters and spaces",
      "any.required": "Name is required",
    }),
  address: joi
    .string()
    .required()
    .min(3)
    .max(30)
    .trim()
    .pattern(new RegExp("^[a-zA-Z\\d\\s]+$"))
    .messages({
      "string.empty": "Address cannot be empty",
      "string.min": "Address must be at least 3 characters long",
      "string.max": "Address must be less than or equal to 30 characters long",
      "string.pattern.base": "Address must only contain alphabetic characters and spaces",
      "any.required": "Address is required",
    }),
  photo: joi.string().uri().messages({
    "string.uri": "Photo must be a valid URL",
  }),
  events: joi.any(),
  date: joi.array().required().messages({
    "date.base": "Date must be a valid date",
    "any.required": "Date is required",
  }),
  occupancy: joi.number().required().integer().messages({
    "number.base": "Occupancy must be a number",
    "number.integer": "Occupancy must be an integer",
    "any.required": "Occupancy is required",
  }),
});

export default userSchema;
