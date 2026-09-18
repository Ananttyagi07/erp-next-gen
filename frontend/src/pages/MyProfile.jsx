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
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const MyProfile = () => {
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

        {/* Divider - BLACK */}
        <Box sx={{ width: '1px', height: '40px', backgroundColor: '#000', display: { xs: 'none', md: 'block' } }} />

        {/* Right Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Select School--</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select displayEmpty defaultValue="">
              <MenuItem value="">--Session Year--</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>

      {/* Main Container - My Profile */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <LockIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#000', flex: 1 }}>
          My Profile
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
              onClick={() => navigate('/profile/my-profile')}
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
              My Profile
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/profile/reset-password')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Reset Password
            </Link>
            <Typography sx={{ color: '#6b7280', fontSize: '14px' }}>|</Typography>
            <Link
              onClick={() => navigate('/profile/logout')}
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              Log Out
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
                  color: '#000',
                  '&.Mui-selected': {
                    color: '#000',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#000',
                },
              }}
            >
              <Tab icon={<VisibilityIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Profile" />
              <Tab icon={<EditIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Update" />
            </Tabs>
          </Box>

          {/* Tab Content - Profile (Read-Only View) */}
          {selectedTab === 0 && (
            <Box>
              {/* Hero Banner */}
              <Box
                sx={{
                  backgroundColor: '#f3f4f6',
                  p: 4,
                  mb: 3,
                  textAlign: 'center',
                  borderRadius: '4px',
                }}
              >
                <Typography sx={{ fontSize: '24px', fontWeight: 600, color: '#374151' }}>
                  Future Ratan Pre School
                </Typography>
              </Box>

              {/* Details Table */}
              <Box
                sx={{
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {/* Row 1 */}
                    <tr>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', width: '25%', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Name
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', width: '25%', fontSize: '14px', color: '#374151' }}>
                        Future Ratan Pre School
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', width: '25%', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        National ID
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5', width: '25%', fontSize: '14px', color: '#374151' }}>

                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Email
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>
                        admin@gmail.com
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Phone
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>
                        9876543210
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Present Address
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>

                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Permanent Address
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>

                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Gender
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>
                        Male
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Blood Group
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>

                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Religion
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>

                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Birth Date
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>
                        Jan 1, 1970
                      </td>
                    </tr>
                    {/* Row 6 */}
                    <tr>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Other Info
                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', fontSize: '14px', color: '#374151' }}>

                      </td>
                      <td style={{ padding: '12px', borderRight: '1px solid #e5e5e5', fontWeight: 600, color: '#6b7280', fontSize: '14px' }}>
                        Resume
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', color: '#374151' }}>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          )}

          {/* Tab Content - Update (Form View) */}
          {selectedTab === 1 && (
            <Box sx={{ maxWidth: 900 }}>
              {/* Name */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Name <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField
                  size="small"
                  defaultValue="Future Ratan Pre School"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Phone */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Phone <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField
                  size="small"
                  defaultValue="9876543210"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Present Address */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600, pt: 1 }}>
                  Present Address
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  sx={{ maxWidth: 500 }}
                />
              </Box>

              {/* Permanent Address */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600, pt: 1 }}>
                  Permanent Address
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  sx={{ maxWidth: 500 }}
                />
              </Box>

              {/* Gender */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Gender <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <FormControl size="small" sx={{ maxWidth: 400 }}>
                  <Select defaultValue="Male">
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Blood Group */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Blood Group
                </Typography>
                <FormControl size="small" sx={{ maxWidth: 400 }}>
                  <Select displayEmpty defaultValue="">
                    <MenuItem value="">--Select--</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Religion */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Religion
                </Typography>
                <TextField
                  size="small"
                  placeholder="Religion"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Birth Date */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Birth Date <span style={{ color: '#dc3545' }}>*</span>
                </Typography>
                <TextField
                  size="small"
                  defaultValue="01-01-1970"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Email */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600 }}>
                  Email
                </Typography>
                <TextField
                  size="small"
                  defaultValue="admin@gmail.com"
                  sx={{ maxWidth: 400 }}
                />
              </Box>

              {/* Photo */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600, pt: 1 }}>
                  Photo
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
                      mb: 1,
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                    }}
                  >
                    Upload
                  </Button>
                  <Typography sx={{ fontSize: '12px', color: '#17a2b8', mb: 0.5 }}>
                    Dimension:- Max-W: 120px, Max-H: 130px
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#17a2b8' }}>
                    Image file format: .jpg, .jpeg, .png or .gif
                  </Typography>
                </Box>
              </Box>

              {/* Resume */}
              <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600, pt: 1 }}>
                  Resume
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
                      mb: 1,
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                    }}
                  >
                    Upload
                  </Button>
                  <Typography sx={{ fontSize: '12px', color: '#17a2b8' }}>
                    Document file format: .pdf, .doc/docx, .ppt/pptx or .txt
                  </Typography>
                </Box>
              </Box>

              {/* Other Info */}
              <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                <Typography sx={{ textAlign: 'right', fontSize: '14px', color: '#374151', fontWeight: 600, pt: 1 }}>
                  Other Info
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  sx={{ maxWidth: 500 }}
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

export default MyProfile;
