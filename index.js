/*
    Rutas de usuarios
    host + /api/auth
*/

const express = require("express");
const { dbConnection } = require("./db/config");
const cors = require("cors");

require("dotenv").config();

//Creador de servidor
const app = express();

//Base de datos
dbConnection();

// CORS
app.use(cors());

//Directorio Publico
app.use(express.static("public"));

//Lectura y parseo del body, sin usar libreria body-parser, desde version 4 de express, trae un middleware
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.listen(4000, () => {
  console.log(`server run on port ${process.env.PORT}`);
});
