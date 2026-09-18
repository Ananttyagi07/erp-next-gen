import { useState } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] } },
};

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar - Positioned independently */}
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Right side: Header + Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header - Fixed at top */}
        <Header onMenuClick={handleDrawerToggle} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            backgroundColor: '#f5f5f5',
            p: { xs: 1, sm: 2, md: 3 },
            overflowX: 'hidden',
            overflowY: 'auto',
            mt: 8, // Account for fixed header
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
