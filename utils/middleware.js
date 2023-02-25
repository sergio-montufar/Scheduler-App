const isAuthenticated = (req, res, next) => {
    if (req.sessionStore.currentUser) {
        return next();
    } else {
        res.redirect("/sessions/new")
    }
}

module.exports = isAuthenticated;