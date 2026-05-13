import Joi from "joi";

const validationForRegister = Joi.object({
  username: Joi.string().trim().required().messages({
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),

  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

const validationForLogin = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Invalid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export { validationForRegister, validationForLogin };
