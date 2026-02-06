import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../middleware/error-handler.middleware";

export enum TokenType {
    ACCESS = "access",
    REFRESH = "refresh",
}

const JwtService = {
    /**
     * Issue a pair of access and refresh tokens
     * @param userId User ID
     * @returns Access and refresh tokens
     */
    issueTokenPair(userId: string): { accessToken: string; refreshToken: string } {
        // Issue access token
        const accessToken = this.issueAccessToken(userId);

        // Issue refresh token
        const refreshToken = this.issueRefreshToken(userId);

        return { accessToken, refreshToken };
    },

    /**
     * Issue an access token
     * @param userId User ID
     * @returns Access token
     */
    issueAccessToken(userId: string): string {
        // Check if JWT secret key is defined
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        // Issue access token
        return jwt.sign({ userId, type: TokenType.ACCESS }, process.env.JWT_SECRET_KEY, {
            expiresIn: "15m",
        });
    },

    /**
     * Issue a refresh token
     * @param userId User ID
     * @returns Refresh token
     */
    issueRefreshToken(userId: string): string {
        // Check if JWT secret key is defined
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        // Issue refresh token
        return jwt.sign({ userId, type: TokenType.REFRESH }, process.env.JWT_SECRET_KEY!, {
            expiresIn: "7d",
        });
    },

    /**
     * Verify a token
     * @param token Token to verify
     * @returns Decoded token payload
     */
    verifyToken(token: string): JwtPayload {
        // Check if JWT secret key is defined
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        // Verify token
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
        } catch (error) {
            throw new AppError("Unauthorized", 401);
        }
    },

    /**
     * Refresh access token
     * @param refreshToken Refresh token
     * @returns New access and refresh tokens
     */
    refreshToken(refreshToken: string): { accessToken: string; refreshToken: string } {
        // Verify token
        const decodedToken = this.verifyToken(refreshToken);

        // Check if token is a refresh token
        if (decodedToken.type !== TokenType.REFRESH) {
            throw new AppError("Invalid token", 401);
        }

        // Get user ID from decoded token
        const { userId } = decodedToken;

        // Issue new token pair
        const tokenPair = this.issueTokenPair(userId);

        return tokenPair;
    }
}

export default JwtService;

