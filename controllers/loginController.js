const router = require('express').Router();
const crypto = require('crypto');
const { validateEmail, validatePassword } = require('../middleware/validations');

const SUCESSFUL_RESPONSE = 200;

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = () => crypto.randomBytes(8).toString('hex');
  res.status(SUCESSFUL_RESPONSE).json({ token: token() });
});

module.exports = router;
