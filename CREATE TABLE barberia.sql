-- 1. Roles
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE -- cliente, barbero, administrador
);

-- 2. Usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL, -- Se guardará con Hash
    telefono VARCHAR(20),
    id_rol INT REFERENCES roles(id_rol)
);

-- 3. Barberos
CREATE TABLE barberos (
    id_barbero SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    especialidad VARCHAR(100),
    estado VARCHAR(20) DEFAULT 'activo'
);

-- 4. Clientes (Ajustada con nombre y apellido)
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL, -- Agregado según tu petición
    apellido VARCHAR(100) NOT NULL,
    fecha_registro DATE DEFAULT CURRENT_DATE
);

-- 5. Servicios
CREATE TABLE servicios (
    id_servicio SERIAL PRIMARY KEY,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    duracion INT -- en minutos
);

-- 6. Estados de Cita
CREATE TABLE estados_cita (
    id_estado SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL UNIQUE -- pendiente, en proceso, finalizada, cancelada
);

-- 7. Citas
CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente),
    id_barbero INT REFERENCES barberos(id_barbero),
    id_servicio INT REFERENCES servicios(id_servicio),
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    id_estado INT REFERENCES estados_cita(id_estado)
);

-- 8. Horarios
CREATE TABLE horarios (
    id_horario SERIAL PRIMARY KEY,
    id_barbero INT REFERENCES barberos(id_barbero),
    dia_semana VARCHAR(20),
    hora_inicio TIME,
    hora_fin TIME
);

-- 9. Pagos
CREATE TABLE pagos (
    id_pago SERIAL PRIMARY KEY,
    id_cita INT REFERENCES citas(id_cita),
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(50),
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Historial de Servicios
CREATE TABLE historial_servicios (
    id_historial SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id_cliente),
    id_servicio INT REFERENCES servicios(id_servicio),
    fecha DATE,
    observaciones TEXT
);