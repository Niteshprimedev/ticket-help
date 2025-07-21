const path = require('path')
const express = require('express')
require('colors')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const cors = require('cors')

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(
//   cors({
//     origin: 'https://ticket-help-niteshprimedev.vercel.app',
//     credentials: true,
//   })
// )
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

// Customer Routes
app.use('/api/customers', require('./routes/customers/customerRoutes'))
app.use('/api/customers/tickets', require('./routes/customers/ticketRoutes'))
app.use('/api/customers/products', require('./routes/customers/productRoutes'))
app.use(
  '/api/customers/feedbacks',
  require('./routes/customers/reviewRoutes')
)

// Owner Routes
app.use('/api/owners', require('./routes/owners/ownerRoutes'))
app.use('/api/owners/tickets', require('./routes/owners/ticketRoutes'))
app.use('/api/owners/products', require('./routes/owners/productRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
