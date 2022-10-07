const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const response = require('./response.json');

const PORT = process.env.PORT || 3008;

server.use(middlewares);

server.get('/api/response', (req, res) => {
    res.jsonp(response);
})

server.listen(PORT, () => {
    console.log('process.env.PORT', process.env.PORT);
    console.log('Server running at http://127.0.0.1:' + PORT);
})