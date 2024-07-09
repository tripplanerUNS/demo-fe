import React from 'react'
import "../Styles/TopbarNew.css"

function TopbarNew() {
  return (
    <div className='wrap-top-bar'>
        <div className='top-bar-content'>
            <div className='content-account'>
                <div className='account-icon'>
                    <i className="fas fa-user-circle"></i>
                </div>
                <div className='account-name'>
                    <span>Selamat datang, Admin!</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopbarNew