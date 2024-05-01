import joi from "joi";

const schema = joi.object({
  place: joi.required(),
  date: joi.date().required().messages({
    "date.base": "Date must be a valid date",
    "any.required": "Date is required",
  }),
  name: joi
    .string()
    .required()
    .min(3)
    .max(20)
    .trim()
    .pattern(new RegExp("^[a-zA-Z\\s]+$"))
    .messages({
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must be less than or equal to 20 characters long",
      "string.pattern.base": "Name must only contain alphabetic characters and spaces",
      "any.required": "Name is required",
    }),
  photo: joi
    .string()
    .pattern(new RegExp("^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?..(jpg|jpeg|png|gif)$"))
    .messages({
      "string.pattern.base":
        "Photo must be a valid URL to an image with an appropriate image file extension (e.g., .jpg, .jpeg, .png, .gif).",
    }),
  description: joi
    .string()
    .required()
    .min(8)
    .max(50)
    .trim()
    .pattern(new RegExp("^[a-zA-Z\\s]+$"))
    .messages({
      "string.empty": "Description cannot be empty",
      "string.min": "Description must be at least 3 characters long",
      "string.max": "Description must be less than or equal to 20 characters long",
      "string.pattern.base": "Description must only contain alphabetic characters and spaces",
      "any.required": "Description is required",
    }),
  attendees: joi.any(),
  minimumAge: joi.number().required().integer().messages({
    "number.base": "Minimum age must be a number",
    "number.integer": "Age must be an integer",
    "any.required": "Minimum age is required",
  }),
  organizer: joi.required(),
});

export default schema;
