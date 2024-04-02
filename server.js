import jsonServer from 'json-server';
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();
const server = jsonServer.create();

// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const middlewares = jsonServer.defaults();

console.log('process.env.PORT', process.env.PORT);

const PORT = process.env.PORT || 3008;

server.use(middlewares);

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Test response
const response = require('./responses/test/test.json');
server.get('/api/response-test', (req, res) => {
    res.jsonp(response);
})

const responseParse = require("./responses/test/test-2.json");
server.post(
  "/api/response-test-2",
  jsonParser,
  (req, res) => {
    if (req.body.msisdn) {
      res.jsonp(responseParse);
    } else {
      res.send({
        error: true,
        message: "Missing number in request body",
      });
    }
  }
);

server.listen(PORT, () => {
    console.log('process.env.PORT', process.env.PORT);
    console.log('Server running at http://127.0.0.1:' + PORT);
})