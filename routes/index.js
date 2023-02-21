const express = require('express');
const router = express.Router();
const pool = require('../db')
const {addPersonaPost,getDatos,getDeletePersona,getUpdatePersona,updatePost} = require('../controllers/index.controller')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/add', (req, res, next) => {
    res.render('formulario')
})

router.post('/add', addPersonaPost)

router.get('/datos', getDatos)

router.get('/delete/:id', getDeletePersona)

router.get('/update/:id', getUpdatePersona)

router.post('/update/:id', updatePost)

module.exports = router;
