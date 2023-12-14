import React from "react";

function Nav(props) {
    const {
        secondNavName,
        secondNavLink,
        endPoint
    } = props;

    return (
        <div className="nav-container">
            <a href='/'>Home</a>
            <text> / </text>
            {(secondNavName && secondNavLink) && (
                <>
                    <a href={secondNavLink}>{secondNavName}</a>
                    <text> / </text>
                </>
            )}
            {endPoint}
        </div>
    )
}

export default Nav;