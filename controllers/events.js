const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  try {
    //populate permite traer el user y name de evento, ya que esta relacionado en el schema de evento.
    const evento = await Evento.find().populate("user", "name");
    return res.status(200).json({
      ok: true,
      evento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hablese con el adm ",
    });
  }
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();

    return res.status(200).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el adm",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "no hay un evento con dicho id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no esta autorizado a editar un evento de otra persona",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true } //este parametro, hace que devuelva el ultimo cambio realizado y no el viejo q es por defecto.
    );

    return res.status(200).json({
      ok: true,
      msg: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el adm",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "no hay un evento con dicho id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no esta autorizado a eliminar un evento de otra persona",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el adm",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
