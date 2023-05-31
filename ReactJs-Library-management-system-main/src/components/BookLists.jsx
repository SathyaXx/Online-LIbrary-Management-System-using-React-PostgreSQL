import React, { useEffect, useState } from 'react'
import '../styles/BookLists.css'
import {  useNavigate} from 'react-router-dom'
import { RiVipCrownFill} from 'react-icons/ri';
import { RiShieldUserFill } from 'react-icons/ri';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';


const BookLists = () => {

  let location = useLocation()
  console.log(location.pathname)

  let navigate = useNavigate()

  const [books, setBooks] = useState([])
  const [deleteOperation, setDeleteOperation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/ProjectIP/RetrieveBooks");
      const data = await response.json();
      setBooks(data);
    };
    fetchData();
  }, [deleteOperation]);

   console.log(books);
  const Del = (title) => {
 
    alert( `Successfully deleted ${title} Book ` )
    fetch(`http://localhost:8080/ProjectIP/BanBook?title=`+title,{
      crossDomain:true
    })
    .then(() => {
      setDeleteOperation(prev => !prev);
    });
  }

  
  const readbookbtn = (title) => {
    if(location.pathname === '/admin/book-Lists'){
      navigate(`/admin/book-Lists/${title}`)
    }else{
         navigate(`/user/book-Lists/${title}`)
    }
  }


  return (
    <div className='BookLists'>
      {books.length > 0 ? (
        books.map((book) => (
          <div className='book' key={book.title}>
            <div className='hidehover'>
              <div className='stickerpara'>
                <p>
                  <RiVipCrownFill size={30} style={{ margin: "5px" }} /> View Book
                </p>
              </div>
            </div>
            <button onClick={() => readbookbtn(book.title)} className='readmorebtn'>
              Read more
            </button>
            <img src={book.url} width={180} height={230} />
            <div className='Details'>
              <h3 className='booktitle' style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <RiShieldUserFill /> {book.title}
              </h3>
              <p className='author'>{book.author}</p>
              <div className='bookpagesyear'>
                <div>
                  <p>Pages - {book.pages}</p>
                  <p> Year - {book.year}</p>
                </div>
                <div>
                  {location.pathname === '/admin/book-Lists' && (
                    <button onClick={() => Del(book.title)} className='Delete'>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  )
}

export default BookLists