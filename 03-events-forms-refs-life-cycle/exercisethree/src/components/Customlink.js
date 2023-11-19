import React from 'react';

function Customlink({ link, text, handleClick }) {

    return (
        <div>
            <a href={link} onClick={handleClick}>{text}</a>
        </div>)
}

export default Customlink;