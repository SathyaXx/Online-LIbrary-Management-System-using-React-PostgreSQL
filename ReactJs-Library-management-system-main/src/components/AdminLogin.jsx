import React, { useRef ,useEffect } from 'react'
import '../styles/Admin.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const AdminLogin = () => {

 let AdminEmail = useRef(null)
 let Adminpassword = useRef(null)
const success = () => {
  toast.info('Welcome! Admin ✅', {
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

let navigate= useNavigate()

function handleSubmit(event){
  event.preventDefault();

  var mailid=document.getElementById('exampleInputEmail1').value;
  var userpass=document.getElementById('exampleInputPassword1').value;
        var validEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if(!(mailid.match(validEmail)) || (userpass.length < 8)){
            epasserr();
            return false;
        }else{
                
        fetch("http://localhost:8080/ProjectIP/AdminLoginServlet?email="+mailid+"&upass="+userpass , {crossDomain:true})
        .then((res) => res.json())
        .then((data) => {
         if(data.status == "success"){
                success();
                setTimeout(function() {
   
                }, 1000);
                navigate('/admin/');
            }else{
              
                navigate('/adminlogin');
                
            }
        });   
    }
}


  return (
    <div className='AdminLogin'>
          
         <Link to="/"> <button className='back'> Back to Home </button> </Link> 

        <form action=" " onSubmit={handleSubmit}> 
         <h1>Admin Login</h1>

         <input  ref={AdminEmail} name='mail' id='exampleInputEmail1' type="email" placeholder='Email' className='username' required/>
         <input  ref={Adminpassword} name='pass' id='exampleInputPassword1' type="password" placeholder='Password' required/>


         <button>Login</button>
        </form>
        
        </div>
  )
}

export default AdminLogin