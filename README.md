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



/**********
 * HEROKU *
 **********/

*checkar q el archivo index.js el server.listen este con variable entorno y no harcodeado por ej en 4000.
*en el package.json el script start debe estar como "node index.js"
*heroku free, permite hasta 5 proyectos free.
*crear una app en heroku
* $heroku --version 
* Si el comando anterior no devuelve la version hay que instalar heruku cli con:
    npm install -g heroku
* dentro de la carpeta del proyecto:
    heroku login
/*************************************************************
 * COMITEAR EL CODIGO A HEROKU, VA LA RUTA DE CADA PROYECTO: *
 *************************************************************/
    heroku git:clone -a api-backend-curso-udemy-herrer
    git push heroku master


Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master


ver logs en consola cuando esta desployada la app:
*el siguiente comando debe ejecutarse en la carpeta del proyecto:
    heroku logs -n 1000 --tail