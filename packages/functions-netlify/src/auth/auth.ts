import * as jwt from "jsonwebtoken";
import cookie from "cookie"
import { JWT_SECRET, COOKIE_NAME } from "./constants"

export function generateCookie(storeId: string, accessToken: string) {
    return cookie.serialize(COOKIE_NAME, sign(storeId, accessToken), {
        secure: true,
        httpOnly: true,
        path: '/',
        maxAge: 86400,
    })
}

export function sign(storeId: string, accessToken: string) {
    return jwt.sign(
        { "store_id": storeId, "access_token": accessToken },
        JWT_SECRET
    )
}

export function verify(cookieHeader: string) {
    return jwt.verify(cookie.parse(cookieHeader)[COOKIE_NAME], JWT_SECRET)
}
