const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = (req, res, next) => {
  try {
    const autharizationHeader = req.headers.authorization;
    if (!autharizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = autharizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validataAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
