var courseName =document.querySelector("#courseName");
var courseCategory =document.querySelector("#courseCategory");
var coursePrice = document.querySelector("#coursePrice");
var courseDescription = document.querySelector("#courseDescription");
var courseCapacity = document.querySelector("#courseCapacity");
var addBtn =document.querySelector("#click");
var inputs =document.querySelectorAll(".inputs");
var deleteBtn=document.querySelector("#deleteBtn");
var search=document.querySelector("#search");
var nameError=document.querySelector("#nameError");
var categoryError=document.querySelector("#categoryError");
var descriptionError =document.querySelector("#descriptionError");

var isNameTrue=false;
var isCategoryTrue=false;
var isDescriptionTrue=false;
// parse:from string to array of object
 if(JSON.parse(localStorage.getItem("courses"))==null){
   var courses=[];
 }else{
   courses=JSON.parse(localStorage.getItem("courses"));
   displayData();
 }



addBtn.addEventListener("click",(e)=>{
    e.preventDefault();
     addCource();
     clearInputs();
     displayData();
})

deleteBtn.addEventListener("click",(e)=>{
   const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
         e.preventDefault();
         courses=[];
         localStorage.setItem("courses",JSON.stringify(courses));
         displayData();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'This Course has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
})

search.addEventListener("keyup",(e)=>{
   var result="";
   for (var i = 0; i<courses.length; i++) {
      if(courses[i].name.toLowerCase().includes(e.target.value.toLowerCase()))
       result+=`
       <tr>
          <td>${i}<td/>
          <td>${courses[i].name}<td/>
          <td>${courses[i].category}<td/>
          <td>${courses[i].price}<td/>
          <td>${courses[i].description}<td/>
          <td>${courses[i].capacity}<td/>
          <td><button class='btn btn-outline-info'>update</button><td/>
          <td><button class='btn btn-outline-danger' onclick="deleteCource(${i})">delete</button><td/>
       <tr/>
       `;
   }
   document.getElementById("data").innerHTML=result;
})

// validation
courseName.addEventListener("keyup",()=>{
   var pattern =/^[A-Z][a-z]{2,10}$/;
   if(pattern.test(courseName.value)){
      if(courseName.classList.contains("is-invalid")){
         courseName.classList.remove("is-invalid");
         courseName.classList.add("is-valid");
      }
      if(nameError.classList.contains("d-block")){
         nameError.classList.remove("d-block");
         nameError.classList.add("d-none");
      }
   courseName.classList.add("is-valid");
   nameError.classList.add("d-none");
   isNameTrue=true;
   }else{
      if(courseName.classList.contains("is-valid")){
         courseName.classList.remove("is-valid");
         courseName.classList.add("is-invalid");
      }
      if(nameError.classList.contains("d-none")){
         nameError.classList.remove("d-none");
         nameError.classList.add("d-block");
      }
      courseName.classList.add("is-invalid");
      nameError.classList.add("d-block");
      isNameTrue=false;
   }
   if(isNameTrue && isCategoryTrue && isDescriptionTrue){
      addBtn.removeAttribute("disabled");
   }else{
      addBtn.setAttribute("disabled","disabled");
   }
})

courseCategory.addEventListener("keyup",()=>{
   var pattern =/^[A-Z][a-z]{2,10}$/;
   if(pattern.test(courseCategory.value)){
      if(courseCategory.classList.contains("is-invalid")){
         courseCategory.classList.remove("is-invalid");
         courseCategory.classList.add("is-valid");
      }
      if(categoryError.classList.contains("d-block")){
         categoryError.classList.remove("d-block");
         categoryError.classList.add("d-none");
      }
   courseCategory.classList.add("is-valid");
   categoryError.classList.add("d-none");
   isCategoryTrue=true;
   }else{
      if(courseCategory.classList.contains("is-valid")){
         courseCategory.classList.remove("is-valid");
         courseCategory.classList.add("is-invalid");
      }
      if(categoryError.classList.contains("d-none")){
         categoryError.classList.remove("d-none");
         categoryError.classList.add("d-block");
      }
      courseCategory.classList.add("is-invalid");
      categoryError.classList.add("d-block");
      isCategoryTrue=false;
   }
   if(isNameTrue && isCategoryTrue && isDescriptionTrue){
      addBtn.removeAttribute("disabled");
   }else{
      addBtn.setAttribute("disabled","disabled");
   }
})
courseDescription.addEventListener("keyup",()=>{
   var pattern =/^[A-Z][a-z]{2,10}$/;
   if(pattern.test(courseDescription.value)){
      if(courseDescription.classList.contains("is-invalid")){
         courseDescription.classList.remove("is-invalid");
         courseDescription.classList.add("is-valid");
      }
      if(descriptionError.classList.contains("d-block")){
         descriptionError.classList.remove("d-block");
         descriptionError.classList.add("d-none");
      }
   courseDescription.classList.add("is-valid");
   descriptionError.classList.add("d-none");
   isDescriptionTrue=true;
   }else{
      if(courseDescription.classList.contains("is-valid")){
         courseDescription.classList.remove("is-valid");
         courseDescription.classList.add("is-invalid");
      }
      if(descriptionError.classList.contains("d-none")){
         descriptionError.classList.remove("d-none");
         descriptionError.classList.add("d-block");
      }
      courseDescription.classList.add("is-invalid");
      descriptionError.classList.add("d-block");
      isDescriptionTrue=false;
   }
   if(isNameTrue && isCategoryTrue && isDescriptionTrue){
      addBtn.removeAttribute("disabled");
   }else{
      addBtn.setAttribute("disabled","disabled");
   }
})
 
 function addCource(){
     var course={
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        description:courseDescription.value,
        capacity:courseCapacity.value,
    }
    courses.push(course);

    localStorage.setItem("courses",JSON.stringify(courses));

    console.log(courses);
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'This Course Added Successfully',
      showConfirmButton: false,
      timer: 3000
    })
 }

 function clearInputs(){
  for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
    inputs[i].classList.remove("is-valid");
  }
  addBtn.setAttribute("disabled","disabled");
 }
 function displayData(){
    var result=``;
    for (var i = 0; i<courses.length; i++) {
        result+=`
        <tr>
           <td>${i}</td>
           <td>${courses[i].name}</td>
           <td>${courses[i].category}</td>
           <td>${courses[i].price}</td>
           <td>${courses[i].description}</td>
           <td>${courses[i].capacity}</td>
           <td><button class="btn btn-outline-info">update</button></td>
           <td><button class="btn btn-outline-danger"onclick="deleteCource(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("data").innerHTML=result;
 }
 function deleteCource(id){
   const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
         courses.splice(id,1);
         localStorage.setItem("courses",JSON.stringify(courses));
        displayData();
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'This Course has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    
 }