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

const SubscriptionSetting = () => {
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

      {/* Main Container - Subscription Setting */}
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
          Subscription Setting
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
          {/* Quick Links Row */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
              Quick Link:
            </Typography>
            <Link
              onClick={() => navigate('/subscription/faq')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              FAQ
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/slider')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Slider
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/setting')}
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
              Subscription Setting
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/general-setting')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              General Setting
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/plan')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Subscription Plan
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/subscription/subscription')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Subscription
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
              <Tab icon={<SettingsIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Setting" />
            </Tabs>
          </Box>

          {/* Tab Content - Setting Form */}
          {selectedTab === 0 && (
            <Box sx={{ maxWidth: 900 }}>
              {/* Basic Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    backgroundColor: '#f3f4f6',
                    p: 1.5,
                    mb: 3,
                  }}
                >
                  Basic Information
                </Typography>

                {/* Phone */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Phone
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="123-456-7890"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Email */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Email <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="support@globalsoftware.com"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Address */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', pt: 1 }}>
                    Address <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    multiline
                    rows={3}
                    defaultValue="1234 Innovation Drive, Suite 500, Tech City, TC 12345, United States"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Google Map */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', pt: 1 }}>
                    Google Map <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    multiline
                    rows={3}
                    defaultValue="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Opening Day */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Opening Day <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="Monday - Friday"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Opening Hour */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Opening Hour <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="9:00 AM - 6:00 PM"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Demo Video */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Demo Video <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Video ID */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Video ID <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="dQw4w9WgXcQ"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Footer Note */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', pt: 1 }}>
                    Footer Note <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    multiline
                    rows={3}
                    defaultValue="© 2024 Global Software. All rights reserved. Empowering education through innovative technology solutions."
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* About Brand */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', pt: 1 }}>
                    About Brand <span style={{ color: '#dc3545' }}>*</span>
                  </Typography>
                  <TextField
                    multiline
                    rows={4}
                    defaultValue="Global Software is a leading provider of comprehensive school management solutions. We are dedicated to transforming education through cutting-edge technology, helping institutions streamline operations and enhance learning experiences."
                    sx={{ maxWidth: 500 }}
                  />
                </Box>
              </Box>

              {/* Social Link Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    backgroundColor: '#f3f4f6',
                    p: 1.5,
                    mb: 3,
                  }}
                >
                  Social Link
                </Typography>

                {/* Facebook */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Facebook
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="https://www.facebook.com/globalsoftware"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Twitter */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Twitter
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="https://twitter.com/globalsoftware"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* LinkedIn */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    LinkedIn
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="https://www.linkedin.com/company/globalsoftware"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* YouTube */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    YouTube
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="https://www.youtube.com/c/globalsoftware"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Instagram */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Instagram
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="https://www.instagram.com/globalsoftware"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Pinterest */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151' }}>
                    Pinterest
                  </Typography>
                  <TextField
                    size="small"
                    defaultValue="https://www.pinterest.com/globalsoftware"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>
              </Box>

              {/* Other Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151',
                    backgroundColor: '#f3f4f6',
                    p: 1.5,
                    mb: 3,
                  }}
                >
                  Other Information
                </Typography>

                {/* About Image */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', pt: 1 }}>
                    About Image
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AttachFileIcon />}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#d1d5db',
                        color: '#374151',
                        '&:hover': {
                          borderColor: '#9ca3af',
                        },
                      }}
                    >
                      Upload
                    </Button>
                    <Box
                      sx={{
                        mt: 2,
                        width: 150,
                        height: 100,
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f9fafb',
                      }}
                    >
                      <Typography sx={{ fontSize: '12px', color: '#9ca3af' }}>Preview</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Header Logo */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', pt: 1 }}>
                    Header Logo
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AttachFileIcon />}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#d1d5db',
                        color: '#374151',
                        '&:hover': {
                          borderColor: '#9ca3af',
                        },
                      }}
                    >
                      Upload
                    </Button>
                    <Box
                      sx={{
                        mt: 2,
                        width: 150,
                        height: 100,
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f9fafb',
                      }}
                    >
                      <Typography sx={{ fontSize: '12px', color: '#9ca3af' }}>Preview</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Footer Logo */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', pt: 1 }}>
                    Footer Logo
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AttachFileIcon />}
                      sx={{
                        textTransform: 'none',
                        borderColor: '#d1d5db',
                        color: '#374151',
                        '&:hover': {
                          borderColor: '#9ca3af',
                        },
                      }}
                    >
                      Upload
                    </Button>
                    <Box
                      sx={{
                        mt: 2,
                        width: 150,
                        height: 100,
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f9fafb',
                      }}
                    >
                      <Typography sx={{ fontSize: '12px', color: '#9ca3af' }}>Preview</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Update Button */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2 }}>
                <Box />
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      textTransform: 'none',
                      px: 4,
                      py: 1,
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

export default SubscriptionSetting;
