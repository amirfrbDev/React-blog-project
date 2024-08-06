import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

function Loader() {
    return (
        <RotatingLines
            height="70"
            width="70"
            color="grey"
            strokeWidth="3"
            strokeColor='#42a5f5'
        />
    )
}

export default Loader