const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000

app.get("/", async (req, res) => {
    const films = await Film.find()
    res.send(films)
})

app.post("/", async (req, res) => {
    const film = new Film({
        title: res.body.title,
        description: res.body.description,
        image_url: res.body.image_url,
        trailer_url: res.body.trailer_url
    })
    await film.save()
    return res.send(film)
})

app.put("/:id", async(req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: res.body.title,
        description: res.body.description,
        image_url: res.body.image_url,
        trailer_url: res.body.trailer_url
    }, {
        new: true
    })

    return res.send(film)
})

app.delete("/:id", async(req, res) => {
    const film = await Film.findByidAndRemove(req.params.id)
    return res.send(film)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://willengomes:dM3YnxwssMvg6imr@cluster0.0xos8yd.mongodb.net/?retryWrites=true&w=majority')
    console.log("App Running...")
})

const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
})
