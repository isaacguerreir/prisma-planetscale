require('dotenv').config()
import express from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const app = express()
app.use(express.json())

interface UserRequest {
  name: string
  email: string
}

app.get('/users', async (_, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/user', async (req, res) => {
  try {
    const { name, email } = req.body as UserRequest
    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })
    res.json(user)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server listening in port ${port}`)
})
