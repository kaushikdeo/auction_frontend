import React, {memo} from 'react'

const DashHeader = ({type, useName}) => {
    console.log("useName", useName);
  return (
    <div className="well">
        <div className='d-flex justify-content-start'><h4>{type} Dashboard</h4></div>
        <div className='d-flex justify-content-end'><h4>Welcome {useName}</h4></div>
    </div>
  )
}

export default memo(DashHeader)