import express from 'express'
import RouterProductos from './router/productos.js'
import RouterClientes from './router/clientes.js'


const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static('public'))

const routerClientes = new RouterClientes();
const routerProductos = new RouterProductos();

app.use("/productos", routerProductos.start());
app.use("/clientes", routerClientes.start());

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`Servidor express escuchando en http://localhost:${PORT}`),
);
server.on("error", (error) => console.log("Servidor express en error:", error));
