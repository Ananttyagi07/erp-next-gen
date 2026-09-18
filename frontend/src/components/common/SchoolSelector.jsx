/**
 * Global School / Branch Switcher
 * Lets a multi-tenant user switch which school's data the whole app is
 * scoped to. Every API request already carries the selection as the
 * X-School-Id header (see apiService.js), and switching invalidates every
 * cached query app-wide (see main.jsx) so already-open pages refetch under
 * the new tenant immediately — no reload needed.
 */

import { useState } from 'react';
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  ApartmentRounded as SchoolIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckIcon,
  SwapHorizRounded as SwitchIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSchool } from '../../context/useSchool';

export default function SchoolSelector() {
  const {
    selectedSchool,
    schools,
    isLoadingSchools,
    changeSchool,
    getCurrentSchool,
  } = useSchool();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const currentSchool = getCurrentSchool();

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (collegeId) => {
    changeSchool(collegeId);
    handleClose();
  };

  if (isLoadingSchools) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, color: 'rgba(255,255,255,0.85)' }}>
        <CircularProgress size={16} color="inherit" />
        <Typography variant="caption">Loading branches…</Typography>
      </Box>
    );
  }

  if (!schools || schools.length === 0) return null;

  return (
    <>
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
        <Box
          onClick={handleOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.28)',
            backgroundColor: open ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.06)',
            transition: 'background-color 0.18s ease, border-color 0.18s ease',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.16)',
              borderColor: 'rgba(255,255,255,0.5)',
            },
          }}
        >
          <SchoolIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.9)' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              Branch
            </Typography>
            <Typography
              sx={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 160,
              }}
            >
              {currentSchool ? currentSchool.name : 'Select branch'}
            </Typography>
          </Box>
          <ExpandMoreIcon
            sx={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.7)',
              transition: 'transform 0.18s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Box>
      </motion.div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 300,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 16px 40px -12px rgba(0,0,0,0.35)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SwitchIcon fontSize="small" color="action" />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Switch branch
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Data updates instantly, no reload
            </Typography>
          </Box>
        </Box>
        <Divider />
        <AnimatePresence>
          {schools.map((school, index) => {
            const isSelected = String(school.collegeId) === String(selectedSchool);
            return (
              <motion.div
                key={school.collegeId}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, delay: index * 0.04 }}
              >
                <MenuItem
                  onClick={() => handleSelect(school.collegeId)}
                  selected={isSelected}
                  sx={{
                    py: 1.25,
                    px: 2,
                    borderLeft: '3px solid transparent',
                    '&.Mui-selected': {
                      backgroundColor: (theme) => `${theme.palette.primary.main}14`,
                      borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: (theme) => `${theme.palette.primary.main}22`,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 2 }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {school.name}
                      </Typography>
                      {school.code && (
                        <Typography variant="caption" color="text.secondary">
                          Code: {school.code}
                        </Typography>
                      )}
                    </Box>
                    {isSelected && <CheckIcon fontSize="small" color="primary" />}
                  </Box>
                </MenuItem>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Menu>
    </>
  );
}
