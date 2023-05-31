import React, { useRef } from 'react'
import '../styles/Addbooks.css'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const AddBooks = () => {

 let navigate = useNavigate()
 const success = () => {
  toast.info('Inserted Successfully', {
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
const bookexists = () => {
  toast.info('Book Exists', {
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
 function handleSubmit (e){
    e.preventDefault()
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const url = document.getElementById('url').value;
    const year = document.getElementById('year').value;
    const country = document.getElementById('country').value;
    const lang = document.getElementById('lang').value;
    const burl = document.getElementById('burl').value;

    if (title === ''|| author === ''|| pages === ''|| url=== '' || year === ''|| country === ''|| lang === '' || burl === '') {
      epasserr();
      return false;
    }else{
    fetch("http://localhost:8080/ProjectIP/BookInsert?title="+title+"&author="+author+"&pages="+pages+"&url="+url+"&year="+year+"&country="+country+"&lang="+lang+"&burl="+burl , {crossDomain:true})
    .then((res) => res.json())
    .then((data) => {
      if(data.status == "success" ){
            success();

        }else if(data.status == "exists"){
          bookexists();
        
  }});
}
}

    
    return (
        <div className='addbooks'>
            <form action=""  style={{marginLeft:"370px",marginTop:"20px"}} >
               <h1>Add Books</h1>
               <label >Book Title</label>
               <input  id='title' name='title' type="text" placeholder='Enter Book Title'/>

                <label>Author Name</label>
               <input  id='author' name='author' type="text" placeholder='Author Name' />

               <label > Pages </label>
               <input name='pages' id='pages' type="text" placeholder='Pages' />

               <label > Image URL </label>
               <input name='url' id='url' type="text" placeholder='Image URL' />
   
               <label > Year </label>
               <input name='year' id='year' type="text" placeholder='Year' />

               <label > Country </label>
               <input  name='country' id='country' type="text" placeholder='Country' />

               <label > Language </label>
               <input name='lang' id='lang' type="text" placeholder='Language' />

               <label > Book URL </label>
               <input name='burl' id='burl' type="text" placeholder='Book URL' />
        
               <button onClick={handleSubmit}>Add Book</button>
 
            </form>
        </div>
    )
}

export default AddBooks