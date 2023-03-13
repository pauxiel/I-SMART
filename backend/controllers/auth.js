exports.signup = (req, res) => {
  const {
    surname,
    firstname,
    othername,
    email,
    phonenumber,
    password,
    subject
  } = req.body;
  res.json({
    user: {
      surname,
      firstname,
      othername,
      email,
      phonenumber,
      password,
      subject
    }
  });
};
