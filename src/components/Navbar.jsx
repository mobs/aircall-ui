import React, { useState } from 'react'

const Navbar = ({ selected, setSelected }) => {
    // const [selected, setSelected] = useState('Inbox');
    const buttons = ["Inbox", "Archives"]

    const handleClick = (idx) => {
        // console.log(idx);
        idx === 0 ? setSelected("Inbox") : setSelected("Archives")
    }

  return (
    <div className='flex w-full justify-between'>
        {
            buttons.map((btn,idx) => (
                <button className={`border w-full p-4 font-bold font-mono text-xl ${ selected === btn ? 'bg-red-600' : 'bg-white'}`} key={idx} onClick={() => handleClick(idx)}>
                    {btn}
                </button>
            ))
        }
    </div>
  )
}

export default Navbar