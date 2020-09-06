Los headers customizados como buena practica se pone el prefijo x-
ej x-token



/************************************************************************************
 * APLICAR MIDDLEWARE A TODAS LAS RUTAS, SIN TENER QUE ESTAR PONIENDOLO EN CADA UNA *
 ************************************************************************************/

ej: aca tengo el middleware validarJWT en cada ruta:
    const router = Router();
    router.get("/", validarJWT, getEventos);
    router.post("/", validarJWT, crearEvento);
    router.put("/:id", validarJWT, actualizarEvento);
    router.delete("/:id", validarJWT, eliminarEvento);

Una forma de aplicarlo a todas las rutas sin repetir, es subiendolo de nivel el middleware:
    router.use(validarJWT)

    router.get("/", getEventos);
    router.post("/", crearEvento);
    router.put("/:id", actualizarEvento);
    router.delete("/:id", eliminarEvento);


En el caso que necesite que por ejemplo una ruta sea publica, osea q no pase por el middleware, es poniendo
el middleware debajo de la ruta:
ej: ahora la ruta del get no usa el middleware, mientras que el resto si lo hace.
    router.get("/", getEventos);

    router.use(validarJWT)

    router.post("/", crearEvento);
    router.put("/:id", actualizarEvento);
    router.delete("/:id", eliminarEvento);



