import { Container, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Layout = () => {

  return (
    <>
    {/* Background elements */}
    <div className="gradient-animation"></div>
      <div className="gradient-overlay"></div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* App Title */}
          <Typography 
            variant="h2" 
            component="h1" 
            className="main-title"
          >
            Digi-Cry
          </Typography>

          {/* Navigation */}
          <nav className="glass-container nav-container">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/journal" className="nav-link">
              Journal
            </NavLink>
            <NavLink to="/analytics" className="nav-link">
              Analytics
            </NavLink>
          </nav>

          {/* Page Content */}
          <Box sx={{ mt: 4 }}>
            {children}
          </Box>
        </Box>
      </Container>
    </>

  );
};
