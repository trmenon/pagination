import React from "react";
import { useParams } from "react-router-dom";

export const UserPage = ()=> {
    // Globals
    const {id} = useParams();

    // renderer
    return(
        <React.Fragment>
            <h6>User Page</h6>
            <p>{`User ID: ${id || "hckdshj"}`}</p>
        </React.Fragment>
    )
}