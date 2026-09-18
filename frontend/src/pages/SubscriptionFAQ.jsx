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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import GridOnIcon from '@mui/icons-material/GridOn';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SubscriptionFAQ = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  // Sample data for the table
  const faqData = [
    {
      id: 1,
      title: 'How do I get support for global software?',
      description: 'To get support for global software, you can reach out to our dedicated support team through the help center. We offer 24/7 assistance via email, live chat, and phone support. You can also access our comprehensive knowledge base and community forums for self-service solutions.',
      status: 'Active',
    },
    {
      id: 2,
      title: 'What payment methods are accepted?',
      description: 'We accept various payment methods including credit cards (Visa, MasterCard, American Express), debit cards, PayPal, bank transfers, and cryptocurrency. All transactions are secured with industry-standard encryption to ensure your financial information remains safe.',
      status: 'Active',
    },
    {
      id: 3,
      title: 'How do I upgrade my subscription plan?',
      description: 'To upgrade your subscription plan, navigate to your account settings and select the "Billing" section. From there, you can view all available plans and choose the one that best fits your needs. The upgrade will take effect immediately, and you will be charged a prorated amount for the current billing cycle.',
      status: 'Active',
    },
    {
      id: 4,
      title: 'Can I cancel my subscription anytime?',
      description: 'Yes, you can cancel your subscription at any time without any penalties. Simply go to your account settings, select "Subscription Management," and click on the "Cancel Subscription" button. Your access will continue until the end of your current billing period.',
      status: 'Active',
    },
  ];

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

      {/* Main Container - Manage FAQ */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ThumbUpIcon sx={{ fontSize: 20, mr: 1, color: '#000' }} />
        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#000', flex: 1 }}>
          Manage FAQ
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
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
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
              sx={{ color: '#2563eb', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
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
              <Tab icon={<ListAltIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="List" />
              <Tab icon={<AddBoxIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Add" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {selectedTab === 0 && (
            <>
              {/* Toolbar */}
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button variant="outlined" size="small" startIcon={<FileCopyIcon />} sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>Copy</Button>
                  <Button variant="outlined" size="small" startIcon={<GridOnIcon />} sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>Excel</Button>
                  <Button variant="outlined" size="small" startIcon={<DescriptionIcon />} sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>CSV</Button>
                  <Button variant="outlined" size="small" startIcon={<PictureAsPdfIcon />} sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>PDF</Button>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5' }}>Show 15 rows</Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151' }}>Search:</Typography>
                  <TextField size="small" sx={{ minWidth: 150 }} />
                </Box>
              </Box>

              {/* Table */}
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e5e5e5', mb: 2 }}>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
                    <TableRow>
                      {/* #SL Column - BLUE */}
                      <TableCell sx={{ fontWeight: 600, color: '#2563eb', fontSize: '13px', borderBottom: '1px solid #e5e5e5', width: '60px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          #SL
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#2563eb' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#2563eb', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      {/* Other Columns - GREY */}
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5', width: '250px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Title
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Description
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5', width: '100px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Status
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', borderBottom: '1px solid #e5e5e5', width: '120px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          Action
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ArrowUpwardIcon sx={{ fontSize: 10, color: '#9ca3af' }} />
                            <ArrowDownwardIcon sx={{ fontSize: 10, color: '#9ca3af', mt: -0.5 }} />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {faqData.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell sx={{ verticalAlign: 'top', borderBottom: '1px solid #e5e5e5', py: 2 }}>
                          {faq.id}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top', borderBottom: '1px solid #e5e5e5', py: 2, fontSize: '13px', color: '#374151' }}>
                          {faq.title}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top', borderBottom: '1px solid #e5e5e5', py: 2, fontSize: '13px', color: '#374151' }}>
                          {faq.description}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top', borderBottom: '1px solid #e5e5e5', py: 2, fontSize: '13px', color: '#374151' }}>
                          {faq.status}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: 'top', borderBottom: '1px solid #e5e5e5', py: 2 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                              sx={{
                                textTransform: 'none',
                                backgroundColor: '#17a2b8',
                                color: '#fff',
                                fontSize: '12px',
                                '&:hover': {
                                  backgroundColor: '#138496',
                                },
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
                              sx={{
                                textTransform: 'none',
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                fontSize: '12px',
                                '&:hover': {
                                  backgroundColor: '#c82333',
                                },
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Footer */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>Showing 1 to 4 of 4 entries</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" disabled sx={{ textTransform: 'none', color: '#9ca3af', backgroundColor: '#f9fafb', '&.Mui-disabled': { color: '#9ca3af' } }}>Previous</Button>
                  <Button size="small" variant="contained" sx={{ textTransform: 'none', backgroundColor: '#6b7280', color: '#fff', minWidth: '36px', '&:hover': { backgroundColor: '#4b5563' } }}>1</Button>
                  <Button size="small" sx={{ textTransform: 'none', color: '#374151', backgroundColor: '#fff', '&:hover': { backgroundColor: '#f9fafb' } }}>Next</Button>
                </Box>
              </Box>
            </>
          )}

          {selectedTab === 1 && (
            <Box>
              {/* Form Layout - No school selector at top */}
              <Box sx={{ maxWidth: 800 }}>
                {/* Title */}
                <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right' }}>
                    Title <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField size="small" placeholder="Title" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#e5e5e5' } } }} />
                </Box>

                {/* Description */}
                <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 2, alignItems: 'start' }}>
                  <Typography sx={{ fontSize: '14px', color: '#374151', fontWeight: 500, textAlign: 'right', mt: 1 }}>
                    Description <span style={{ color: '#dc2626' }}>*</span>
                  </Typography>
                  <TextField multiline rows={6} placeholder="Description" sx={{ backgroundColor: '#fff', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#e5e5e5' } } }} />
                </Box>

                {/* Footer Actions */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', pl: '212px' }}>
                  <Button variant="outlined" sx={{ textTransform: 'none', color: '#374151', borderColor: '#e5e5e5', backgroundColor: '#fff', px: 3, '&:hover': { borderColor: '#9ca3af', backgroundColor: '#f9fafb' } }}>
                    Cancel
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none', backgroundColor: '#000', color: '#fff', px: 3, '&:hover': { backgroundColor: '#333' } }}>
                    Submit
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

export default SubscriptionFAQ;
