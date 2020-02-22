const express = require('express')
const bodyParser = require('body-parser')
const { NlpManager } = require('node-nlp')
const manager = new NlpManager({ languages: ['en'] })

manager.addDocument('en', 'more bass', 'change.morebass');
manager.addDocument('en', 'less bass', 'change.lessbass');
manager.addDocument('en', 'louder', 'change.louder');
manager.addDocument('en', 'too loud', 'change.quieter');
manager.addDocument('en', 'volume up', 'change.louder');
manager.addDocument('en', 'quieter', 'change.quieter');
manager.addDocument('en', 'too quiet', 'change.louder');
manager.addDocument('en', 'can\'t hear', 'change.louder');
manager.addDocument('en', 'volume down', 'change.quieter');
manager.addDocument('en', 'higher bpm', 'change.bpm.up');
manager.addDocument('en', 'lower bpm', 'change.bpm.down');
manager.addDocument('en', 'faster', 'change.bpm.up');
manager.addDocument('en', 'too fast', 'change.bpm.down');
manager.addDocument('en', 'slower', 'change.bpm.down');
manager.addDocument('en', 'too slow', 'change.bpm.up');


const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => res.send(`<a href="sms:${NUMBER}">Text number</a>`))

app.post("/message", async function (request, response) {
    let d = await update(request.body.Body)
    response.send(`<Response><Message>✅ Changes made:\n\n${d.map(a=>'- ' + a).join('\n')}</Message></Response>`)
  });

async function update(message) {
    const r = await manager.process('en', message)
    console.log(r)
    return r.classifications.map(a=>`${a.intent} (${Math.round(a.score*100)}% sure)`)
}

(async() => {
    await manager.train();
    manager.save();
    app.listen(process.env.PORT || 3000, () => console.log("Live"))
})();

