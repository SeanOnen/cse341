const express = require('express');
const router = express.Router();
const passport = require('passport');

// GET /auth/github - initiate GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GET /auth/github/callback
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/auth/profile'); }
);

// GET /auth/profile
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated. Please log in at /auth/github' });
  }
  res.json({
    message: 'Authenticated successfully',
    user: {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName
    }
  });
});

// GET /auth/logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;