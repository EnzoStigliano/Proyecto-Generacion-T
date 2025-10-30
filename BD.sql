CREATE DATABASE Almacen;
USE Almacen;

CREATE TABLE Proveedor (
    idProveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cuit VARCHAR(15),
    telefono INT(20),
    email VARCHAR(100),
    direccion VARCHAR(150),
    ciudad VARCHAR(50),
    provincia VARCHAR(50),
    pais VARCHAR(50)
);

CREATE TABLE Categoria (
    idCategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200)
);

CREATE TABLE Producto (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200),
    precioCosto DECIMAL(10,2) NOT NULL,
    precioVenta DECIMAL(10,2) NOT NULL,
    stock INT,
    idCategoria INT,
    idProveedor INT,
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria),
    FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor)
);

CREATE TABLE Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    dni INT(15),
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150),
    ciudad VARCHAR(50),
    codigoPostal VARCHAR(10),
    telefono VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Empleado (
    idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    dni INT(15),
    cargo VARCHAR(50),
    salario DECIMAL(10,2),
    email VARCHAR(100),
    fechaIngreso DATE
);

CREATE TABLE CompraStock (
    idCompraStock INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    total DECIMAL(10,2),
    idProveedor INT,
    FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor)
);

CREATE TABLE DetalleCompraStock (
    idDetalleCompraStock INT AUTO_INCREMENT PRIMARY KEY,
    idCompraStock INT,
    idProducto INT,
    cantidad INT NOT NULL,
    FOREIGN KEY (idCompraStock) REFERENCES CompraStock(idCompraStock),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

CREATE TABLE Venta (
    idVenta INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    total DECIMAL(10,2),
    tipoPago VARCHAR(20),
    idCliente INT,
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
);

CREATE TABLE DetalleVenta (
    idDetalleVenta INT AUTO_INCREMENT PRIMARY KEY,
    idVenta INT,
    idProducto INT,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2),
    FOREIGN KEY (idVenta) REFERENCES Venta(idVenta),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

-- PROVEEDORES
INSERT INTO Proveedor (nombre, cuit, telefono, email, direccion, ciudad, provincia, pais) VALUES
('Distribuidora Central', '30-12345678-9', '1123456789', 'contacto@dcentral.com', 'Av. Siempre Viva 742', 'Buenos Aires', 'Buenos Aires', 'Argentina'),
('Proveeduría del Sur', '33-98765432-1', '1145678901', 'ventas@psur.com', 'Calle 8 Nº 456', 'La Plata', 'Buenos Aires', 'Argentina'),
('Mayorista Norte', '27-45678901-4', '1133344556', 'info@mnorte.com', 'Ruta 9 km 50', 'Campana', 'Buenos Aires', 'Argentina');

-- CATEGORÍAS
INSERT INTO Categoria (nombre, descripcion) VALUES
('Alimentos', 'Productos comestibles envasados o a granel'),
('Bebidas', 'Bebidas con y sin alcohol'),
('Limpieza', 'Artículos de limpieza y desinfección'),
('Higiene Personal', 'Productos de uso personal y cosmética');

-- PRODUCTOS
INSERT INTO Producto (nombre, descripcion, precioCosto, precioVenta, stock, idCategoria, idProveedor) VALUES
('Arroz Gallo 1kg', 'Arroz blanco largo fino', 500.00, 750.00, 120, 1, 1),
('Aceite Natura 1L', 'Aceite de girasol', 900.00, 1200.00, 80, 1, 1),
('Coca-Cola 2.25L', 'Gaseosa sabor cola', 1300.00, 1800.00, 60, 2, 2),
('Lavandina Ayudín 1L', 'Desinfectante líquido', 700.00, 950.00, 40, 3, 2),
('Shampoo Pantene 400ml', 'Shampoo para cabello normal', 1100.00, 1600.00, 35, 4, 3);

-- CLIENTES
INSERT INTO Cliente (dni, nombre, direccion, ciudad, codigoPostal, telefono, email) VALUES
('35123456', 'María López', 'Belgrano 120', 'Buenos Aires', '1001', '1122233344', 'maria.lopez@email.com'),
('40123457', 'Carlos Gómez', 'San Martín 345', 'La Plata', '1900', '2215566778', 'carlosg@email.com'),
('38111222', 'Lucía Fernández', 'Av. Mitre 890', 'Avellaneda', '1870', '1133322211', 'luciaf@email.com');

-- EMPLEADOS
INSERT INTO Empleado (nombre, dni, cargo, salario, email, fechaIngreso) VALUES
('Juan Pérez', '30222333', 'Encargado', 250000.00, 'juan.perez@almacen.com', '2020-03-15'),
('Sofía Ruiz', '33555111', 'Cajera', 180000.00, 'sofia.ruiz@almacen.com', '2021-07-10'),
('Matías López', '32999111', 'Repositor', 160000.00, 'matias.lopez@almacen.com', '2022-09-05');

-- COMPRAS (CABECERA)
INSERT INTO CompraStock (fecha, total, idProveedor) VALUES
('2025-10-20', 300000.00, 1),
('2025-10-22', 180000.00, 2);

-- DETALLE DE COMPRAS
INSERT INTO DetalleCompraStock (idCompraStock, idProducto, cantidad) VALUES
(1, 1, 100),
(1, 2, 50),
(2, 3, 40),
(2, 4, 30);

-- VENTAS (CABECERA)
INSERT INTO Venta (fecha, total, tipoPago, idCliente) VALUES
('2025-10-25', 5400.00, 'Efectivo', 1),
('2025-10-26', 3600.00, 'Tarjeta', 2);

-- DETALLE DE VENTAS
INSERT INTO DetalleVenta (idVenta, idProducto, cantidad, precioUnitario) VALUES
(1, 1, 2, 750.00),
(1, 2, 1, 1200.00),
(1, 3, 1, 1800.00),
(2, 4, 1, 950.00),
(2, 5, 1, 1600.00);
