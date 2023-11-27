const express = require('express')
const path = require('path')
const app = express()
const db = require("./src/config/config.json")
const dammy = require("./src/assets/database/blog.json")
const {Sequelize, QueryTypes} = require("sequelize")

const sequelize = new Sequelize(db.development)


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


async function home(req, res){
    try {
        const query = `SELECT id, name, start_date, end_date, description, technologies, image FROM tb_projects`

        let obj = await sequelize.query (query,{type:QueryTypes.SELECT})
        let object = []
        for (let i = 0; i < obj.length; i++) {
            let data = {
                  id: obj[i].id,
                  name: obj[i].name,
                  duration: durationCount(obj[i].start_date,obj[i].end_date),
                  description:obj[i].description,
                  technologies:obj[i].technologies,
                  Image:obj[i].image,
                  author:obj[i].author
              }

         console.log(data);
         object.push(data)
         
         

        }

        res.render ('index', {
            data:object
        })

    } catch (error) {
    console.log(error);
    }
    
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


function durationCount(start,end){
    let dateStart = new Date(start)
    let dateEnd = new Date(end)
    let daysBetween = 1000*60*60*24
  
    let timeDifference = dateEnd - dateStart
    let daysTotal = timeDifference / daysBetween
        daysRemaining = daysTotal % 30
    let MonthTotal = Math.floor(daysTotal/30)
  
    days = daysRemaining
    months = MonthTotal
  
    let duration = ""
    if(months === 0){
        duration +=`
        ${days} Hari
        `
        } else if (months === 1){
        duration += `
        ${months} Bulan ${days} Hari
        `
        } else{
            duration += `
            ${months} Bulan ${days} Hari
            `
        }
    return duration
  }