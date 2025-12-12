import React, { useEffect, useState, useContext } from "react";
import { Card, Image, Button, Spinner } from "react-bootstrap";
import { Edit3 } from "lucide-react";
import axios from "axios";
import EditProfileModal from "./EditProfileModal";
import { AuthContext } from "../../../AuthProvider";
import Navbar from "../../Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUserProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2 text-muted">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center text-danger mt-5">User not found.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h2 className="mb-4 fw-bold text-dark">My Profile</h2>
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-5">
            {/* Header Section */}
            <div className="d-flex flex-column flex-md-row align-items-center">
              <Image
                src={user.avatar || "https://cdn-icons-png.flaticon.com/512/2102/2102633.png"} // fallback avatar
                alt={user.name}
                roundedCircle
                className="mb-4 mb-md-0 me-md-4"
                style={{
                  width: "112px",
                  height: "112px",
                  objectFit: "cover",
                  border: "2px solid #ccc",
                }}
              />

              <div className="text-center flex-grow-1 text-md-start">
                <h3 className="fw-bold text-dark">{user.fullName}</h3>
                <p className="text-muted mb-1">{user.email}</p>
                <p className="small text-secondary mb-1">
                  Role: <strong>{user.role?.toUpperCase()}</strong>
                </p>
                <p className="small text-muted">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <Button
                variant="outline-primary"
                className="mt-4 d-flex align-items-center mt-md-0 fw-semibold"
                onClick={() => setEditModalOpen(true)}
              >
                <Edit3 size={16} className="me-2" />
                <span>Edit Profile</span>
              </Button>
            </div>

            {/* About Section */}
            <div className="pt-5 mt-5 border-top">
              <h4 className="mb-2 fw-semibold text-dark">About Me</h4>
              <p className="text-secondary lh-base">
                {user.bio || "No bio added yet."}
              </p>
            </div>
          </Card.Body>
        </Card>

        {/* Edit Modal */}
        <EditProfileModal
          show={isEditModalOpen}
          handleClose={() => setEditModalOpen(false)}
          user={user}
          setUser={setUser}
        />
      </div>
    </div>
  );
};

export default Profile;
