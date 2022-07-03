import React from 'react'
import Attachment from './svg/Attachment'

export default function MessageForm({handleSubmit,text,setText,setImage}) {
  return (
    <form action="" className='message_form' onSubmit={handleSubmit}>
        <label htmlFor="img">
            <Attachment/>
        </label>
        <input type="file" accept='image/' id="img" style={{display:"none"}} onChange={(e)=>setImage(e.target.files[0])}/>
        <div>
            <input type="text" placeholder="Enter Message" id=""  value={text} onChange={(e)=>setText(e.target.value)}/>
        </div>
        <div>
            <button className='btn'>Send</button>
        </div>
    </form>
  )
}
