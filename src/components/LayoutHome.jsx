import React from 'react';

const LayoutHome = ({ children }) => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100">
      <div className="col-4 col-md-2 h-100 border-end px-0 bg-info">{children.leftColumn}</div>
      <div className="col-8 col-md-10 p-0 h-100">{children.rightColumn}</div>
    </div>
  </div>
);

export default LayoutHome;
