import ApiResponse from "../../common/utils/api.response.js"
import * as authService from "./auth.service.js"

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        ApiResponse.created(res, "Registration success", user)
    } catch (err) { next(err) }
}

const login = async (req, res, next) => {
    try {
        const { user, accessToken, refreshToken } = await authService.login(req.body);
        ApiResponse.ok(res, "Login successful", { user, accessToken, refreshToken });
    } catch (err) { next(err) }
}

const getMe = async (req, res, next) => {
    try {
        const user = await authService.getme(req.user.id);
        ApiResponse.ok(res, "User Profile", user);
    } catch (err) { next(err) }
}

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.refresh(refreshToken);
        ApiResponse.ok(res, "Token refreshed successfully", tokens);
    } catch (err) { next(err) }
}

const logout = async (req, res, next) => {
    try {
        await authService.logout(req.user.id);
        ApiResponse.noContent(res);
    } catch (err) { next(err) }
}

export { register, login, getMe, refresh, logout }
