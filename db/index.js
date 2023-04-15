
  // and export them

  const client = new Client(process.env.DATABASE_URL);

  async function createUser({ username, password, name, location }) {
    try{
        
    
        const { rows: [user]  } = await client.query(`
        INSERT INTO users(username, password, name, location)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `, [username, password, name, location]);
        
        return user;

    } catch (error){
        throw error;
    }
  }
 
  async function getAllUsers() {
    try{
    const { rows } = await client.query(
      `SELECT id, username, name, location, active
      FROM users;
    `);
  
    return rows;
  } catch (error) {
    throw error;
  }
}
   module.exports = {
    createUser,
    getAllUsers,
    client,
    getAllUsers,
  }