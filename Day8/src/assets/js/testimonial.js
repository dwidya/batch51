const dataTestimonial = [
    {
        "name": "Ktm 450 ",
        "image": "https://cdn1-production-images-kly.akamaized.net/LTcSsXfp297GuxWjl2o1aORefC4=/1200x675/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3736174/original/079745600_1639798886-0000444856.jpg",
        "rating": 3,
        "comment": "motor yang sering dipakai anak trail buat tanjakan extreme"
      },
      {
        "name": "Suzuki Rmz 450",
        "image": "https://otomotif.media/wp-content/uploads/2023/07/Segmen-Motor-Trail-Suzuki-RMZ450.jpg",
        "rating": 5,
        "comment": "motor trail suzuki yang paling sempurna dikelasnya"
      },
      {
        "name": "husqvarna 450",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSjsbcO-yL9R4bhBLahP9UughdNoBByXhQg&usqp=CAU",
        "rating": 3,
        "comment": "motor yg satu penjualannya bareng ktm namun gk kalah saing sama ktmnya "
      },
      {
        "name": "GasGas 450",
        "image": "https://i.ytimg.com/vi/Gs6vnsEbbBY/maxresdefault.jpg",
        "rating": 2,
        "comment": "motor yang paling jarang laku di kelas trail,namun penjualannya bareng ktm+husq "
      },
      {
        "name": "Yamaha Yz450",
        "image": "https://ultimatemotorcycling.com/wp-content/uploads/2023/02/2023-yamaha-yz450f-review-8.jpg",
        "rating": 5,
        "comment": "Motor yang paling tahan banting biasa digunakan untuk kompetisi internasional"
      }
  ]

  function testimonial(){
    let setTestimonial = ""

    dataTestimonial.forEach(item => {
      setTestimonial += `
      <div class="testimonial">
        <img src=${item.image} class="profile-testimonial" />
        <p class="quote">${item.comment}</p>
        <p class="author">- ${item.name}</p>
        <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>`
    })

    document.getElementById("testimonials").innerHTML = setTestimonial
  }

 testimonial()

 function filterTestimonial(rating){
  let setTestimonial = ""

  const filteredData = dataTestimonial.filter(data => data.rating === rating)
  console.log(filteredData)

  if(filteredData.length === 0){
    setTestimonial = `<h2>Data Not Found</h2>`
  }else{
    filteredData.forEach(item => {
      setTestimonial += `
        <div class="testimonial">
          <img src=${item.image} class="profile-testimonial" />
          <p class="quote">${item.comment}</p>
          <p class="author">- ${item.name}</p>
          <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
        </div>`
    })
  }

  document.getElementById("testimonials").innerHTML = setTestimonial
 }