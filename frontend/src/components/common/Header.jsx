import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ExitToApp as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SchoolSelector from './SchoolSelector';

const Header = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    navigate('/login');
  };

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || 'U';
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1300, width: '100%' }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('university_management')}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <SchoolSelector />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.25 }}>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
              {user?.primary_role?.name || 'User'}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#b3e5fc',
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: 0.5,
                textTransform: 'uppercase'
              }}
            >
              {user?.first_name} {user?.last_name}
            </Typography>
          </Box>

          <Tooltip title={t('userProfile')}>
            <IconButton
              size="large"
              onClick={handleMenu}
              sx={{ color: 'white' }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: '#1976d2',
                  cursor: 'pointer',
                  border: '2px solid white'
                }}
              >
                {getInitials()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user?.first_name} {user?.last_name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {user?.email || 'user@email.com'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: 'primary.main',
                    fontWeight: 600,
                    mt: 0.5
                  }}
                >
                  {t('role')}: {user?.primary_role?.name || 'User'}
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{ display: 'flex', gap: 1 }}
            >
              <LogoutIcon fontSize="small" />
              <Typography>{t('logout')}</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
