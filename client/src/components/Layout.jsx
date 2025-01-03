/* eslint-disable import/no-extraneous-dependencies */
import { NavLink, Outlet } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {/* Background elements */}
      <div className="gradient-animation" />
      <div className="gradient-overlay" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <Container maxWidth="lg">
        <Box className="layout-container">
          {/* App Title */}
          <Typography variant="h2" component="h1" className="main-title">
            Digi-Cry
          </Typography>

          {/* Navigation Bar */}
          <nav className="nav-container">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/journal"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Journal
                </NavLink>

                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Events
                </NavLink>

                <NavLink to="/forums" className="nav-link">
                  Forums
                </NavLink>

                <NavLink to="/" onClick={logout} className="nav-link">
                  Logout
                </NavLink>
              </>
            )}
          </nav>

          {/* Page Content */}
          <Box className="page-content">
            {children}
            <Outlet />
          </Box>
        </Box>
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
