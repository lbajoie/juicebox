async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }
  
  // and export them
  module.exports = {
    client,
    getAllUsers,
  }

  async function createUser({ username, password }) {
    try{
        const result = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        `, [username, password]);
        return result;
    } catch (error){
        throw error;
    }
  }
  module.exports = {
    createUser
  }