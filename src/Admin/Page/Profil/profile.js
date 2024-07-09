// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './profile.css';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h1>Profile {user.name}</h1>
            <div className="profile-card">
                <img
                    alt="profile"
                    src={`http://localhost:8000/assets/images/${user.image}`}
                    className="profile-image"
                />
                <div className="profile-details">
                    <div>
                        <strong>Jenis Kelamin: </strong>
                        {user.gender ? "Perempuan" : "Laki-Laki"}
                    </div>
                    <div>
                        <strong>No Telepon: </strong>
                        {user.phone_number}
                    </div>
                    <div>
                        <strong>Email: </strong>
                        {user.email}
                    </div>
                    <div>
                        <strong>Job: </strong>
                        {user.job}
                    </div>
                    <Link to={`/profile/edit/${user.id}`} className="btn btn-warning">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
