import React from 'react'
import '../App.css'
const Header = () => {
    const generateRandomName = () => {
        const names = ["Pawel", "Titu", "Kiran", "Bhushan"]
        const index = Math.floor(Math.random() * 4)
        return names[index]
    }
    const headers = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        fontSize: '1.5rem'
    }
    const btn = { display:'flex', flexDirection:'column',    border: 'none', padding: '1rem 2rem', borderRadius: '4rem', cursor: 'pointer', margin: '2.4rem', backgroundColor: "#fea" }

    const handleClick = () => {
        alert('Hey there, How you doing?')
    }
    const handleClick1 = (name) => {
        alert(`Hey ${name}, How you doing?`)
    }
    const handleClick2 = (e) => {
        console.log(e.target.innerText);
    }
    return (
        <header style={headers}>
            <p onDoubleClick={handleClick}>Hello {generateRandomName()}</p>
            <button style={btn} onClick={handleClick}>Click Me</button>
            <button style={btn} onClick={()=>handleClick1('Pawel')}>Click Me</button> 
            {/* Using anonymous arrow function */}
            <button style={btn} onClick={(e)=>handleClick2(e)}>Click Me</button> 

        </header>
    )
}

export default Header