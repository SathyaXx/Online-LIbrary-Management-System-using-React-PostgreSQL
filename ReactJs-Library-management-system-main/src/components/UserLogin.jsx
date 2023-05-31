import React, { useRef } from 'react'
import '../styles/Admin.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const UserLogin = () => {

  let userName = useRef(null)
  let userpassword = useRef(null)
 
 let navigate= useNavigate()
 
 const success = () => {
  toast.info('Welcome! Pal ✅', {
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

const epasserr = () => {
  toast.info('Enter Valid Credentials', {
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


function handleSubmit(event){
  event.preventDefault();

  var mailid=document.getElementById('mail').value;
  var userpass=document.getElementById('pass').value;
        var validEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if(!(mailid.match(validEmail)) || (userpass.length < 8)){
            epasserr();
            return false;
        }else{
                
        fetch("http://localhost:8080/ProjectIP/UserLogin?email="+mailid+"&upass="+userpass , {crossDomain:true})
        .then((res) => res.json())
        .then((data) => {
         if(data.status == "success"){
                success();
                setTimeout(function() {
   
                }, 1000);
                navigate('/user');
            }else{
                epasserr();
                navigate('/userlogin');
                
            }
        });   
    }


   const submit = () => {
    if(userName.current.value === "sathyanarayananth9@gmail.com" && userpassword.current.value === "123"){
      navigate('/user')
    }else {
      alert("Invalid credentials")
    }
   }
  }

  return (
    <div className='AdminLogin'>
        
    <Link to="/"> <button className='back'> Back to Home </button> </Link> 

    <form action=" "> 
     <h1>User-Login</h1>
     <input ref={userName} name='mail' id='mail' type="email" placeholder='Email' className='username' required/>
     <input ref={userpassword} name='pass' id='pass' type="password" placeholder='Password' required/>

     <button onClick={handleSubmit}>Login</button>
    </form>
    
    </div>
  )
}

export default UserLogin ;