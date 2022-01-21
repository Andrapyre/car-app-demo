import express, { json } from "express"
// const help = express
const app = express()
const PORT = 3000

app.use(json())

app.get("/cars/:id", (req, res) => {
  console.log(req.params.id)
  res.send("Hello Worlds")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
