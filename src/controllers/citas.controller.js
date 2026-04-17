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

exports.delete = async (req, res) => {
  await pool.query(
    "DELETE FROM barberia.citas WHERE id_cita=$1",
    [req.params.id]
  );

  res.json({ mensaje: "Eliminado" });
};