module.exports = (req, res, next) => {
  if (req.loggedInUser.role === 'SuperAdmin') {
    next();
  } else {
    res.status(401).json({
      message: 'you are not authorize to access this endpoint',
    });
  }
};
