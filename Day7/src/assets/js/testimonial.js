class testimonials {
    constructor(nama, komentar, gambar) {
        this.author = nama
        this.coment = komentar
        this.image = gambar
    }

    html() {
        return `
            <div class="testimonial">
                <img src="${this.image}" class="profile-testimonial" />
                <p >"${this.coment}"</p>
                <p class="author">- ${this.author}</p>
            </div>
        `
    }
}


const testimonialA = new testimonials("KTM 450", "motor yang sering dipakai anak trail buat tanjakan extreme", "https://cdn1-production-images-kly.akamaized.net/LTcSsXfp297GuxWjl2o1aORefC4=/1200x675/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3736174/original/079745600_1639798886-0000444856.jpg")
const testimonialB = new testimonials("Suzuki Rmz 450", "motor trail suzuki yang paling sempurna dikelasnya", "https://otomotif.media/wp-content/uploads/2023/07/Segmen-Motor-Trail-Suzuki-RMZ450.jpg")
const testimonialC = new testimonials("Huqvarna 450", "motor yg satu penjualannya bareng ktm namun gk kalah saing sama ktmnya", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSjsbcO-yL9R4bhBLahP9UughdNoBByXhQg&usqp=CAU")

const testimonial = [testimonialA, testimonialB, testimonialC]

let testimonialHTML = ``
for(let index = 0; index < testimonial.length; index++) {
    testimonialHTML += testimonial[index].html()
}

document.getElementById("testimonials").innerHTML = testimonialHTML