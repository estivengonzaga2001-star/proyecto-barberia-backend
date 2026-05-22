const pool = require("../config/db");

exports.getAll = async (req, res) => {
  const result = await pool.query("SELECT * FROM barberia.citas");
  res.json(result.rows);
};

exports.create = async (req, res) => {
  const { fecha, id_cliente } = req.body;

  await pool.query(
    "INSERT INTO barberia.citas(fecha, id_cliente) VALUES($1,$2)",
    [fecha, id_cliente]
  );

  res.json({ mensaje: "Cita creada" });
};
exports.update = async (req, res) => {

  try {

    const { id } = req.params;

    const { fecha, id_cliente } = req.body;

    const result = await pool.query(
      `UPDATE barberia.citas
       SET fecha = $1,
           id_cliente = $2
       WHERE id_cita = $3
       RETURNING *`,
      [fecha, id_cliente, id]
    );

    res.json({
      mensaje: "Cita actualizada",
      cita: result.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      mensaje: "Error al actualizar cita"
    });

  }

};

exports.delete = async (req, res) => {
  await pool.query(
    "DELETE FROM barberia.citas WHERE id_cita=$1",
    [req.params.id]
  );

  res.json({ mensaje: "Eliminado" });
};