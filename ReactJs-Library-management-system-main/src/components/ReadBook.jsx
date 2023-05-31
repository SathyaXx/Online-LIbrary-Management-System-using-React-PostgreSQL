import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../styles/ReadBook.css"
import { FaBook } from "react-icons/fa";



const ReadBook = () => {

  const ImageLogo = () =>{<FaBook />}
  const [book, setBook] = useState([])
  const {title} = useParams();
  let url = `http://localhost:8080/ProjectIP/ReadBook?title=${title}`;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setBook(data)
    }

    fetchData()
  }, [url])

    
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className='Readbook'>
      <div className='boxshadow'>
        <div className='Bookdetails'>
          <img src={book.url} alt="" width={300} height={300} />
          <div className='alldetails'>  
            <h1>{book.title}</h1>
            <p >Author - {book.author}</p>
            <p> Language - {book.lang}</p>
            <p>Pages - {book.pages}</p>
            <p>Country - {book.country}</p>
            <p> Year - {book.year}</p>
            <p><button onClick={() => openInNewTab(book.burl)} className='Delete'>Read Book</button></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadBook