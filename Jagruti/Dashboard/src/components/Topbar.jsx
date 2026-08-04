import React, { useState } from "react";
import {
  Navbar,
  Container,
  Form,
  Button,
  Badge,
  Dropdown,
} from "react-bootstrap";
import {
  FaBars,
  FaMoon,
  FaSun,
  FaBell,
  FaUserCircle,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

function Topbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <style>{`
        .admin-topbar {
          height: 85px;
          background: #fff;
          border-bottom: 1px solid #E9EDF3;
          box-shadow: 0 3px 15px rgba(3, 20, 54, .04);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .topbar-menu {
          width: 42px;
          height: 42px;
          border: 0;
          border-radius: 10px;
          background: #F5F7FA;
          color: #031436;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: .3s ease;
        }

        .topbar-menu:hover {
          background: #031436;
          color: #fff;
        }

        .topbar-search {
          width: 100%;
          max-width: 450px;
          position: relative;
        }

        .topbar-search input {
          height: 46px;
          border: 1px solid #E1E6ED;
          border-radius: 12px;
          padding-left: 45px;
          padding-right: 15px;
          color: #031436;
          background: #F9FAFC;
          font-size: 13px;
          transition: .3s ease;
        }

        .topbar-search input:focus {
          border-color: #E53935;
          box-shadow: 0 0 0 3px rgba(229,57,53,.08);
          background: #fff;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94A3B8;
          z-index: 2;
        }

        .topbar-action {
          width: 42px;
          height: 42px;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #031436;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: .3s ease;
          position: relative;
        }

        .topbar-action:hover {
          background: #FFF1F0;
          color: #E53935;
        }

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          min-width: 19px;
          height: 19px;
          padding: 0 5px;
          border-radius: 20px;
          background: #E53935;
          color: white;
          border: 2px solid white;
          font-size: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-btn {
          border: 0 !important;
          background: transparent !important;
          color: #031436 !important;
          display: flex !important;
          align-items: center;
          gap: 8px;
          padding: 5px !important;
        }

        .profile-btn::after {
          display: none !important;
        }

        .profile-icon {
          font-size: 35px;
          color: #031436;
        }

        .profile-btn:hover .profile-icon {
          color: #E53935;
        }

        .profile-arrow {
          font-size: 10px;
          color: #64748B;
        }

        .dropdown-menu {
          border: 0 !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 30px rgba(3,20,54,.12) !important;
          padding: 8px !important;
        }

        .dropdown-item {
          border-radius: 8px;
          font-size: 12px;
          padding: 10px 14px;
          color: #031436;
        }

        .dropdown-item:hover {
          color: #E53935;
          background: #FFF5F4;
        }

        @media (max-width: 768px) {
          .admin-topbar {
            height: 75px;
          }

          .topbar-search {
            max-width: 300px;
          }
        }

        @media (max-width: 576px) {
          .topbar-search {
            max-width: none;
          }

          .topbar-search input {
            height: 40px;
            font-size: 11px;
          }

          .topbar-menu,
          .topbar-action {
            width: 38px;
            height: 38px;
          }

          .profile-arrow {
            display: none;
          }
        }
      `}</style>

      <Navbar className="admin-topbar">
        <Container fluid className="px-4">

          <div className="d-flex align-items-center gap-3 w-100">

            {/* Menu Button */}
            <button className="topbar-menu">
              <FaBars size={20} />
            </button>

            

            {/* Right Actions */}
            <div className="d-flex align-items-center gap-2 ms-auto">

              {/* Theme */}
              <button
                className="topbar-action"
                onClick={() => setDarkMode(!darkMode)}
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              {/* Notifications */}
              <button className="topbar-action">
                <FaBell size={19} />

                <span className="notification-badge">
                  5
                </span>
              </button>

              {/* Profile */}
              <Dropdown align="end">
                <Dropdown.Toggle className="profile-btn">
                  <FaUserCircle className="profile-icon" />

                  <span className="d-none d-md-block fw-semibold">
                    Admin
                  </span>

                  <FaChevronDown className="profile-arrow" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">
                    My Profile
                  </Dropdown.Item>

                  <Dropdown.Item href="/settings">
                    Settings
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item href="/login">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </div>

          </div>

        </Container>
      </Navbar>
    </>
  );
}

export default Topbar;