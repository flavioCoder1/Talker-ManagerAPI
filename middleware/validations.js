const ERROR_NOT_VALID_INPUT = 400;
const ERROR_USER_NOT_AUTH = 401;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(ERROR_NOT_VALID_INPUT)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return res.status(ERROR_NOT_VALID_INPUT)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
    next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
      return res.status(ERROR_NOT_VALID_INPUT)
      .json({ message: 'O campo "password" é obrigatório' });
  }
    if (password.length < 6) {
      return res.status(ERROR_NOT_VALID_INPUT)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  next();
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(ERROR_USER_NOT_AUTH).json({ message: 'Token não encontrado' });
  if (token.length !== 16) {
    return res.status(ERROR_USER_NOT_AUTH).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
      return res.status(ERROR_NOT_VALID_INPUT)
  .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length <= 3) {
    return res.status(ERROR_NOT_VALID_INPUT)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(ERROR_NOT_VALID_INPUT)
    .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age <= 18) {
    return res.status(ERROR_NOT_VALID_INPUT)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } 
  next();
};

const validateWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const watchedAtRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
    if (!watchedAtRegex.test(watchedAt)) {
      return res.status(ERROR_NOT_VALID_INPUT)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const numberRate = Number(rate);
  const isValidRate = numberRate % 1 === 0 && numberRate >= 1 && numberRate <= 5;
  if (!isValidRate) {
    return res.status(ERROR_NOT_VALID_INPUT)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};
  
const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  const message = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  if (!talk || !((talk.rate || talk.rate === 0) && talk.watchedAt)) {
    return res.status(ERROR_NOT_VALID_INPUT).json({ message });
  }
  next();
};

module.exports = { 
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
};
