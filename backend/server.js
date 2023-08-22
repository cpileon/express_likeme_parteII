const { handleErrors } = require('./errors')
const { obtenerPosts, agregarPost, borrarPost, modificarLikes } = require('./consultas')
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')

app.listen(3000, console.log("Servidor encendido en puerto 3000"))

app.use(cors())


app.get("/posts", async (req, res) => {
    try{
    const posts = await obtenerPosts()
    res.json(posts)
    //respuesta del servidor
    }catch (error) {
        console.log(error)
        const { status, message } = handleErrors(error.code)
        return res.status(status).json({ok: false, result: message})
    }
})

app.post("/posts", async (req, res) => {
    try{
        const { titulo, url, descripcion } = req.body
        await agregarPost(titulo, url, descripcion)
        res.send("Post agregado con éxito")
    }catch (error) {
        console.log(error)
        const { status, message } = handleErrors(error.code)
        return res.status(status).json({ok: false, result: message})
    }
})

app.delete("/posts/:id", async (req,res) =>{
    try{
        const { id } = req.params
        await borrarPost(id)
        res.send("Post eliminado con éxito")
    }catch (error) {
        console.log(error)
        const { status, message } = handleErrors(error.code)
        return res.status(status).json({ok: false, result: message})
    }
})


app.put("/posts/:id", async (req, res) => {{
}   
    try{
        const { id } = req.params
        let { likes } = req.query
        await modificarLikes(likes, id)
        res.send("Likes actualizados con éxito")
    }catch (error) {
        console.log(error)
        const { status, message } = handleErrors(error.code)
        return res.status(status).json({ok: false, result: message})
    }
})
