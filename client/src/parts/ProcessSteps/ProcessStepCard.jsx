import React from 'react';
import CheckIcon from '@mui/icons-material/Check';

const ProcessStepCard = ({
  index,
  img,
  text,
  isActive
}) => {
  return (
    <div className={`process-step-card ${isActive ? 'active' : ''}`}>
      <img className="card-img" src={img} alt="" />

      <p className="card-content">
        {text}
      </p>

      <div className="card-number">
        {isActive ? <CheckIcon sx={{ color: '#0b061c' }} /> : index }
      </div>
    </div>
  );
};

export default ProcessStepCard;