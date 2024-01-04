import React, { useState } from 'react';

import Header from './Header.jsx';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';

const App = () => {
  const [selected, setSelected] = useState('Inbox');

  return (
   <div className='h-[666px] w-[376px] z-50 bg-white rounded-xl shadow-xl font-serif'>
    <div className='h-[8%] w-full pt-4 content-center'>
      <Header />
    </div>
    <div className='mt-2'>
      <Navbar selected={selected} setSelected={setSelected} />
    </div>
    <div className='p-[20px]'>
      <Home selected={selected} />
    </div>
   </div>
  );
};



export default App;