const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, id_rol } = req.body;

    if (!id_rol) {
      return res.status(400).json({ mensaje: "Debe enviar id_rol" });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO barberia.usuarios(email, password, id_rol) VALUES($1,$2,$3)",
      [email, hash, id_rol]
    );

    res.json({ mensaje: "Usuario creado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM barberia.usuarios WHERE email=$1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no existe" });
    }

    const valido = await bcrypt.compare(password, user.password);

    if (!valido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        rol: user.id_rol
      },
      "secreto",
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};