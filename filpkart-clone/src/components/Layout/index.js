import React from 'react'
import Header from '../Header'
import MenuHeader from '../MenuHeader'

const Layout = (props) => {
    return (
        <>
            <Header {...props} />
            <MenuHeader {...props} />
            {props.children}
        </>
    )
}

export default Layout