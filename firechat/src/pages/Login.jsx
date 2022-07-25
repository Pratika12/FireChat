import React,{useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {updateDoc, doc} from 'firebase/firestore'
import {auth,db} from "../firebase"
import {useNavigate} from 'react-router-dom'


export default function Login() 
{
  const [data,setData]=useState({
    Email:'',
    Pass:'',
    error:null,
    loading:false
  });

  const {Email, Pass, error, loading}= data;
  const navigate=useNavigate();

  const handleonChange = e =>{
    setData({ ...data,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({...data,error:null,loading:true});

    if(!Email || !Pass)
    {
      setData({...data,error:"All fields are required",loading:false})
    }
    else
    {
      try
      {
        const result = await signInWithEmailAndPassword(auth,Email,Pass);
        // console.log(result);

        await updateDoc(doc(db,"Users",result.user.uid),{
          isOnline:true
        })

        setData({Email:'',Pass:'',error:null,loading:false});
        navigate('/');
      }
      catch(err)
      {
        setData({...data,error:"Invalid Details",loading:false});
      }
    }
  }
  return (
    <section>
      <h3>Login to your Account</h3>
      <form action="" className="form">

        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input type="email" name="Email" id="email" value={Email}  onChange={handleonChange}/>
        </div>

        <div className="input_container">
          <label htmlFor="pass">Password</label>
          <input type="password" name="Pass" id="pass" value={Pass}  onChange={handleonChange} />
        </div>

        {
          error ? <p className="error">{error}</p> : null
        }
        <div className="btn_container">
          <button className="btn" disabled={loading} onClick={(e)=>handleSubmit(e)}>{loading ? "Logging In..." : "Login"}</button>
        </div>
      </form>
    </section>
  )
}
