/**
 * Leaves Management Page
 * Handles Leave Type, Leave Application, Waiting Application, Approved Application, Declined Application
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ManageLeaveType from '../components/modules/leaves/ManageLeaveType';
import ManageLeaveApplication from '../components/modules/leaves/ManageLeaveApplication';
import ManageWaitingApplication from '../components/modules/leaves/ManageWaitingApplication';
import ManageApprovedApplication from '../components/modules/leaves/ManageApprovedApplication';
import ManageDeclinedApplication from '../components/modules/leaves/ManageDeclinedApplication';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`leaves-tabpanel-${index}`}
      aria-labelledby={`leaves-tab-${index}`}
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

const Leaves = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = parseInt(searchParams.get('tab')) || 0;
  const [currentTab, setCurrentTab] = useState(initialTab);

  // Sync currentTab with URL parameter when it changes
  useEffect(() => {
    const tabFromUrl = parseInt(searchParams.get('tab')) || 0;
    setCurrentTab(tabFromUrl);
  }, [searchParams]);

  const handleTabChange = (event, newValue) => {
    console.log('Leaves: Tab changed from', currentTab, 'to', newValue);
    setCurrentTab(newValue);
    setSearchParams({ tab: newValue });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t('leaves') || 'Leaves'}
        </Typography>

        <Paper sx={{ borderRadius: 2, boxShadow: theme.shadows[1] }}>
          <Box sx={{ p: 3 }}>
            {/* Leave Type Tab */}
            <TabPanel value={currentTab} index={0}>
              <ManageLeaveType />
            </TabPanel>

            {/* Leave Application Tab */}
            <TabPanel value={currentTab} index={1}>
              <ManageLeaveApplication />
            </TabPanel>

            {/* Waiting Application Tab */}
            <TabPanel value={currentTab} index={2}>
              <ManageWaitingApplication />
            </TabPanel>

            {/* Approved Application Tab */}
            <TabPanel value={currentTab} index={3}>
              <ManageApprovedApplication />
            </TabPanel>

            {/* Declined Application Tab */}
            <TabPanel value={currentTab} index={4}>
              <ManageDeclinedApplication />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Leaves;
