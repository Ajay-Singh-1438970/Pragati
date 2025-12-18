// src/pages/About.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const teamMembers = [
    {
      name: "Ajay Singh",
      img: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
      email: "ajaysingh1438970@gmail.com",
      linkedin: "https://www.linkedin.com/in/ajay5ingh/",
      github: "https://github.com/Ajayy-Singh",
    },
    {
      name: "Harshwardhan Ahirwar",
      img: "https://tse3.mm.bing.net/th/id/OIP.thF7E7-sU_9R-tkdcNExuwHaHa?pid=ImgDet&w=187&h=187&c=7&dpr=1.3&o=7&rm=3",
      email: "ahirwarharshwardhan2@gmail.com",
      linkedin: "https://www.linkedin.com/in/harshwardhanahirwar",
      github: "https://github.com/harshwardhanahirwar",
    },
    {
      name: "Naman Gupta",
      img: "https://tse3.mm.bing.net/th/id/OIP.thF7E7-sU_9R-tkdcNExuwHaHa?pid=ImgDet&w=187&h=187&c=7&dpr=1.3&o=7&rm=3",
      email: "guptanamang119@email.com",
      linkedin: "https://www.linkedin.com/in/naman-gupta-2b603b259/",
      github: "https://github.com/Namangupta119",
    },
  ];

  return (
    <div className="w-full">
      <Navbar />
      {/* Hero / Banner */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/thumbnails/002/236/100/small_2x/education-banner-vector.jpg')",
          height: "250px",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black centertext-4xl md:text-5xl font-bold text-black text-center">
            About Us
          </h1>
        </div>
      </div>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 text-center">
              {" "}
              {/* 10% left & right margin */}
              <h2 className="fs-3 fw-semibold mb-3">Who We Are</h2>
              <p className="text-muted lh-lg">
                Our college is a hub of learning, innovation, and growth,
                committed to shaping the future of students through quality
                education and holistic development. We believe in empowering
                young minds with knowledge, practical skills, and values that
                prepare them for both professional excellence and responsible
                citizenship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section
        className="py-5"
        style={{ backgroundColor: "#f8f9fa", margin: "0.5%" }}
      >
        {" "}
        {/* Light background */}
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side Image */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://techsimplus.com/assets/imgs/aboutus/mission1.jpeg"
                alt="Our Mission"
                className="img-fluid rounded shadow"
                style={{ maxWidth: "450px", height: "auto" }}
              />
            </div>

            {/* Right Side Text */}
            <div className="col-md-6">
              <h2 className="fw-bold">Our Vision</h2>
              <h6 className="text-muted mb-3">
                Shaping Minds, Inspiring Futures
              </h6>
              <p className="text-secondary lh-lg">
                Our vision is to become a center of academic excellence that
                nurtures creativity, research, and innovation while promoting
                inclusivity and lifelong learning. We aspire to empower students
                to become leaders, innovators, and responsible global citizens
                who contribute positively to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ marginLeft: "5%", marginRight: "5%" }}>
        <div className="container-fluid">
          <h2 className="text-center fw-bold mb-4">Our Key Features</h2>
          <p className="text-center mb-5">
            Explore the unique features that make our platform stand out and
            help students achieve their career goals.
          </p>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-4 d-flex">
              <div className="d-flex align-items-start">
                <div className="bg-light p-3 rounded-3 me-3">
                  <i className="bi bi-lightning-charge-fill fs-3"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Fast & Reliable</h5>
                  <p>
                    Our system ensures speed and reliability for smooth usage
                    without interruptions.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4 d-flex">
              <div className="d-flex align-items-start">
                <div className="bg-light p-3 rounded-3 me-3">
                  <i className="bi bi-globe2 fs-3"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Global Access</h5>
                  <p>
                    Accessible from anywhere in the world with multilingual
                    support for users.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4 d-flex">
              <div className="d-flex align-items-start">
                <div className="bg-light p-3 rounded-3 me-3">
                  <i className="bi bi-shield-lock-fill fs-3"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Secure & Safe</h5>
                  <p>
                    We use modern security practices to keep your data safe and
                    protected.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-md-4 d-flex">
              <div className="d-flex align-items-start">
                <div className="bg-light p-3 rounded-3 me-3">
                  <i className="bi bi-people-fill fs-3"></i>
                </div>
                <div>
                  <h5 className="fw-bold">User Friendly</h5>
                  <p>
                    Designed with simplicity in mind, making it easy for anyone
                    to use.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="col-md-4 d-flex">
              <div className="d-flex align-items-start">
                <div className="bg-light p-3 rounded-3 me-3">
                  <i className="bi bi-bar-chart-fill fs-3"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Analytics</h5>
                  <p>
                    Get powerful insights and reports to make informed
                    decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="col-md-4 d-flex">
              <div className="d-flex align-items-start">
                <div className="bg-light p-3 rounded-3 me-3">
                  <i className="bi bi-laptop-fill fs-3"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Cross-Platform</h5>
                  <p>
                    Works seamlessly across mobile, tablet, and desktop devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="">
        <div>
          <div
            style={{
              maxWidth: "1200px",
              margin: "3rem auto",
              padding: "2.5rem",
              background: "#e3eafc",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#23408e",
                marginBottom: "2rem",
                letterSpacing: "1px",
              }}
            >
              Connect Our Team
            </h2>
            <div
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                padding: "1rem 0",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  gap: "2.5rem",
                  animation: "scrollHorizontal 40s linear infinite",
                }}
              >
                
                {teamMembers.map((member, index) => (
                  <TeamCard key={index} member={member} />
                ))}
                
                {teamMembers.map((member, index) => (
                  <TeamCard key={index + teamMembers.length} member={member} />
                ))}
              </div>

              
              <style>
                {`
      @keyframes scrollHorizontal {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}
              </style>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default About;

const TeamCard = ({ member }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(35,64,142,0.06)",
      }}
    >
      <img
        src={member.img}
        alt={member.name}
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "3px solid #23408e",
        }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0, color: "#23408e" }}>{member.name}</h3>
        <p style={{ margin: "0.5rem 0", color: "#555" }}>
          Email:{" "}
          <a
            href={`mailto:${member.email}`}
            style={{ color: "#23408e", textDecoration: "underline" }}
          >
            {member.email}
          </a>
        </p>
        <div style={{ display: "flex", gap: "0.7rem" }}>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <button
              style={{
                padding: "0.6rem 1.2rem",
                background: "#23408e",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              LinkedIn
            </button>
          </a>
          <a href={member.github} target="_blank" rel="noopener noreferrer">
            <button
              style={{
                padding: "0.6rem 1.2rem",
                background: "#24292e",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              GitHub
            </button>
          </a>
          <a href="#Portfolio">
            <button
              style={{
                padding: "0.6rem 1.2rem",
                background: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Portfolio
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
