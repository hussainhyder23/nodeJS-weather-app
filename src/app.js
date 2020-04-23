const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define Path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Hyder'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Hyder'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:'Hi guys! This is the help page.',
        name:'Hyder'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location }={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude,(error,forecastData)=>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
     res.send({
         products:[]
     })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        message:'Help article not found',
        name:'Hyder'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404',
        message:'Page not found',
        name:'Hyder'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})