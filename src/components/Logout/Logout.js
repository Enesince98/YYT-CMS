import React from 'react'

const LogOut = () => {
    localStorage.clear();
    window.location.href = '/';
}

export default LogOut