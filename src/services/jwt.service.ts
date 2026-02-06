import jwt from "jsonwebtoken";

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

        return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: "15m",
        });
    },

    issueRefreshToken(userId: string) {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        return jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
            expiresIn: "7d",
        });
    },

    verifyToken(token: string) {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        return jwt.verify(token, process.env.JWT_SECRET_KEY!);
    },
}

export default JwtService;