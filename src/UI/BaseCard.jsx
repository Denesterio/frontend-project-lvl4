import React from 'react';

const BaseCard = ({ children }) => (
  <div className="card">
    <div className="card-header text-center">
      { children.header }
    </div>
    <div className="card-body">
      { children.body }
    </div>
    <div className="card-footer">
      { children.footer }
    </div>
  </div>
);

export default BaseCard;
