const express = require('express')
const path = require('path')
const app = express()
const db = require("./src/config/config.json")
const dammy = require("./src/assets/database/blog.json")
const {Sequelize, QueryTypes} = require("sequelize")

const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')

const upload = require('./src/middlewares/uploadFile')


const sequelize = new Sequelize(db.development)

const port = 5000

app.use(session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2
    },  
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: 'rahasia'
  })  
)  


app.use(flash())
app.use(express.static('src/uploads'))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.static('src/assets'))

app.use(express.urlencoded({extended: false}))


app.get('/', home)

app.get('/login', formLogin)
app.post('/login', userLogin)
app.get("/logout", logout);

app.get('/register', register)
app.post('/register', addUser)

app.get('/addproject', formproject)
app.post('/addproject', upload.single('uploadimage'), addproject)

app.get('/testimonials', testimonials)
app.get('/contactme', contactme)

app.get('/projectdetail/:id', projectdetail)
app.get('/deleteproject/:id', deleteproject)
app.get('/updateblog/:id', formUpdate)
app.post('/updateblog/:id',upload.single('uploadimage'), UpdateProject)

app.listen(port, () => {
    console.log("App Listening on port 5000")
})


async function home(req, res){
    try {
        const query = `SELECT tb_projects.id, tb_projects.name, start_date, end_date, description, technologies, image, tb_user.name AS author FROM tb_projects LEFT JOIN tb_user ON tb_projects.author = tb_user.id` 
        let obj = await sequelize.query(query, {type: QueryTypes.SELECT})
        let object = []
        
        let buttonIf = Boolean

        for (let i = 0; i < obj.length; i++){
            if(req.session.user == obj[i].author){
                buttonIf = true
            }else{
                buttonIf = false
            }
              let data = {
                id: obj[i].id,
                name: obj[i].name,
                duration: durationCount(obj[i].start_date,obj[i].end_date),
                description:obj[i].description,
                technologies:obj[i].technologies,
                Image:obj[i].image,
                author:obj[i].author,
                isLogin: req.session.isLogin,
                ifclause: buttonIf
            }
            console.log(data);
            object.push(data)

        }
        res.render('index', {
          data: object,
          user: req.session.user,
          isLogin: req.session.isLogin
          
        })
    } catch (error) {
        console.log(error);
    }
}


function formproject(req, res){
    res.render('add-blog', {
        user: req.session.user,
        isLogin: req.session.isLogin,
      })
}

 async function addproject(req, res){
    try {
        const { ProjectName, StartDate, DateEnd, description, checkbox } = req.body
        const idUser = req.session.idUser
        const image = req.file.filename

        const query = `INSERT INTO tb_projects(name, start_date, end_date, description, technologies, image, author) values('${ProjectName}', '${StartDate}', '${DateEnd}', '${description}', '{${checkbox}}','${image}','${idUser}')`

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
  
            res.render('blog-detail', {
                data: dummyData,
                isLogin: req.session.isLogin,
                user: req.session.user
            })
    } catch (error) {
        console.log(error);
    }
  
  }
  

  function testimonials(req,res) {
    res.render('testimonial', {
    user: req.session.user,
    isLogin: req.session.isLogin
    })

}

function contactme(req, res){
    res.render('contact-me', {
        user: req.session.user,
        isLogin: req.session.isLogin
        })
}

function register(req,res){
    res.render('register')
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
        const image = req.file.filename
      
        const query = `UPDATE tb_projects SET name='${ProjectName}', start_date='${StartDate}', end_date='${DateEnd}', description='${description}', technologies='{${checkbox}}', image='${image}' WHERE id='${id}'`
        
        await sequelize.query(query, {type: QueryTypes.UPDATE})
        res.redirect('/')
      
        } catch (error) {
        console.log(error);
      }
    }


        async function deleteproject(req, res){
            if(!req.session.isLogin){
              req.flash('danger', "Login First")
              res.redirect('/login')
            }else{
                const { id } = req.params
                const query = `DELETE FROM tb_projects WHERE id='${id}'`
                await sequelize.query(query, { type: QueryTypes.DELETE })
            
                res.redirect('/')
            }
           
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



  async function addUser(req, res) {
    try {
      const { name, email, password } = req.body
      

  
      await bcrypt.hash(password, 10, (err, hashPassword) => {
        const query = `INSERT INTO tb_user (name, email, password) VALUES ('${name}', '${email}', '${hashPassword}')`
        
        sequelize.query(query)
      })
      res.redirect('/login')
    } catch (err) {
      throw err
    }
  }
  
  function formLogin(req, res) {
    res.render('login')
  }
  
  async function userLogin(req, res) {
    try {
      const { email, password } = req.body
      const query = `SELECT * FROM tb_user WHERE email = '${email}'`

      let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
  
      if(!obj.length) {
        req.flash('danger', "user has not been registered")
        return res.redirect('/login')
      }
  
      await bcrypt.compare(password, obj[0].password, (err, result) => {
        if(!result) {
          req.flash('danger', 'password wrong')
          return res.redirect('/login')
        } else {
          req.session.isLogin = true,
          req.session.user = obj[0].name
          req.session.idUser = obj[0].id
          req.flash('success', ' login success')
          req.flash('danger', 'password wrong')
          return res.redirect('/')
        }
      })
  
    } catch (err) {
      throw err
    }
  }

  function logout(req,res) {
	if (req.session.isLogin) {
		req.session.destroy((error) => {
			if (error) {
       console.log(error);
			} else {
				res.redirect("/");
			}
		});
	} else {
		res.redirect("/");
	}
}