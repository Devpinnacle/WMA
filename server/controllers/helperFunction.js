const User = require("../models/EmpDetails");
const { createTokensAndCookies } = require("../utils/tokensAndCookies");

//* Create and send tokens *****************************************

exports.sendTokensAndCookies = async (req, res, user, statusCode) => {

  const { accessToken } = await createTokensAndCookies(
    user,
    res
  );

  res.status(statusCode).json({
    status: "SUCCESS",
    accessToken,
  });
};
