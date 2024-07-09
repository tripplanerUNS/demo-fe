import React from 'react'
import AgentTabelNew from '../Component/AgentTabel'
import TopbarNew from '../Component/TopbarNew'
import SidebarNew from '../Component/SidebarNew'
import "../Page/PageStyle.css"

function AgentNew() {
    return (
        <div className='wrap-agen-new'>
            <TopbarNew />
            <div className='sidebar-main-content'>
                <SidebarNew />
                <div className='tabel-agen-new'>
                    <AgentTabelNew />
                </div>
            </div>
        </div>
    );
}

export default AgentNew;