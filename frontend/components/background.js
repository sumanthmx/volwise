import React from 'react';

const Background = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(/bg.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {children}
    </div>
  );
};

export default Background;