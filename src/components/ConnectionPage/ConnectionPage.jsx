import React from 'react'
import ProfileEditHeader from '../ProfileEditHeader/ProfileEditHeader';
import './ConnectionPage.css';

const ConnectionPage = () => {


  return (
    <div>
      <ProfileEditHeader />
      <div className="connectionContainer">
        <div className="connectionTile">
            <p>My Name</p>
            <img src="" alt="Profile"/>
            <p>Tech1</p>
            <p>Tech2</p>
            <p>Tech3</p>
        </div>

        <div className="buttonsContainer">
            <button>Accept</button>
            <button>Decline</button>
        </div>

      </div>

    </div>
  )
}

export default ConnectionPage
