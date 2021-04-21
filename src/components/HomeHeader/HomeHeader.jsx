import React from 'react'
import './HomeHeader.css'
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
const HomeHeader = () => {
  return (
    <div className='header'>
      <PersonIcon />
      <img src="../../../public/Images/Front to Back logo.png" alt="logo image"/>
      <ForumIcon />
    </div>
  )
}

export default HomeHeader
