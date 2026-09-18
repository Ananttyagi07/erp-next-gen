/**
 * Human Resources Management Page
 * Handles HR Management and Leave Management
 */

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ManageDesignation from '../components/modules/humanResources/ManageDesignation';
import ManageEmployee from '../components/modules/humanResources/ManageEmployee';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`hr-tabpanel-${index}`}
      aria-labelledby={`hr-tab-${index}`}
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

const HumanResources = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = parseInt(searchParams.get('tab')) || 0;
  const [currentTab, setCurrentTab] = useState(initialTab);

  const handleTabChange = (event, newValue) => {
    console.log('HumanResources: Tab changed from', currentTab, 'to', newValue);
    setCurrentTab(newValue);
    setSearchParams({ tab: newValue });
  };

  const tabsData = [
    { label: t('manageDesignation') || 'Manage Designation', id: 0 },
    { label: t('manageEmployee') || 'Manage Employee', id: 1 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t('humanResources') || 'Human Resources'}
        </Typography>

        <Paper sx={{ borderRadius: 2, boxShadow: theme.shadows[1] }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="human resources tabs"
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
                id={`hr-tab-${tab.id}`}
                aria-controls={`hr-tabpanel-${tab.id}`}
              />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Manage Designation Tab */}
            <TabPanel value={currentTab} index={0}>
              <ManageDesignation />
            </TabPanel>

            {/* Manage Employee Tab */}
            <TabPanel value={currentTab} index={1}>
              <ManageEmployee />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HumanResources;
