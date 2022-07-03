import React from 'react'
import {db,auth} from '../firebase'
import {collection,query,where,onSnapshot} from 'firebase/firestore'
import { useEffect,useState } from 'react'
import User from '../components/User'


const Home = () => 
{
  const [users,setUsers]=useState([]);

  useEffect(()=> {
    const userRef=collection(db,'Users');
    //create query Object
    const q=query(userRef,where('uid','not-in',[auth.currentUser.uid]));

    //executing query
    const unsub= onSnapshot(q, (querySnap)=>
    {
      let users=[];
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
      {users.map(user=>
        <User key={user.uid} user={user}/>
        )}
    </div>
  </div>)
}

export default Home;
