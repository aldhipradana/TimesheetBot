require('dotenv').config()
const cronJob = require('node-cron')
const express = require('express') 
const bodyParser = require('body-parser') 
const axios = require('axios')  

const {TOKEN, SERVER_URL, CHAT_ID} = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL+URI

const app = express()
app.use(bodyParser.json())


const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(URI, async (req, res) => {
    console.log(req.body)

    const aldhi_id = 527597461
    if(req.body.message.from.id == aldhi_id){
        console.log('aldhi is talking')
    }
    
    return res.send()
})

/**
 *  seconds | minutes | hours | day of month | month | day of week|
 * 
 *  cron settings:
 *  every workdays (mon - fri) at 17:00:00
 * 
 */
cronJob.schedule("0 * 17 * * 1-5", function(){  


    let datenow = new Date().toLocaleString("en-US", {timeZone: "Asia/Shanghai"}).split(',')[0]
    let [month, day, year] = datenow.split('/')

    let timesheet = `https://docs.google.com/forms/d/e/1FAIpQLSfYPQhxINo1zLJ9ZXoKfyvOy2rFvvtLsAZyYt25k9gP2N7DTg/viewform?usp=pp_url&entry.2116052852=Gede+Aldhi+Pradana&entry.532096719=Software+Developer&entry.1369552271=Robotmanager&entry.813213160_hour=08&entry.813213160_minute=00&entry.1923238489_hour=17&entry.1923238489_minute=00&entry.1060472253_day=${day}&entry.1060472253_month=${month}&entry.1060472253_year=${year}`

    axios.post(`${TELEGRAM_API}/sendMessage`,  {
        chat_id: CHAT_ID,
        text: `${timesheet}`
    })

    console.log(timesheet);
    
});

app.listen(process.env.PORT || 5000, async () => {
    console.log('🚀 app running on port', process.env.PORT || 5000)
    await init()
})