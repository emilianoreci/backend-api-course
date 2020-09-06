const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    //hace una referencia al schema de usuario
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

//le quito __v y le cambio la propiedad _id por solo id, para q la respuesta sea mas bonita
EventoSchema.method("toJSON", function () {
  //this hace referencia a todo el objeto "evento(title, notes, start,end, user, __v, _id")
  // ya almacenado en la bd
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model("Evento", EventoSchema);
