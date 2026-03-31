import type { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & {username? : string, password?:string , id?:string}
        }
    }
}
export {}