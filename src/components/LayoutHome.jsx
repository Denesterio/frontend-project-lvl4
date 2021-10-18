import React from 'react';

const LayoutHome = ({ children }) => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100">
      <div className="col-md-4 col-lg-3 col-xl-2 border-end px-0 bg-info">{children.leftColumn}</div>
      <div className="col-md-8 col-lg-9 col-xl-10 p-0">{children.rightColumn}</div>
    </div>
  </div>
);

export default LayoutHome;
