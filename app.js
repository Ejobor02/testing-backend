const express = require ('express');

const app = express()
const PORT = 8080

// configure ejs
app.set('view engine','ejs')

//routes
const trainees =[
    {name:'Christy',profession:'front-end-developer'},
    {name:'Ejiro',profession:'back-end-developer'},
    {name:'Henry',profession:'mobile app dev'},
    {name:'John',profession:'desktop dev'},
  ]

app.get('/',(req,res)=>{
    res.render('index',{title:'EJS HOME PAGE',trainees})


})

app.get('/about',(req,res)=>{
    res.render('about',{title:'EJS ABOUT PAGE'})


})

app.use((req,res)=>{
    res.status('404').render('404',{title:'EJS Error'})
})

app.listen(PORT,()=>{
    console.log(`server runnimg on port ${PORT}`);
})