import React from 'react'

const ResumeModel = ({imageUrl, onClose}) => {
  return (
    <>
      <div className="resume-modal">
        <div className="modal-content">
          <span className='close' onClick={onClose}>&times;</span>
        </div>
        <img src={imageUrl} alt="resume" />
      </div>
    </>
  )
}

export default ResumeModel
