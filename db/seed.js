 const {
     client,
     getAllUsers,
     createUser
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

async function createInitialUsers() {
    try {
        console.log("Starting to create users...");
        
    await createUser({ username: 'albert', password: 'bertie99' });
    await createUser({ username: 'sandra', password: '2sandy4me' });
    await createUser({ username: 'glamgal', password: 'soglam' });

        console.log("Finished creating users!");
    } catch(error) {
        console.error("Error creating users!");
        throw error;
    }
}






async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        console.error('Error rebuilding DB!');
        throw error;
    } 
}

async function testDB() { 
    try {
        console.log("Starting to test database...")

        const users = await getAllUsers();
        
        console.log("getAllUsers:", users);


        console.log("Finished database test!!!")

    

        
    
} catch (error) {
    console.error(error);

    }   
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(()=>client.end());