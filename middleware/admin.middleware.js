export default function isAdmin (req, res, next){
    try {
        if(!req.user.isAdmin){
            return res
            .status(401)
            .json({ message: "You are not authorized / not an admin." });
        }
        next();
    } catch (error) {
        console.log("Error is in the admin middleware", error);
        res.status(500).json(error)
    }
}