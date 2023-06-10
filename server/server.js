const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

app.get('/projects/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    console.log(userEmail)

    try {
       const projects = await pool.query('SELECT * FROM projects WHERE user_email = $1', [userEmail])
        res.json(projects.rows)
    } catch (err) {
        console.error(err)
    }
})

    //create a new project
app.post('/projects', async (req, res) => {
    const { user_email, title, progress, date, note } = req.body
    console.log(user_email, title, progress, date, note)
    const id = uuidv4()
    try {
        const newProject = pool.query(`INSERT INTO projects(id, user_email, title, progress, date, note) VALUES ($1, $2, $3, $4, $5, $6)`, [id, user_email, title, progress, date, note])
        res.json(newProject)
    } catch (err) {
        console.error(err)
    }
})

    //edit a new project
app.put('/projects/:id', async (req, res) => {
    const { id } = req.params
    const {user_email, title, progress, date, note} = req.body
    console.log(note)
    try{
        const editProject =
            await pool.query('UPDATE projects SET user_email = $1, title = $2, progress = $3, date = $4, note = $5 WHERE id = $6;',
                [user_email, title, progress, date, note, id])
        res.json(editProject)
    } catch (err) {
        console.error(err)
    }
})

//delete a project
app.delete('/projects/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteProject = await pool.query('DELETE FROM projects WHERE id = $1', [id])
        res.json(deleteProject)
    } catch (err) {
        console.error(err)
    }
})

app.post('/signup', async (req, res) => {
    const {email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES ($1, $2)`, [email, hashedPassword])

        const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr'} )
        res.json({ email, token})

    } catch (err) {
        console.error(err)
    }
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if(!users.rows.length) return res.json({detail: "Такого пользователя не существует"})

        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr'} )

        if (success){
            res.json({ 'email' : users.rows[0].email, token})

        } else {
            res.json({ detail: "Не удалось авторизироваться"})
        }

    } catch (err) {
        console.error(err)
        if (err) {
            res.json({ detail: err.detail})
        }
    }
})



app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))