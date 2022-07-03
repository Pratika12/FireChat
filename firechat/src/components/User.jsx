import React from 'react'
import Img from '../profile_img.png'

export default function User({user}) {
  return (
    <div className='user_wrapper'>
      <div className='user_info'>
        <div className='user_detail'>
          <img src={user.avatar || Img} alt="avatar" className='avatar' />
          <h4>{user.Name}</h4>
        </div>
        <div className={`user_status ${user.isOnline ? "Online" : "Offline"}`}></div>
      </div>      
    </div>
  )
}
