import jwt from "jsonwebtoken";

import "../setup.js";

export async function validateToken(req, res, next) {
    const authorization = req.header("Authorization");
    const token = authorization.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const user: any = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.id = user.id;
        next();
    } catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }
}

export default validateToken;