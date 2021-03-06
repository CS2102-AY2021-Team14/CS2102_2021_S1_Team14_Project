import React from 'react';
import './Avatar.css';

const Avatar = ({user}) => {

    // Save the user info
    const userinfo = {
        name: user.username,
        image: user.image,
        job: user.job,
        startDate: user.join,
        salary: user.salary,
        employmentStatus: user.employment
    }

    const unemployedClass = "employment-unemployed";
    const employedClass = "employment-employed";

    const employmentStatus = (userinfo.employmentStatus.toUpperCase() === "EMPLOYED") ? employedClass : unemployedClass;
    
    return (
        <>
            <div className="avatar">
                <img
                    src={userinfo.image}
                    alt="avatar"
                    id="avatarimage"
                    class="img-thumbnail"
                />
                <div className="userinfo">
                    <h4>{userinfo.name}</h4>
                    <p>{userinfo.job}</p>
                    <p>Joined on {userinfo.startDate}</p>
                    <div className={employmentStatus}>
                        <h5 id="employmentstatus">{userinfo.employmentStatus}</h5>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default Avatar;
