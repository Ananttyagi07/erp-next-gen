import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Link,
  Tabs,
  Tab,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const GeneralSetting = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* Global Header Bar */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        {/* Left Side */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="Global Search"
            sx={{
              minWidth: 250,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#e5e5e5',
                },
              },
            }}
          />
        </Box>

        {/* Divider */}
        <Box sx={{ width: '1px', height: '40px', backgroundColor: '#e5e5e5', display: { xs: 'none', md: 'block' } }} />

        {/* Right Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Session Year--</MenuItem>
              <MenuItem value="2024-2025">2024-2025</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'none',
              px: 3,
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>

      {/* Main Container - General Setting */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <SettingsIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#000', flex: 1 }}>
          General Setting
        </Typography>
        {isCollapsed ? (
          <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#000' }} />
        ) : (
          <KeyboardArrowUpIcon sx={{ fontSize: 20, color: '#000' }} />
        )}
      </Box>

      <Box sx={{ borderBottom: '1px solid #e5e5e5', mb: 3 }} />

      {!isCollapsed && (
        <>
          {/* Quick Links Row - Extended */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
              Quick Link:
            </Typography>
            <Link
              onClick={() => navigate('/subscription/general-setting')}
              sx={{
                color: '#2563eb',
                textDecoration: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: '#dbeafe',
                px: 1,
                py: 0.5,
                borderRadius: '4px',
              }}
            >
              General Setting
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Manage School
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Payment Setting
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              SMS Setting
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Email Setting
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Academic Year
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              User Role
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Role Permission
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Super Admin
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Manage User
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Reset User Password
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Reset Username
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              User Credential
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Activity Log
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Feedback
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Backup
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Opening Hour
            </Link>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: '1px solid #e5e5e5', mb: 3 }}>
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              sx={{
                minHeight: '42px',
                '& .MuiTab-root': {
                  minHeight: '42px',
                  textTransform: 'none',
                  fontSize: '14px',
                  color: '#6b7280',
                  '&.Mui-selected': {
                    color: '#000',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#000',
                },
              }}
            >
              <Tab icon={<SettingsIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="General Setting" />
            </Tabs>
          </Box>

          {/* Tab Content - General Setting Form */}
          {selectedTab === 0 && (
            <Box sx={{ maxWidth: 900 }}>
              {/* Brand Name */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Brand Name <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField
                  size="small"
                  defaultValue="Caz Brain"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Brand Title */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Brand Title <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField
                  size="small"
                  defaultValue="SCHOOL SYSTEM"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Global Language */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Global Language <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small" sx={{ maxWidth: 400 }}>
                  <Select defaultValue="English">
                    <MenuItem value="English">English</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Currency */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Currency
                </Typography>
                <TextField
                  size="small"
                  defaultValue="INR"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Currency Symbol */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Currency Symbol
                </Typography>
                <TextField
                  size="small"
                  defaultValue="₹"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Enable RTL */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Enable RTL <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small" sx={{ maxWidth: 400 }}>
                  <Select defaultValue="No">
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Enable Frontend */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Enable Frontend <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small" sx={{ maxWidth: 400 }}>
                  <Select defaultValue="No">
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Theme */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Theme <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small" sx={{ maxWidth: 400 }}>
                  <Select defaultValue="Black">
                    <MenuItem value="Black">Black</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Default Time Zone */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Default Time Zone <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small" sx={{ maxWidth: 400 }}>
                  <Select defaultValue="(GMT+05:30) Kolkata">
                    <MenuItem value="(GMT+05:30) Kolkata">(GMT+05:30) Kolkata</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Date Format */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Date Format <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small" sx={{ maxWidth: 400 }}>
                  <Select defaultValue="Jul 13, 2018">
                    <MenuItem value="Jul 13, 2018">Jul 13, 2018</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Brand Logo */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600, pt: 1 }}>
                  Brand Logo
                </Typography>
                <Box>
                  <Box
                    sx={{
                      mb: 2,
                      width: 100,
                      height: 110,
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f9fafb',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    <Typography sx={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>LOGO</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AttachFileIcon />}
                    sx={{
                      textTransform: 'none',
                      borderColor: '#d1d5db',
                      color: '#374151',
                      mb: 1,
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                    }}
                  >
                    Upload
                  </Button>
                  <Typography sx={{ fontSize: '12px', color: '#17a2b8' }}>
                    Dimension:- Max-W: 100px, Max-H: 110px
                  </Typography>
                </Box>
              </Box>

              {/* Favicon Icon */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600, pt: 1 }}>
                  Favicon Icon
                </Typography>
                <Box>
                  <Box
                    sx={{
                      mb: 2,
                      width: 50,
                      height: 50,
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f9fafb',
                    }}
                  >
                    <Typography sx={{ fontSize: '10px', color: '#9ca3af' }}>20x20</Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AttachFileIcon />}
                    sx={{
                      textTransform: 'none',
                      borderColor: '#d1d5db',
                      color: '#374151',
                      mb: 1,
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                    }}
                  >
                    Upload
                  </Button>
                  <Typography sx={{ fontSize: '12px', color: '#17a2b8' }}>
                    Dimension:- Max-W: 20px, Max-H: 20px
                  </Typography>
                </Box>
              </Box>

              {/* Brand Footer */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Brand Footer
                </Typography>
                <TextField
                  size="small"
                  defaultValue="EDU PLUS ERP"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Google Analytics */}
              <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Google Analytics
                </Typography>
                <TextField
                  size="small"
                  defaultValue="Google Analytics"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Footer Actions */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2 }}>
                <Box />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      color: '#374151',
                      borderColor: '#e5e5e5',
                      backgroundColor: '#fff',
                      px: 4,
                      '&:hover': {
                        borderColor: '#9ca3af',
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      backgroundColor: '#000',
                      color: '#fff',
                      px: 4,
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default GeneralSetting;
