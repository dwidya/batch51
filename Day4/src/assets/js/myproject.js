const addProject = []

function getData(event) {
  event.preventDefault()

  let pjkName = document.getElementById("pjkName").value
  let desc = document.getElementById("desc").value
  let image = document.getElementById("input-blog-image").files
  let checkbox = document.getElementsByName("checkbox")
  let check = []
  for (let i = 0; i < checkbox.length; i++){
    if(checkbox[i].checked){
      let checkOption = checkbox[i].value
      check.push(checkOption)
    }
  }


  image = URL.createObjectURL(image[0])

  const obj = {
    pjkName,
    desc,
    projectTechno:check,
    image
  }

  addProject.push(obj)
  renderBlog()
}

function renderBlog() {
  document.getElementById("content").innerHTML = ""

  for(let i = 0; i < addProject.length; i++) {
    
    let project = addProject[i]

    let projectTechno = ""
    for (let i = 0; i < project.projectTechno.length; i++){
      projectTechno += `<img src="./src/assets/svg/${project.projectTechno[i]}.svg"></img>`
    }

    
    document.getElementById("content").innerHTML += `
    <div class="pjk-container">
      <img src="${project.image}" alt="picture" class="img-size">
      <p style="padding-top: 10px; margin: auto; font-weight: bold;">${project.pjkName}</p>
      <div class="desc-container">
        <p class="pjk-text">${project.desc}</p>
      </div>  
      <p>
        ${projectTechno}
      </p>
      <div class="pjk-btn">
        <button style="margin-right:10px;" class="btn-size">Edit</button>
        <button class="btn-size">Delete</button>
      </div>
    </div>`
  }

}