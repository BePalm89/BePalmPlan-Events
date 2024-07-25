import User from '../api/models/User.model.js';
import { verifyToken } from '../utils/jtw.js';

export const isAuth = async ( req, res, next ) => {
    try {
        const token = req.headers.authorization;
        
        if(!token) {
            return res.status(401).json("Unauthorized");
        }

        const parsedToken = token.replace("Bearer ", "");

        const { id } = verifyToken(parsedToken);
        
        const user = await User.findById(id);

        user.password = null;
        req.user = user;

        next();

    } catch (error) {
        return next(error);
    }
}