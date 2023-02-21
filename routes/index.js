const express = require('express');
const router = express.Router();
const pool = require('../db')


router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/add', (req, res, next) => {
    res.render('formulario')
})

router.post('/add', async (req, res, next) => {
    console.log(req.body);
    const {DNI, NOMBRE, APELLIDO, EDAD} = req.body
    if (!DNI || !NOMBRE || !APELLIDO || !EDAD ) {
        res.status(400).send("No te dejes nada vacío"+"<a href='/'>Volver al inicio</a>")
    } else {
        await pool.query("INSERT INTO ejemplo set ?",{DNI, NOMBRE, APELLIDO, EDAD})
        res.redirect("/datos")
    }
})

router.get('/datos', async (req, res, next) => {
    const [resultado_ejemplo] = await pool.query("SELECT * from ejemplo")
    console.log(resultado_ejemplo)
    res.render('personas', {resultado_ejemplo})
})

router.get('/delete/:id', async (req, res, next) => {
    console.log(req.params.id)
    await pool.query("DELETE FROM ejemplo where id = ?", req.params.id)
    res.redirect('/datos')
})

router.get('/update/:id', async (req, res, next) => {
    // console.log(req.params.id)
    const {id} =req.params
    const [resul] = await pool.query("SELECT * from ejemplo where id = ?", [id])
    console.log(resul[0])
    const persona = resul[0]
    res.render('personas_editar', {persona})
})

router.post('/update/:id', async (req, res, next) => {
    // console.log(req.params.id)
    const {id} =req.params
    const nuevosDatos = req.body
    await pool.query("UPDATE ejemplo set ? where id = ?", [nuevosDatos, id])
    res.redirect('/datos')
})

module.exports = router;
