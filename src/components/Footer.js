import React from 'react'

const Footer = ({numberOfItems}) => {
    
    return (
        <footer style={{
            position:'absolute',
            left:'50%',
            transform:'translate(-50%)',
            bottom: 0,
        }}>{`${numberOfItems} ${(numberOfItems<=1? ` item`:` items`)} in the list`}</footer>
    )
}

export default Footer