import React , {useState} from 'react'
import './settings.scss'
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => {
    const [showDetails , setShowDetails]= useState(true);
    const change =()=>{
        setShowDetails((prevState)=>{
             return !prevState;  
        })
    } 
    
  return (
    
    <div>
      <div className={`settings-box ${showDetails?'show':''}`}>
       <div onClick={change} className="gear-background">
       <SettingsIcon className='gear-icon'/>
       </div>
       <div className='settings-container'>
         <div>
         Color Options
         </div>
         <div className='color-options'>
            <div className='colorOption'></div>
            <div className='colorOption'></div>
          </div>
       </div>

       </div>
    </div>
  )
}

export default Settings
