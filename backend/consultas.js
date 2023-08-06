const { Pool } = require('pg')
const pool = new Pool({
host: 'localhost',
user: 'postgres',
password: 'Administradora',
database: 'likeme',
allowExitOnIdle: true
})

const obtenerPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}

const agregarPost = async (titulo, url, descripcion) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, 0)"
    const values = [titulo, url, descripcion]
    const result = await pool.query(consulta, values)
    console.log("Post agregado")
}

const borrarPost = async(id) => {
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
}


const modificarLikes = async (likes, id) => {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2"
    const values = [likes, id]
    const result = await pool.query(consulta, values)
}

module.exports = { obtenerPosts, agregarPost, borrarPost, modificarLikes} 
