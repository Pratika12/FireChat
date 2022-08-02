import React from 'react'
import {db,auth,storage} from '../firebase'
import {collection, query, where, onSnapshot, addDoc,Timestamp,orderBy, QuerySnapshot} from 'firebase/firestore'
import { useEffect,useState } from 'react'
import User from '../components/User'
import MessageForm from '../components/MessageForm'
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import Message from '../components/Message' 
import moment from 'moment'


const Home = () => 
{
  //array of users
  const [users,setUsers]=useState([]);
  const [chat, setChat]=useState('');
  const [text,setText]=useState('');
  const [image,setImage]=useState('');
  const [msgs,setMsgs]=useState([]);

  const user1=auth.currentUser.uid;
  //user1- currently logged in user
  //chat- selected user is stored in chat variable through selectUser function

  //function for displaying User Chat when clicked on Users name
  const selectUser =(user)=>
  {
    setChat(user);
    //show conversation between Users
    const user2=user.uid;
    const id= user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection (db,'messages',id,'chat');
    const q=query(msgsRef,orderBy('createdAt','asc'));

    //execute Query
    //onSnapshot- real time Listener update on every new msg

    onSnapshot(q, (querySnapshot) =>
    {
      let msgs=[];
      querySnapshot.forEach((doc)=>
      {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  };

  // console.log(msgs);


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

  // console.log(users);


  const handleSubmit = async e =>
  {
    e.preventDefault();
    const user2=chat.uid;
    const id= user1 > user2 ? `${user1 + user2}` :`${user2 + user1}`;
    let url;
    if(image)
    {
      const imageRef= ref(storage, `images/${new Date().getTime()}`)
      const snapImg= await uploadBytes(imageRef,image);
      const dlurl=await getDownloadURL(ref(storage,snapImg.ref.fullPath));
      url=dlurl;
    }

    // we cant use add doc method on document itself that's why we are adding subcollection
    if(text!=='' || url!=='')
    {
      // document.xyz.textinput.value = document.xyz.textinput.charAt(0).toUpperCase() + document.xyz.textinput.slice(1);
      const t=text.charAt(0).toUpperCase() + text.slice(1);
      // console.log(text);
      await addDoc(collection(db,'messages',id , 'chat'),{
        text:t,
        from:user1,
        to:user2,
        createdAt:Timestamp.fromDate(new Date()),
        media: url || ""
      });
    }
    setText('');
  }



  return (
  <div className='home_container'>
    <div className="users_container">
      {
        users.map(user=>
        <User key={user.uid} user={user} selectedUser={selectUser} chat={chat}/>
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
            <div className="messages">
              {
              msgs.length ? msgs.map((msg,i)=> <Message key={i} msg={msg} user1={user1} />)
              :null
              }
            </div>
            <div>
              <MessageForm text={text} handleSubmit={handleSubmit} setText={setText} setImage={setImage}/>
            </div>
        </div>
        :
        <h3 className='No_User_Selected'>Select a user to start the conversation</h3>
      }
    </div>
  </div>)
}

export default Home;
