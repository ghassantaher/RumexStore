import React from 'react';
import '../scss/includes/_loading-spinner.scss';
// import './scss/app.scss';

export const LoadingSpinner = () => {
  return (
    // <div className="spinner-container">
    //   <div className="loading-spinner"></div>
    // </div>
    // <div className="lds-ring">
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    // </div>
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    // <div class="lds-roller">
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    // </div>
  );
};
