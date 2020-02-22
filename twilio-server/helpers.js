const Table = require('cli-table')

module.exports = {
    transpose: (k, v) => {
        let nm = {}
        nm[k] = v
        return nm
    },
    printInterface = state =>  {
        process.stdout.write('\033c')
         console.log("––––– Live Interface –––––")
         const table = new Table()
         table.push(...Object.keys(state).map(a=>transpose(a, state[a])))
        console.log(table.toString())
     },
     setupApp: () => {
        const express = require('express')
        const bodyParser = require('body-parser')
        const app = express()
        app.use(bodyParser.urlencoded({extended: false}))
        return app
     }
}