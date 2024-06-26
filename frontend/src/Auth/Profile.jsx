import React from 'react'
import AuthRequired from '../middleware/authRequired'

const Profile = () => {
    return (
        <AuthRequired>
            <div>
                Profile
            </div>
        </AuthRequired>
    )
}

export default Profile
