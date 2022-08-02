import React,{useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc,Timestamp} from 'firebase/firestore'
import {auth,db} from "../firebase"
import {useNavigate} from 'react-router-dom'


export default function Register() 
{
  const [data,setData]=useState({
    Name:'',
    Email:'',
    Pass:'',
    error:null,
    loading:false
  });

  const {Name, Email, Pass, error, loading} = data;
  const navigate=useNavigate();

  const handleonChange = e =>
  {
    setData({ ...data,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    setData({...data,error:null,loading:true});

    if(!Name || !Email || !Pass)
    {
      setData({...data,error:"All fields are required"})
    }

    try
    {
      const result = await createUserWithEmailAndPassword(auth,Email,Pass);
      // console.log(result);

      await setDoc(doc(db,"Users",result.user.uid),{
        uid:result.user.uid,
        Name,
        Email,
        createdAt:Timestamp.fromDate(new Date()),
        isOnline:true
      })

      setData({Name:'',Email:'',Pass:'',error:null,loading:false});
      navigate('/');
    }
    catch(err)
    {
      setData({...data,error:"Invalid Details",loading:false});
    }
  }
  return (
    <section>
      <h3>Create an Account</h3>
      <form action="" className="form">

        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input type="text" name="Name" id="name" value={Name}  onChange={handleonChange}/>
        </div>

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
          <button className="btn" disabled={loading} onClick={(e)=>handleSubmit(e)} > {loading ? "Creating.." : "Register"}</button>
        </div>
      </form>
    </section>
  )
}
