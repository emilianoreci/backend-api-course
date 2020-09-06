//  @ Package
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

//  @ Own
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");

router.post(
  "/new",
  [
    //middlewares
    check("name", "el nombre debe ser obligatorio").not().isEmpty(),
    check("email", "el email debe ser obligatorio").isEmail(),
    check("password", "el password debe de tener 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "el email debe ser obligatorio").isEmail(),
    check("password", "el password debe de tener 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
