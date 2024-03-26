const jwt = require("jsonwebtoken");

//* Cookie options *************************************************

const cookieOptions = (maxAge) => ({
  maxAge,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" && "none",
  secure: process.env.NODE_ENV === "production",
});

//* Create tokens **************************************************

const createTokens = async (user) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_EXPIRES_IN }
  );

  return { accessToken };
};

//* Send Cookies ***************************************************

const sendCookies = (res, accessToken, refreshToken) => {
  res.cookie(
    "access",
    accessToken,
    cookieOptions(process.env.ACCESS_COOKIE_EXPIRES_IN)
  );
};

//* Create tokens and send Cookies *********************************

const createTokensAndCookies = async (user, res) => {
  const { accessToken } = await createTokens(user);
  sendCookies(res, accessToken);
  return { accessToken };
};

module.exports = {
    cookieOptions,
    createTokens,
    sendCookies,
    createTokensAndCookies,
  };
  
