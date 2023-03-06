 const {
     client,
     getAllUsers
  } = require('./index');




async function dropTables() {
    try {
        console.log("Starting to drop tables...")

        await client.query(`
        DROP TABLE IF EXISTS users;
        `);
        console.log("Finished dropping the tables!")
    } catch (error) {
        console.error("Error dropping tables!")
        throw error;
    }
}

async function createTables() {
    try {
        console.log("Starting to build tables...")
        await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username varchar(255) NOT NULL,
            password varchar(255) NOT NULL
        );
     `)
     console.log("Finished building tables!!")
    } catch (error) {
        console.log("Error building tables!!")
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
    } catch (error) {
        console.error(error);
        throw error;
    } 
}

async function testDB() { 
    try {
        client.connect();
        const result = await client.query('SELECT * FROM users;');
        console.log(result)
    
} catch (error) {
    console.error(error);

} finally {
    client.end();
    }   
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(()=>client.end());Save-Script