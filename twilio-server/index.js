

const { NlpManager } = require('node-nlp')
const manager = new NlpManager({ languages: ['en'] })

const center = require('center-align')


const { DEFAULT_STATE, reducers } = require('./states')
const { transpose, printInterface, setupApp } = require('./helpers')
const { NUMBER } = require('./config')

const app = setupApp()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

let state = DEFAULT_STATE

setInterval(() => io.emit('pushstate', state), 1000)

// setInterval(() => printInterface(state), 100)

const updateState = (value) => {
    if(typeof value == 'string')
        value = [value]
    stateHelper(value)
    io.emit('pushstate', state)
}

const stateHelper = (vlist) => {
    console.log(vlist)
    for(let value of vlist) 
        if(reducers[value]) reducers[value].interact(state)
}

for(let r in reducers) 
    for(let keyword of reducers[r].keywords) {
        manager.addDocument('en', keyword, r)
        console.log('en', keyword, r)
    }
        

app.get('/', (req, res) => res.send(`<a href="sms:${NUMBER}">Text number</a>`))
app.get('/interface', (req, res) => res.sendFile(__dirname + '/index.html'))

app.post("/message", async function (request, response) {
    let d = (await manager.process('en', request.body.Body)).classifications.filter(a=>a.score > 0.02 ).map(a=>a.intent)
    updateState(d)
    response.send(`<Response><Message>✅ Changes made:\n\n${d.map(a=>'- ' + a).join('\n')}</Message></Response>`)
})

;(async() => {
    await manager.train();
    manager.save();
    server.listen(process.env.PORT || 3000, () => console.log("Live"))
    // printInterface()
})();

