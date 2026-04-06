// server\src\common\utils\jwt.utils.js
import jwt from "jsonwebtoken"

const generateAccessToken = (payload) =>{
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m'
    })
    return accessToken;
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    })
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}