const http = require('http');
const dotenv = require('dotenv').config();

// Se crea el server Express con el puerto definido
const initServer = async (app) => {
    const server = http.createServer(app);
    const port = process.env.SERVER_PORT || 8080;
    server.listen(port, () => console.log(`Servidor online y disponible en http://localhost:${port} ✅`));
}

module.exports = initServer;