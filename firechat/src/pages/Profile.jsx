import React from 'react'
import Img from '../profile_img.png'
import Camera from '../components/svg/Camera'

export default function Profile() {
  return (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={Img} alt="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera/>
              </label>
              <input type="file" accept='image/'  id="photo" style={{display:'none'}}/>
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>User Name</h3>
          <p>User Email</p>
          
          <small>Joined On: ...</small>
        </div>
      </div>
    </section>
  )
}
