const User = require("../Model/login");
const hasher = require("../hash/hash");
const sendCredentialstoMail = require("./Mail");
const passwordGenerator = require("./PasswordGenarator");

async function login(req, res, next) {
  const email_regex = new RegExp(
    "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
  );
  var dbConstraint = {};
  if (email_regex.test(req.body.name)) {
      dbConstraint.email = req.body.name;
    User.find({ ...dbConstraint }, (error, result) => {
      if (result.length > 0) {
        if (error) {
          res.status(500).send({ err: "Error from DB" });
          return next();
        }
          if (
            hasher.checkPassword(
              req.body.password,
              result[0].password,
            )
          ) {
            res.status(200).send({
              msg: "Login successful !",
              user: {
                name: result[0].name,
              },
            });
            return next();
          } else {
            res
              .status(401)
              .send({ err: "Incorrect Credentials" });
            return next();
          }
      } else {
        res.status(404).send({ err: "User not Found" });
      }
    });
  } else {
    res.status(401).send({ err: "Invalid Credentials" });
    return next();
  }
}

async function addUser(request, response) {
  const User_Name = request.body.name;
  const Email = request.body.email;
  try {
    const users = await User.find();
    if (!User_Name || !Email) {
      return response
        .status(404)
        .json({ err: "Invalid Input" });
    }

    if (users.find((user) => user.name === User_Name)) {
      return response
        .status(402)
        .json({ err: "User Name already exists" });
    }
    if (users.find((user) => user.email === Email)) {
      return response
        .status(403)
        .json({ err: "User Email already exists" });
    }
    const originalPassword = passwordGenerator.password;
    const userObject = new User({
      name: request.body.name,
      email: request.body.email,
      password: hasher.encrpytPassword(originalPassword),
    });
    await userObject.save();
    response.status(200).json({
      message: "Successfully Added User Details",
      userObject,
    });
      sendCredentialstoMail.sendCredentialstoMail(
        request.body.email,
        originalPassword,
      );
  } catch (err) {
    response.status(500).json({ err: err.message });
  }
}

module.exports = { login,addUser };
