/**
 * Front Office Management Page
 * Handles Visitor Purpose, Visitor Info, Call Log, Postal Dispatch, Postal Receive
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ManageVisitorPurpose from '../components/modules/frontOffice/ManageVisitorPurpose';
import ManageVisitor from '../components/modules/frontOffice/ManageVisitor';
import ManageCallLog from '../components/modules/frontOffice/ManageCallLog';
import ManagePostalDispatch from '../components/modules/frontOffice/ManagePostalDispatch';
import ManagePostalReceive from '../components/modules/frontOffice/ManagePostalReceive';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`front-office-tabpanel-${index}`}
      aria-labelledby={`front-office-tab-${index}`}
      sx={{
        display: value === index ? 'block' : 'none',
        py: 3,
        width: '100%'
      }}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

const FrontOffice = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = parseInt(searchParams.get('tab')) || 0;
  const [currentTab, setCurrentTab] = useState(initialTab);

  const handleTabChange = (event, newValue) => {
    console.log('FrontOffice: Tab changed from', currentTab, 'to', newValue);
    setCurrentTab(newValue);
    // Update URL query parameter to reflect selected tab
    setSearchParams({ tab: newValue });
  };

  const tabsData = [
    { label: t('Visitor Purpose') || 'Visitor Purpose', id: 0 },
    { label: t('Manage Visitor') || 'Manage Visitor', id: 1 },
    { label: t('Call Log') || 'Call Log', id: 2 },
    { label: t('Postal Dispatch') || 'Postal Dispatch', id: 3 },
    { label: t('Postal Receive') || 'Postal Receive', id: 4 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t('Front Office')}
        </Typography>

        <Paper sx={{ borderRadius: 2, boxShadow: theme.shadows[1] }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="front office tabs"
            variant="fullWidth"
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.default,
            }}
          >
            {tabsData.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                id={`front-office-tab-${tab.id}`}
                aria-controls={`front-office-tabpanel-${tab.id}`}
              />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Visitor Purpose Tab */}
            <TabPanel value={currentTab} index={0}>
              <ManageVisitorPurpose />
            </TabPanel>

            {/* Manage Visitor Tab */}
            <TabPanel value={currentTab} index={1}>
              <ManageVisitor />
            </TabPanel>

            {/* Call Log Tab */}
            <TabPanel value={currentTab} index={2}>
              <ManageCallLog />
            </TabPanel>

            {/* Postal Dispatch Tab */}
            <TabPanel value={currentTab} index={3}>
              <ManagePostalDispatch />
            </TabPanel>

            {/* Postal Receive Tab */}
            <TabPanel value={currentTab} index={4}>
              <ManagePostalReceive />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default FrontOffice;
