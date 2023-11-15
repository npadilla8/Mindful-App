//function checks if user is currently logged in/registered to have special access
function requireUser(req, res, next) {
    if (!req.user) {
        res.status(401).send({
            name: 'MissingUserError',
            message: 'You must be logged in to perform this action.'
        });
    } else {
        next();
    }
};

//function checks if a user is logged in first, then if that that user is an administrator 
function requireAdmin(req, res, next) {
    if (!req.user) {
        res.send({
            name: "MissingUserError",
            message: "You must be signed in and have special permissions for this action. "
        })
    }
    if (req.user.isAdmin === true) {
        next();
    } else {
        res.send({
            name: 'SpecialPermissionNeeded',
            message: 'Admininistrative permissions needed for this action.'
        })
    }
};


module.exports = {
    requireUser,
    requireAdmin
}