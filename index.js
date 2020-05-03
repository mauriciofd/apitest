//modules
const express = require('express')
const nocache = require('nocache')
const bodyParser = require('body-parser')

const config = require('./config')

//initializers
const app = express()

//variables
let users = []
let user = {
    id: '',
    name: ''
}

//functions
const listUsers = (users) => {
    let arr = ''

    for (u in users) {
        arr += `\nid ${users[u].id} - nombre ${users[u].name}`
    }
    return arr
}

const showUser = (users, id) => {
    let show = ''
    for (u in users) {
        if (users[u].id == id) {
            show += `\nid ${users[u].id} - nombre ${users[u].name}`
        }
    }
    return show
}

//config
app.use(nocache())
app.use(bodyParser.json())

//routes
app.get('/', (req, res) => {
    res.status(200).send('Hola mundo!')
})

app.get('/users', (req, res) => {
    res.status(200).send(`Esta es la ruta de usuarios \nUsuarios: ${listUsers(users)}`)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    res.status(200).send(`Usuario ${showUser(users, id)}`)

})

app.post('/users', (req, res) => {
    user = {
        id: req.body.id,
        name: req.body.name
    }
    users.push(user)
    res.status(200).send(`El usuario ${user.name} con id ${user.id} fue creado`)
})

app.post('/users/login',(req, res) =>{
    res.status(200).send(`Bienvenido ${req.body.username}`)
})

app.put('/users', (req, res) => {
    const id = req.body.id
    const newUser = {
        id: req.body.id,
        name: req.body.name
    }

    for (u in users) {
        if (users[u].id === id) {
            users[u] = newUser
            res.status(200).send(`El usuario ${users[u].id} se ha actualizado con el nombre ${users[u].name}`)
        }
    }

})

app.delete('/users', (req, res) => {
    const id = req.body.id
    const newArr = users.filter((item) => item.id !== id);
    users = newArr

    res.status(200).send(`El usuario con id: ${id} ha sido eliminado`)
})

//server
app.listen(config.port, () => {
    console.log('Servidor iniciado')
})