let phoneLog = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const express = require('express')
const app = express()
const PORT = 7000



const generateId = () => {
    const id = Math.random() * 1000
    return id
  }


app.use(express.json())




app.get('/info', (request, response) => {
    response.sendFile(__dirname + '/info.html')

})



app.get('/api/phoneLog', (request, response) => {
    response.json(phoneLog)
  })


  app.get('/api/phoneLog/:id', (request, response) => {
    const id =Number(request.params.id)
    const person = phoneLog.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })


  app.delete('/api/phoneLog/:id', (request, response) => {
    const id = Number(request.params.id)
    phoneLog = phoneLog.filter(person => person.id !== id)
  
    response.status(204).end()
  })



  app.post('/api/phoneLog', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }else if(!body.number){
        return response.status(400).json({ 
            error: 'number missing' 
          })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    phoneLog = phoneLog.concat(person)
  
    response.json(person)
  })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})