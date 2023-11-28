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
app.get('/testimonials', testimonials)
app.get('/contactme', contactme)
app.get('/projectdetail/:id', projectdetail)
app.get('/deleteproject/:id', deleteproject)
app.get('/updateblog/:id', formUpdate)
app.post('/updateblog/:id',UpdateProject)

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

 async function addproject(req, res){
    try {
        const { ProjectName, StartDate, DateEnd, description, checkbox } = req.body

        const query = `INSERT INTO tb_projects(name, start_date, end_date, description, technologies, image) values('${ProjectName}', '${StartDate}', '${DateEnd}', '${description}', '{${checkbox}}','dwi')`

        await sequelize.query(query, {type: QueryTypes.INSERT})
        res.redirect('/')
   
    } catch (error) {
        console.log(error);
    }
}


async function projectdetail(req, res){
    try {
        const { id } = req.params
  
        const query = `SELECT tb_projects.name, start_date, end_date, description, technologies, image, tb_user.name AS author FROM tb_projects LEFT JOIN tb_user ON tb_projects.author = tb_user.id WHERE tb_projects.id=${id}`
        let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
  
        let duration = durationCount(obj[0].start_date,obj[0].end_date)
  
        start_date = new Date(obj[0].start_date)
        startDate = start_date.getDate()+' '+start_date.toString().substr(4,3)+' '+start_date.getFullYear();
  
        end_date = new Date(obj[0].end_date)
        endDate = end_date.getDate()+' '+end_date.toString().substr(4,3)+' '+end_date.getFullYear();
  
        const dummyData = {
            ...obj[0],
            startDate,
            endDate,
            duration
        }
  
            res.render('blog-detail', { data: dummyData })
    } catch (error) {
        console.log(error);
    }
  
  }
  

function testimonials(req, res){
    res.render('testimonial')
}

function contactme(req, res){
    res.render('contact-me')
}

async function formUpdate(req, res){
    try {
        const { id } = req.params

        const query = `SELECT name, start_date, end_date, description, technologies, image FROM tb_projects where id=${id}`
        let obj = await sequelize.query(query, {type: QueryTypes.SELECT})
    
        const dbData = {...obj[0], id}
    
        res.render('updateblog', {data: dbData})
    
      } catch (error) {
        console.log(error);
      }
}
   

    async function UpdateProject(req, res){
        try {
            const { id } = req.params
            const { ProjectName, StartDate, DateEnd, description, checkbox} = req.body
      
            const query = `UPDATE tb_projects SET name='${ProjectName}', start_date='${StartDate}', end_date='${DateEnd}', description='${description}', technologies='{${checkbox}}', image='dwi' WHERE id='${id}'`
            
            await sequelize.query(query, {type: QueryTypes.UPDATE})
            res.redirect('/')
          
            } catch (error) {
            console.log(error);
          }
        }


async function deleteproject(req, res){
        const { id } = req.params
        const query = `DELETE FROM tb_projects WHERE id='${id}'`
        await sequelize.query(query, { type: QueryTypes.DELETE })
    
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