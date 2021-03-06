import React,{useState,useEffect} from 'react'
import Img from '../profile_img.png'
import Camera from '../components/svg/Camera'
import { storage ,db,auth} from '../firebase';
import {ref,getDownloadURL,uploadBytes,deleteObject} from 'firebase/storage'
import {getDoc,doc, updateDoc} from 'firebase/firestore'
import Trash from '../components/svg/Trash';

export default function Profile() 
{
  const [image , setImage]=useState('');
  const [user,setUser]=useState('');

  const DeleteImage= async () =>
  {
    await deleteObject(ref(storage,user.avatarPath));
    await updateDoc(doc(db,"Users",auth.currentUser.uid),{
      avatar:'',
      avatarPath:''
    })
  }

  getDoc(doc(db,'Users',auth.currentUser.uid)).then (docSnap=>{
    if(docSnap.exists)
    {
      setUser(docSnap.data());
    }
  })

  useEffect(()=>
  {
    if(image)
    {
      const uploadImage= async ()=>
      {
        const imageRef=ref(storage,`Profile/${new Date().getTime()} - ${image.name}`);
        console.log(imageRef);
        try
        {
          const snap=await uploadBytes(imageRef,image);
          console.log(snap.ref.fullPath);
          const url= await getDownloadURL(ref(storage,snap.ref.fullPath));
          console.log(snap.ref.fullPath,url);

          if(user.avatarPath)
          {
            await deleteObject (ref(storage,user.avatarPath));
          }
          // path consist of of date and image name url consist of url like http ...
          await updateDoc(doc(db,'Users',auth.currentUser.uid),{
            avatar:url,
            avatarPath:snap.ref.fullPath
          });

          setImage("");
        }
        catch(err)
        {
          console.log(err.message);
        }
      };
      uploadImage();
    }

    
  },[image]);

  return user ?(
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={ user.avatar || Img } alt="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera/>
              </label>
              {user.avatar ? <Trash DeleteImage={DeleteImage}/>:null} 
              <input type="file" accept='image/'  id="photo" style={{display:'none'}} onChange={e=>setImage(e.target.files[0])}/>
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{user.Name}</h3>
          <div style={{fontSize:"20px",textAlign:"center"}}>
            <label htmlFor="email" style={{fontWeight:"800"}}>Email :</label>
            <span id="email"> {user.Email}</span>
          </div>
          
            <div style={{textAlign:"center",margin:"10px"}}>
              <label htmlFor="Joined" style={{fontWeight:"800"}}>Account Created On :</label>
              <span id="Joined"> {user.createdAt.toDate().toDateString()}</span>
            </div>
        </div>
      </div>
    </section>
  ):null;
}
