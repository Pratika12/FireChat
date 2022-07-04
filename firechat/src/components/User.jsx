import React from 'react'
import Img from '../profile_img.png'

export default function User({user,selectedUser,chat}) {
  return (
    <>
    <div className={`user_wrapper ${chat.Name===user.Name && 'selected_User'}`} onClick={()=>selectedUser(user)}>
      <div className='user_info'>
        <div className='user_detail'>
          <img src={user.avatar || Img} alt="avatar" className='avatar' />
          <h4>{user.Name}</h4>
        </div>
        <div className={`user_status ${user.isOnline ? "Online" : "Offline"}`}></div>
      </div>      
    </div>
    <div onClick={()=>selectedUser(user)} className={`small_container ${chat.Name===user.Name && 'selected_User'}`}>
    <img src={user.avatar || Img} alt="avatar" className='avatar small_screen'/>
    </div>
    </>
  )
}

// import React from 'react'
// import Img from '../profile_img.png'

// export default function User({user,selectedUser,chat}) {
//   return (
//     <>
//     <div className={`user_wrapper ${chat.Name===user.Name && 'selected_User'}`} onClick={()=>selectedUser(user)}>
//       <div className='user_info'>
//         <div className='user_detail'>
//           <img src={user.avatar || Img} alt="avatar" className='avatar' />
//           <h4>{user.Name}</h4>
//         </div>
//         <div className={`user_status ${user.isOnline ? "Online" : "Offline"}`}></div>
//       </div>      
//     </div>
//     <div onClick={selectedUser(user)} className={`small_container ${chat.Name===user.Name && 'selected_User'}` }>
//     <img src={user.avatar || Img} alt="avatar" className='avatar small_screen'/>
//     </div>
//     </>
//   )
// }
