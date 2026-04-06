// server\src\module\auth\auth.service.js
import User from "./auth.model.js";
import ApiError from "../../common/utils/api.error.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } from "../../common/utils/jwt.utils.js";
import crypto from "crypto";

const hashToken = (token) =>
    crypto.createHash("sha256").update(token).digest("hex");


const register = async ({ name, email, password }) => {

    const existing = await User.findOne({ email });
    if (existing) throw ApiError.conflict("Email already exists");

    const user = await User.create({
        name,
        email,
        password,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};


const login = async ({ email, password }) => {

    const user = await User.findOne({ email }).select("+password +refreshToken");

    if (!user) throw ApiError.notFound("User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw ApiError.unauthorized("Invalid credentials");

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashToken(refreshToken);

    user.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await user.save();
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken
    delete userObj.refreshTokenExpiry
    return { user: userObj, accessToken, refreshToken }

};
const getme = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw ApiError.unauthorized("User not found");
    return user;

}
const refresh = async (token) => {
    if (!token) throw ApiError.unauthorized("Refresh token missing");

    let decoded;
    try {
        decoded = verifyRefreshToken(token);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
            await User.findByIdAndUpdate(payload.id, { refreshToken: null, refreshTokenExpiry: null });
            throw ApiError.unauthorized("Session expired, please login again");
        }
        throw ApiError.unauthorized("Invalid refresh token");
    }

    const user = await User.findById(decoded.id).select("+refreshToken +refreshTokenExpiry");
    if (!user) throw ApiError.unauthorized("User not found");

    if (!user.refreshTokenExpiry || user.refreshTokenExpiry < new Date()) {
        await User.findByIdAndUpdate(decoded.id, { refreshToken: null, refreshTokenExpiry: null });
        throw ApiError.unauthorized("Session expired, please login again");
    }

    if (user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token");
    }

    const newAccessToken = generateAccessToken({ id: user._id });
    const newRefreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashToken(newRefreshToken);
    user.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await user.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}
const logout = async (userId) => {
 
    await User.findByIdAndUpdate(userId, { refreshToken: null });
};
export { register, login, getme, logout , refresh};