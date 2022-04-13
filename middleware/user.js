// regex copiado do site https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

const validLogin = (req, res, next) => {
  const { displayName, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (email === undefined) return res.status(400).json({ message: '"email" is required' });
  if (!regex.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  next();
};

module.exports = {
  validLogin,
  validEmail,
};