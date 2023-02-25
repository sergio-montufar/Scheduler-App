const isAunthenticated = (req, res, next) => {
    if (req.sessions.currentUser) {
        return next();
    } else {
        res.redirect("/sessions/new")
    }
}

modules.exports = isAunthenticated;