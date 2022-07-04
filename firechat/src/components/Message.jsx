import moment from 'moment'
import React from 'react'

export default function Message ({msg,user1}) {
  var i;
  return (
    <div className={`msg_wrapper ${msg.from === user1 ? 'own' : ''}`}>
      <p className={msg.from ===user1 ? "me" :"friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text}/> : null}
        {msg.text}
        <br />
        {/* npm install moment react-moment */}
        <small>
          {
          i=moment(msg.createdAt.toDate(),'DD/MM/YYYY').fromNow()
          }
        </small>
      </p>
    </div>
  )
}
