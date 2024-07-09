import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'

function Dashboard() {
  return (
    <div className='Dashboard-wrap'>
        <Sidebar/>
        <Topbar/>
        <div className=''></div>
    </div>
  )
}

export default Dashboard