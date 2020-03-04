import React from 'react';
import { Link } from 'react-router-dom'
const NotFound = () =>{

    return(
        <div className="col">
            <h2 className="text-center">No Data Found</h2>
            <center><Link to="/">Return to Home Page</Link></center>
        </div>
    )
}
export default NotFound;