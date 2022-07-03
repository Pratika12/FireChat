import React from 'react'
import Attachment from './svg/Attachment'

export default function MessageForm() {
  return (
    <form action="" className='message_form'>
        <label htmlFor="img">
            <Attachment/>
        </label>
        <input type="file" accept='image/' id="img" style={{display:"none"}}/>
        <div>
            <input type="text" placeholder="Enter Message" id="" />
        </div>
        <div>
            <button className='btn'>Send</button>
        </div>
    </form>
  )
}
