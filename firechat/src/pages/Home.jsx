import React from 'react'
import {db,auth} from '../firebase'
import {collection,query,where,onSnapshot} from 'firebase/firestore'
import { useEffect,useState } from 'react'
import User from '../components/User'
import MessageForm from '../components/MessageForm'


const Home = () => 
{
  //array of users
  const [users,setUsers]=useState([]);
  const [chat, setChat]=useState('');

  //function for displaying User Chat when clicked on Users name
  const selectUser =(user)=>
  {
    setChat(user);
  }


  useEffect(()=> {
    const userRef=collection(db,'Users');
    //create query Object
    const q=query(userRef,where('uid','not-in',[auth.currentUser.uid]));

    //executing query 
    //querySnap conatins list of all Users except the current user
    const unsub= onSnapshot(q, (querySnap)=>
    {
      //users array created locally
      let users=[];
      //one by one all data is pushed onto local users array
      querySnap.forEach((doc)=>
      {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return ()=>unsub();
  },[]);
  console.log(users);


  return (
  <div className='home_container'>
    <div className="users_container">
      {
        users.map(user=>
        <User key={user.uid} user={user} selectedUser={selectUser}/>
        )
      }
    </div>

    <div className="msg_container">
      {
        chat ?
        <div>
            <div className="message_user">
              <h3>{chat.Name}</h3>
            </div>
            <div>
              <MessageForm/>
            </div>
        </div>
        :
        <h3 className='No_User_Selected'>Select a user to start the conversation</h3>
      }
    </div>
  </div>)
}

export default Home;
