require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const clienteRoutes = require("./routes/cliente.routes");
const citasRoutes = require("./routes/citas.routes");

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use("/auth", authRoutes);
app.use("/clientes", clienteRoutes);
app.use("/citas", citasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});