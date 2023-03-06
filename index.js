const {Client} = require('pg');

const client = new Client('postgres://localost:6543/juicebox-dev');

module.exports = {
    client,
}