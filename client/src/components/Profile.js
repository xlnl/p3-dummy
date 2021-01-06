import React from 'react'
import { getCurrentUser } from '../services/auth.service'

const Profile = () => {
    const currentUser = getCurrentUser()
    console.log(currentUser)

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>Welcome, {currentUser.username}</strong>
                </h3>
            </header>
            <p>
                <strong>Name:</strong> {currentUser.firstName} {" "} {currentUser.lastName} 
            </p>
            <p>
                <strong>Id:</strong>{currentUser.id}
            </p>
            <p>
                <strong>Email:</strong>{currentUser.email}
            </p>
            <p>
                <strong>City:</strong>{currentUser.city}
            </p>
            <img src={currentUser.profilePic} alt="current user's profile pic"/>

            {/* if current user has roles then map through those roles */}
            {currentUser.roles && 
                currentUser.roles.map((roles, index) => <li key={index}>{roles}</li>)}
        </div>
    )
}

export default Profile