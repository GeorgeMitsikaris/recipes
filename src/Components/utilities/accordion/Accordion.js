import React from 'react';

import './Accordion.css';

const Accordion = ({title, content}) => {
  return (
    <div className="accordion__section">
      <button className="accordion">
        <p className="accordion__title">{title}</p>
      </button>
      <div className="accordion__content">
        <div className="accordion__text"
        dangerouslySetInnerHTML={{__html:content}}
        />
      </div>
    </div>
  );
}

export default Accordion;