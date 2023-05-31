import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import '../styles/userlist.css';

const UserList = () => {

  const [users, setUsers] = useState([])
  const [banOperation, setBanOperation] = useState(false);
  useEffect(() => {
    const FetchData = async () => {
      const response = await fetch(`http://localhost:8080/ProjectIP/RetrieveUser`);
      const data = await response.json();
      setUsers(data);
    }
    FetchData();
  }, [banOperation]);
console.log(users);

  const deluser = (Mail) => {

    alert("User Banned Permanently")
    fetch(`http://localhost:8080/ProjectIP/BanUser?mail=`+Mail, {
      crossDomain : true,
        })
        .then(() => {
          setBanOperation(prev => !prev);
        })


  }

  return (
    <div className='userlist'>
    {users.length > 0 ? (
      users.map((user) => (
        <div className='userInd' key={user.Mail}>
          <div className='imgdel'>
            <FaUserCircle size={80} style={{ marginBottom: "10px" }} />
            <button onClick={() => deluser(user.Mail)}>Ban User</button>
          </div>
          <div className='userinfo'>
            <div className='userkeys'>
              <p>User Name </p>
              <p>User Email </p>
              <p>Phone Number</p>
            </div>
            <div className='uservalues'>
              <p>{user.Name}</p>
              <p>{user.Mail}</p>
              <p>+{user.Contact}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No Users Found</p>
    )}
  </div>
  )
}

export default UserList