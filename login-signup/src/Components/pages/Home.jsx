import React from 'react'
import './Home.css'
// import image from '../Assets/person.png'


function Home() {
return (
  <div className="home">
<div className='container'>
  <div className="profile">
    <h1 className='heading'>PROFILE</h1>
    <div className='profile-picture'>
      <img
      // src={image}

      src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'
        alt='ProfileImg' />
    </div>
    <div className='profileData'>
      <h2>Name</h2>
      <h3>Phone Number</h3>
      <p>E-mail</p>
    </div>

  </div>

</div>
</div>
)
}

export default Home