import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {auth,db} from '../firebase'
import {signOut} from 'firebase/auth'
import {updateDoc,doc} from 'firebase/firestore'
import {AuthContext} from '../context/auth'
import {useNavigate} from 'react-router-dom'

export default function Navbar() {

   const {user}=useContext(AuthContext);
   const navigate=useNavigate();
   const handleSignOut = async () =>
   {
      await updateDoc (doc(db,'Users',auth.currentUser.uid),{isOnline : false});
      await signOut(auth);
      navigate('/Login');
   }
  return (
    <nav>
       <h3>
          <Link to="/">FireChat</Link>
       </h3>
       <div>
         {
         user ?
         (<>
         <Link to="/Profile">User Profile</Link>
         <button className="btn" onClick={handleSignOut}>LogOut</button>
         </>)
         : 
         (<>
         <Link to="/Register">Register</Link>
         <Link to="/Login">Login</Link>
         </>)
         }
       </div>
    </nav>
  )
}
