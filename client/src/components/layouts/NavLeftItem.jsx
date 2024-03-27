import React, { useState } from 'react'
import './SideBar.css'

export default function NavLeftItem({
    imgNormal,
    imgHover,
    name
}) {
    const [isHovered, setIsHovered] = useState(false)
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <>
            <div onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="navigation-tabs" style={isHovered ? { color: "black", backgroundColor: "white" } : { color: "white" }}>
                    <img
                        src={!isHovered ? imgNormal : imgHover}
                        alt={name}
                        title={name}
                    />
                    <span className="nav-content">{name}</span>
                </div>

            </div>
        </>
    )
}