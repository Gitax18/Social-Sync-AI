import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import User from "../models/user.model";

class PassportServices {
    private jwtSecret: string;
    private refreshJwtSecret: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "secret";
        this.refreshJwtSecret = process.env.REFRESH_JWT_SECRET || "refresh_secret";

        // User Access Token Strategy
        const userOpts: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.jwtSecret,
        };

        passport.use(
            "user",
            new JwtStrategy(userOpts, async (jwt_payload, done) => {
                console.log("Access token user", jwt_payload);
                try {
                    const user = await User.findById(jwt_payload._id);
                    console.log("user", user);
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                } catch (error) {
                    console.log("error", error);
                    return done(error, false);
                }
            })
        );
    }

    initialize() {
        return passport.initialize();
    }

    authenticate(strategy: string) {
        return passport.authenticate(strategy, { session: false });
    }

    authenticateRefresh() {
        return passport.authenticate("refresh", { session: false });
    }
}

const PassportService = new PassportServices();
export default PassportService;
