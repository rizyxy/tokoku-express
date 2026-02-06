import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../middleware/error-handler.middleware";

export enum TokenType {
    ACCESS = "access",
    REFRESH = "refresh",
}

const JwtService = {
    issueTokenPair(userId: string) {
        const accessToken = this.issueAccessToken(userId);
        const refreshToken = this.issueRefreshToken(userId);

        return { accessToken, refreshToken };
    },

    issueAccessToken(userId: string) {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        return jwt.sign({ userId, type: TokenType.ACCESS }, process.env.JWT_SECRET_KEY, {
            expiresIn: "15m",
        });
    },

    issueRefreshToken(userId: string) {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        return jwt.sign({ userId, type: TokenType.REFRESH }, process.env.JWT_SECRET_KEY!, {
            expiresIn: "7d",
        });
    },

    verifyToken(token: string): JwtPayload {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
        } catch (error) {
            throw new AppError("Unauthorized", 401);
        }
    },

    async refreshToken(refreshToken: string) {
        const decodedToken = this.verifyToken(refreshToken);

        if (decodedToken.type !== TokenType.REFRESH) {
            throw new AppError("Invalid token", 401);
        }

        const { userId } = decodedToken;

        const tokenPair = this.issueTokenPair(userId);

        return tokenPair;
    }
}

export default JwtService;

