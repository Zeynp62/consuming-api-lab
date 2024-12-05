const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')
const express = require('express')
const app = express()
const PORT = process.env.PORT ? process.env.PORT : '3000'

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/weather/show.ejs', (req, res) => {
  const zip = req.body.zip
  axios({
    method: 'post',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${zip},us&APPID=${process.env.API_KEY}`
  })
    .then((response) => {
      console.log(response.data)
      res.render('weather/show.ejs', { data: response.data })
    })
    .catch((err) => {
      console.log(err)
    })
})

// app.get('/', async (req, res) => {
//   res.render('index.ejs')
// })

//listen for the http
app.listen(PORT, () => {
  console.log('weather  listening')
})
