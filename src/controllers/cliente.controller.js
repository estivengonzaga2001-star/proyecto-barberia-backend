const pool = require("../config/db");

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM barberia.clientes"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};

// 🔵 GET POR ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM barberia.clientes WHERE id_cliente = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener cliente" });
  }
};

// 🔵 CREAR CLIENTE
exports.create = async (req, res) => {
  try {
    const { id_usuario } = req.body;

    const result = await pool.query(
      `INSERT INTO barberia.clientes (id_usuario, fecha_registro)
       VALUES ($1, NOW())
       RETURNING *`,
      [id_usuario]
    );

    res.status(201).json({
      message: "Cliente creado correctamente",
      cliente: result.rows[0]
    });

  } catch (error) {
    console.log("🔥 ERROR REAL:", error.message);
    res.status(500).json({
    message: "Error al crear cliente",
    error: error.message
  });
  }
};
// 🔵 ACTUALIZAR CLIENTE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_usuario, fecha_registro } = req.body;

    const result = await pool.query(
      `UPDATE barberia.clientes
       SET id_usuario = $1,
           fecha_registro = $2
       WHERE id_cliente = $3
       RETURNING *`,
      [id_usuario, fecha_registro, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({
      message: "Cliente actualizado correctamente",
      cliente: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar cliente" });
  }
};

// 🔵 ELIMINAR
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM barberia.clientes WHERE id_cliente = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar cliente" });
  }
};