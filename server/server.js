const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')


app.use(cors())

app.get('/projects/:userEmail', async (req, res) => {
    const { userEmail } = req.params

    try {
        const projects = await pool.query('SELECT * FROM projects WHERE user_email = &1', [userEmail])
        res.json(projects.rows)
    } catch (err) {
        console.error(err)
    }
})




app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))