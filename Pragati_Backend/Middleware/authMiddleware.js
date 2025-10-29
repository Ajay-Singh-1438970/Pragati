// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// export const authenticateUser = async (req,res,next)=>{
//     let token;

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         try {
//             token = req.headers.authorization.split(" ")[1];
//             const decoded = jwt.verify(token,process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select("");
//             if(req.user == null){
//                 req.user = await User.findById(decoded.id).select("");
//             }
//             if(!req.user){
//                 return res.status(401).json({message: "User Not Found"});
//             }
//             next();
//         } catch (error) {
//             console.log("Auth Middleware Error: ", error.message);
//             res.status(401).json({message: "Not Authorized, token failed"});
//         }
//     }
//     else{
//         res.status(401).json({message: "No token, authorization denied"});
//     }
// }



import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    // console.log("Request Body:", req.body);


    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ message: "Not Authorized, token failed" });
  }
};
