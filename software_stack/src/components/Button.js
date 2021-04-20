import React from 'react'
import './Button.css'

const STYLE = [
    'btn--primary',
    'btn--outline'
];

const SIZE = [
    'btn--medium',
    'btn--large'
];

export const Button = ({
    // args
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {

    const checkButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
    const checkButtonSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];
 
    return (
        <button classNames={'btn ${checkButtonStyle} ${checkButtonSize}'}  onClick={onClick} type={type}>
            {children}
        </button>
    )

}

// onClick={onClick} type={type}