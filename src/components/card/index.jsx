import React from "react";
import { useNavigate } from "react-router-dom";
import './Card.styles.scss';

export const Card = ({
    id,
    name,
    username,
    email,
    city,
    company
})=> {
    // Globals
    const navigate = useNavigate();
    const handleNavigate = ()=> navigate(`/${id}`);

    // Renderer
    return(
        <React.Fragment>
            <div className="card" onClick={handleNavigate}>
                <div className="card-header">
                    <div className="avatar">{id}</div>
                    <div className="label">{name}</div>
                </div>
                <div className="card-main">
                    <div className="card-main-section">
                        <div className="section-label">Username</div>
                        <div className="section-value">{username}</div>
                    </div>
                    <div className="card-main-section">
                        <div className="section-label">Email</div>
                        <div className="section-value">{email}</div>
                    </div>
                    <div className="card-main-section">
                        <div className="section-label">City</div>
                        <div className="section-value">{city}</div>
                    </div>
                    <div className="card-main-section">
                        <div className="section-label">Company</div>
                        <div className="section-value">{company}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}