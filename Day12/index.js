const express = require('express')
const path = require('path')
const app = express()
const dummy = require('./src/assets/database/blog.json')


const port = 5000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.static('src/assets'))

app.use(express.urlencoded({extended: false}))


app.get('/', home)
app.get('/addproject', formproject)
app.post('/addproject', addproject)
app.get('/projectdetail', projectdetail)
app.get('/testimonials', testimonials)
app.get('/contactme', contactme)
app.get('/deleteproject/:id', deleteproject)
app.get('/updateblog/:id', formupdateblog)
app.post('/updateblog/:id',updateblog)

app.listen(port, () => {
    console.log("App Listening on port 5000")
})

const data = []

function home(req, res){
    res.render('index',{dummy} )
}


function formproject(req, res){
    res.render('add-blog')
    
}

function addproject(req, res){
    const { ProjectName,StartDate,DateEnd,desc,checkbox,uploadimage } = req.body

    const datablog= { ProjectName,StartDate,DateEnd,desc,checkbox,uploadimage }
    dummy.unshift(datablog)

    res.redirect("/")

}

function projectdetail(req, res){
    res.render('blog-detail')
}

function testimonials(req, res){
    res.render('testimonial')
}

function contactme(req, res){
    res.render('contact-me')
}

function formupdateblog(req, res){
    const { id } = req.params
    const dummyData={...dummy[id],id}
    
    res.render('updateblog',{data:dummyData})
    
}

function updateblog(req, res){
    const { ProjectName,StartDate,DateEnd,desc,checkbox,uploadimage } = req.body
    const {id} = req.params
    const datablog= { ProjectName,StartDate,DateEnd,desc,checkbox,uploadimage }

    dummy.splice(id, 1, datablog)

    res.redirect('/')

}

function deleteproject(req, res){
    const { id } = req.params

dummy.splice(id, 1)
res.redirect('/')
}