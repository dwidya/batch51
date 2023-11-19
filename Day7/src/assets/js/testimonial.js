const dataTestimonial = [
    {
        "name": "Ktm 450 ",
        "image": "https://cloudfront-us-east-1.images.arcpublishing.com/octane/KXVI5TIWXZAZ7OXRPKTGTBTO7Y.jpg",
        "comment": "motor yang sering dipakai anak trail buat tanjakan extreme"
      },
      {
        "name": "Suzuki Rmz 450",
        "image": "https://otomotif.media/wp-content/uploads/2023/07/Segmen-Motor-Trail-Suzuki-RMZ450.jpg",
        "comment": "motor trail suzuki yang paling sempurna dikelasnya"
      },
      {
        "name": "husqvarna 450",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSjsbcO-yL9R4bhBLahP9UughdNoBByXhQg&usqp=CAU",
        "comment": "motor yg satu penjualannya bareng ktm namun gk kalah saing sama ktmnya "
      },
  ]

  function testimonial(){
    let setTestimonial = ""

    dataTestimonial.forEach(item => {
      setTestimonial += `
      <div class="testimonial">
        <img src=${item.image} class="profile-testimonial" />
        <p class="quote">${item.comment}</p>
        <p class="author">- ${item.name}</p>
      </div>`
    })

    document.getElementById("testimonials").innerHTML = setTestimonial
  }

 testimonial()