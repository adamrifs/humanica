const express = require('express')
const cors = require('cors')
const connectDB = require('./Config/db')
const calenderRoutes = require('./Routes/calenderRoutes')
const workRoutes = require('./Routes/workRoutes')
const adminRoutes = require('./Routes/adminRoutes')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

connectDB()
app.use('/api/calender', calenderRoutes)
app.use('/api/work', workRoutes)
app.use('/api/admin/',adminRoutes)


app.listen(port, () => {
    console.log(`server connected on ${port}`)
})
