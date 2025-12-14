export function requireGuest(req, res, next) {
  if (req.session.user) {
    return res.redirect("/auth/dashboard");
  }
  next();
}