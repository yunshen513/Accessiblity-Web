import React from 'react';
import Header from '../Header';
import Page from '../Page';
import Footer from '../Footer';

function App() {
  return (
    <div className="layout">
      <div className='layout_header'>
        <Header />
      </div>
      <div className='layout_page'>
        <Page />
      </div>
      <div className='layout_footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
