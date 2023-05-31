import React, { useRef } from 'react'
import '../styles/Addusers.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const AddUsers = () => {


 const success =()=>{toast.success("Registered Successfully !");}
 const exists =()=>{toast.error("Mail Exists !");}

 const error = () => {
  toast.info('Enter Valid Credentials' , {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
}

 function handleSubmit(e) {
    e.preventDefault()
    const uname = document.getElementById('uname').value;
    const mail = document.getElementById('mail').value;
    const contact = document.getElementById('contact').value;
    const pass = document.getElementById('pass').value;

    const validEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    const validContact = /[0-9]{10}/;


    if (uname == ''|| (!mail.match(validEmail)) || (!contact.match(validContact)) || pass.length < 8) {
      error();
      return false;
    }else{
    
      
    fetch("http://localhost:8080/ProjectIP/UserInsert?uname="+uname+"&email="+mail+"&contact="+contact+"&pass="+pass , {crossDomain:true})
    .then((res) => res.json())
    .then((data) => {
      if(data.status == "success" ){
            success();

        }else if(data.status == "exists"){
          exists();
        
  }});
}
  }


  return (
    <div className='Addusers'>


      <form style={{marginLeft:"350px",marginTop:"55px",backgroundColor:"lightgray"}}>
        <h1>Add Users</h1>
        <label >Name</label>
        <input name='uname' id='uname' type="text" placeholder='Enter Name' />

        <label>Email</label>
        <input name='mail' id='mail' type="text" placeholder='Email' />

        <label> Contact </label>
        <input name='contact' id='contact' type="text" placeholder='Contact' />

        <label> Password </label>
        <input name='pass' id='pass' type="password" placeholder='Password' />

        <button onClick={handleSubmit}>Add User</button>

      </form>



    </div>
  )
}

export default AddUsers;