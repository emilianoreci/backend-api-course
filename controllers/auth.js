const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

//controladores
//aca vuelvo a requerir express, solamente para que tome el intellisense.
//Ademas de la importancion hay q definirlo x defecto.
//(req, res=express.response) => {}

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await Usuario.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Ya hay un usuario registrado con ese mail",
      });
    }
    user = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Error: Hable con el adm`,
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let userInBd = await Usuario.findOne({ email });

    if (!userInBd) {
      return res.status(400).json({
        ok: false,
        msg: "No hay un usuario con ese mail o contraseña",
      });
    }

    //console.log(userInBd);
    const validPassword = bcryptjs.compareSync(password, userInBd.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password incorrecto",
      });
    }

    // Generar Token
    const token = await generarJWT(userInBd.id, userInBd.name);

    res.status(201).json({
      ok: true,
      msg: `login ok`,
      uid: userInBd.id,
      name: userInBd.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: `Error: Hable con el adm`,
    });
  }
};

//RegenerarToken
const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generar JWT
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
