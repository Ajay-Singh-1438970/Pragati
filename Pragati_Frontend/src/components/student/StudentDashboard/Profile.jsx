import React, { useState } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Edit3 } from 'lucide-react';
// Make sure EditProfileModal is imported from its file
import EditProfileModal from './EditProfileModal';

const Profile = ({ user, setUser }) => {
    // const [isEditModalOpen, setEditModalOpen] = useState(false);

    // ✅ CORRECT (Keeps modal hidden until button is clicked)
const [isEditModalOpen, setEditModalOpen] = useState(false);

    // ADDED: Guard clause to prevent crashes if user data is not yet available.
    if (!user) {
        return <p>Loading profile...</p>; 
    }

    return (
        <div>
            <h2 className="mb-4 h3 fw-bold text-dark">My Profile</h2>
            <Card className="border-0 shadow-sm rounded-4">
                <Card.Body className="p-5">
                    {/* Top section with avatar, info, and edit button */}
                    <div className="d-flex flex-column flex-md-row align-items-center">
                        <Image
                            src={user.avatar} // update karna hai for taking url of image  
                            alt={user.name}
                            roundedCircle
                            className="mb-4 mb-md-0 me-md-4"
                            style={{ width: '112px', height: '112px', objectFit: 'cover' }}
                        />
                        <div className="text-center flex-grow-1 text-md-start">
                            <h3 className="h3 fw-bold text-dark">{user.name}</h3>
                            <p className="text-muted">{user.email}</p>
                            <p className="mt-1 small text-muted">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Button
                            variant="primary-subtle"
                            className="mt-4 d-flex align-items-center mt-md-0 fw-semibold"
                            onClick={() => setEditModalOpen(true)}
                        >
                            <Edit3 size={16} className="me-2" />
                            <span>Edit Profile</span>
                        </Button>
                    </div>

                    {/* Bottom section with user bio */}
                    <div className="pt-5 mt-5 border-top">
                        <h4 className="mb-2 fw-semibold text-dark">About Me</h4>
                        <p className="text-secondary lh-base">{user.bio}</p>
                    </div>
                </Card.Body>
            </Card>

            {/* Conditionally render the Edit Profile Modal */}
            <EditProfileModal
                show={isEditModalOpen}
                handleClose={() => setEditModalOpen(false)}
                user={user}
                setUser={setUser}
            />
        </div>
    );
};

export default Profile;