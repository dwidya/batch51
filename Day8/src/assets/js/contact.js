function getdata (){  
    const name= document.getElementById("Name").value
    const email= document.getElementById("Email").value
    const phone= document.getElementById("Phone").value
    const subject = document.getElementById("Subject").value
    const message= document.getElementById("Message").value
   
       if(name== ""){
       return alert ("Nama tidak boleh kosong")
   
   }   else if (email== "") {
       return alert ("email tidak boleh kosong")
   
   }    else if (phone== "") {
       return alert ("nomor telepon tidak boleh kosong")
   
   }    else if (subject== "") {
       return alert ("subject wajib dipilih" )
   
   }    else if (message== "") {
       return alert ("pesan tidak boleh kosong" )
           
   }   
   
   const emailreciver = "dwidyad@gmail.com"
   let a = document.createElement ("a")
   
   a.href = `mailto:${emailreciver}?subject=${subject}&body= Hallo,Saya${name},harap hubungi nomor saya ${phone}untuk info lebih lanjut ${message}`
   
   a.click()
   
   let data = {
       name,
       email,
       phone,
       subject,
       message
   }
   
   
   
   console.log (data)
}