const request = require('request')

const forecast=(lat, long, callback)=>{
const url ='http://api.weatherstack.com/current?access_key=d62299e1fad90af860b9cbdd8cef6ee7&query='+lat+','+long+'&units=f'
request({url,json:true},(error,{body})=>{
    if (error){
        callback('Unable to connect!',undefined)
    }
    else if(body.error){
        callback(body.error.code,undefined)
    }
    else{
        callback(undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' out there!')
    }
})
}

module.exports=forecast