const validator = schema => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(200).json({
      success: false,
      message: error.details.map(err => err.message),
    });
  }
  next();
};

export default validator;
