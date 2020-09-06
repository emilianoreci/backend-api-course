//  @ Package
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

const router = Router();
//subo de nivel el middleware, para no estar aplicandoselo a cada ruta
router.use(validarJWT);

router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    //el metodo custom, permite pasar a una fn para realizar una validacion personalizada.
    check("start", "la fecha start es obligatorio").custom(isDate),
    check("end", "la fecha end es obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

module.exports = router;

/*
//obtener eventos
router.get("/", validarJWT, getEventos);

//crear un nuevo evento
router.post("/", validarJWT, crearEvento);

//actualizar evento
router.put("/:id", validarJWT, actualizarEvento);

//eliminar evento
router.delete("/:id", validarJWT, eliminarEvento);
*/
