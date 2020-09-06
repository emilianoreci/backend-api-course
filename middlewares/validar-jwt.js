const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  // header x-token, por buena practica se pone x- para los headers personalizados
  const token = req.header("x-token");
  //console.log(token);

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no hay token en la peticion",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    //console.log(uid, name);
    //console.log(payload);
    const { uid, name } = payload;

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token no valido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
