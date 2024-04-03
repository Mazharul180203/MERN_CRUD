import {DecodeToken} from "../utility/tokenUtility.js";

export default (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    //let token = req.cookies['token']
    console.log("token",token)
    let decoded = DecodeToken(token);
    console.log("decoded",decoded)
    if (decoded === null) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    } else {
        let userID = decoded['userID'];
        let userName = decoded['userName'];
        req.headers.userID = userID;
        req.headers.userName = userName;
        //res.json(decoded);
        next();
    }
};

export function localVariables(req,res,next) {
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next();
}