import joi from "joi";

const schema = joi.object({
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
  lastname: joi
    .string()
    .required()
    .min(3)
    .max(20)
    .trim()
    .pattern(new RegExp("^[a-zA-Z\\s]+$"))
    .messages({
      "string.empty": "Lastname cannot be empty",
      "string.min": "Lastname must be at least 3 characters long",
      "string.max": "Lastname must be less than or equal to 20 characters long",
      "string.pattern.base": "Lastname must only contain alphabetic characters and spaces",
      "any.required": "Lastname is required",
    }),
  photo: joi
    .string()
    .pattern(new RegExp("^(https?://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?..(jpg|jpeg|png|gif)$"))
    .messages({
      "string.pattern.base":
        "Photo must be a valid URL to an image with an appropriate image file extension (e.g., .jpg, .jpeg, .png, .gif).",
    }),
  email: joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: joi
    .string()
    .required()
    .min(8)
    .max(20)
    .trim()
    /*   .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,}$')) */ //para despues
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character (!@#$%^&*)",
      "any.required": "Password is required",
    }),
  age: joi.number().required().integer().min(18).max(120).messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.positive": "Age must be a positive number",
    "number.min": "Age must be at least 18",
    "number.max": "Age must not exceed 120",
    "any.required": "Age is required",
  }),
  genre: joi.string().optional().valid("Male", "Female", "Other").messages({
    "any.only": "Genre must be one of 'male', 'female', or 'other'",
    "string.base": "Genre must be a string",
  }),
  events: joi.array().items(joi.any()),
  role: joi.string().required(),
});

export default schema;
