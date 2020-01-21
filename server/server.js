const express = require('express');
const app = express();
const fs = require('fs');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next()
})
app.use(express.json())

// app.post('/createText', async (req, res) => {
//     try {

//         if (req.body.array[0] === 'en') {
//             const file = JSON.parse(fs.readFileSync("en.json"))
//             req.body.array[1].forEach(elem=>{
//                 file[elem[0]] = elem[1]
//             })

//             fs.writeFileSync('en.json', JSON.stringify(file))
//             res.send(file)

//         };
//         if (req.body.array[0] === 'arm') {
//             const file = JSON.parse(fs.readFileSync("arm.json"))
//             req.body.array[1].forEach(elem=>{
//                 file[elem[0]] = elem[1]
//             })

//             fs.writeFileSync('arm.json', JSON.stringify(file))
//             res.send(file)
//             console.log(file)
//         };
//         if (req.body.array[0] === 'ru') {
//             const file = JSON.parse(fs.readFileSync("ru.json"))
//             req.body.array[1].forEach(elem=>{
//                 file[elem[0]] = elem[1]
//             })

//             fs.writeFileSync('ru.json', JSON.stringify(file))
//             res.send(file)
//         }
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })


app.post('/sendEnglishData', async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync("arm.json"))
        for (let [key, val] of Object.entries(req.body.bigObj)) {
            file[key] = val
        }

        fs.writeFileSync('arm.json', JSON.stringify(file))
        res.send(file)
        console.log(file)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/sendRussianData', async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync("ru.json"))
        for (let [key, val] of Object.entries(req.body.bigObj)) {
            file[key] = val
        }

        fs.writeFileSync('ru.json', JSON.stringify(file))
        res.send(file)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

app.post('/sendArmenianData', async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync("en.json"))
        for (let [key, val] of Object.entries(req.body.bigObj)) {
            file[key] = val
        }

        fs.writeFileSync('en.json', JSON.stringify(file))
        res.send(file)
    } catch (e) {
        res.status(500).send(e)
    }
})


app.get('/getEnglishData',async (req,res)=>{
    try{
        const contentObj = JSON.parse(fs.readFileSync("en.json"))
        res.send(contentObj)
    }catch(e){
        res.status(500).send(e)
    }
})

app.get('/getRussianData',async (req,res)=>{
    try{
        const contentObj = JSON.parse(fs.readFileSync("ru.json"))
        res.send(contentObj)
    }catch(e){
        res.status(500).send(e)
    }
})


// app.post('/sendData', async (req, res) => {
//     try {
//         const data = JSON.parse(fs.readFileSync(`${req.body.lang}.json`))
//         const newObj = {}
//         req.body.ids.forEach(element => {
//             for (let [key, value] of Object.entries(data)) {
//                 if (key === element) {
//                     newObj[key] = value
//                 }
//             }
//         });
//         res.send(newObj)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })


app.listen(8080, () => {
    console.log("Server run!!")
})