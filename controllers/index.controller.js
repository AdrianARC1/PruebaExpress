const pool= require('../db.js')

const addPersonaPost = async (req, res, next) => {
    try {
        console.log(req.body);
        const {DNI, NOMBRE, APELLIDO, EDAD} = req.body
        if (!DNI || !NOMBRE || !APELLIDO || !EDAD ) {
            res.status(400).send("No te dejes nada vacío"+"<a href='/'>Volver al inicio</a>")
        } else {
            await pool.query("INSERT INTO ejemplo set ?",{DNI, NOMBRE, APELLIDO, EDAD})
            // req.flash('success','Persona añadida perfectamente')
            res.redirect("/datos")
        }
    } catch (error) {
        return res.status(500).json({
                    message: 'Algo ha ido mal'
                })
    }
}

const getDatos = async (req, res, next) => {
    try {
        
        const [resultado_ejemplo] = await pool.query("SELECT * from ejemplo")
        console.log(resultado_ejemplo)
        res.render('personas', {resultado_ejemplo})
    } catch (error) {
        return res.status(500).json({
                    message: 'Algo ha ido mal'
                })
    }
}

const getDeletePersona = async (req, res, next) => {
    try {
            console.log(req.params.id)
    const [result] = await pool.query("DELETE FROM ejemplo where id = ?", req.params.id)
    
    if(result.affectedRows<=0){
        res.status(404).json({
            message: 'Persona no encontrada'
        })
    }
    
    res.redirect('/datos')
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
}
}

const getUpdatePersona = async (req, res, next) => {
    try {
        // console.log(req.params.id)
        const {id} =req.params
        const [resul] = await pool.query("SELECT * from ejemplo where id = ?", [id])
        console.log(resul[0])
        const persona = resul[0]
        res.render('personas_editar', {persona})
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
}

const updatePost = async (req, res, next) => {
    try {
            // console.log(req.params.id)
        const {id} =req.params
        const nuevosDatos = req.body
        await pool.query("UPDATE ejemplo set ? where id = ?", [nuevosDatos, id])
        res.redirect('/datos')
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
}

module.exports={addPersonaPost,getDatos,getDeletePersona,getUpdatePersona,updatePost}