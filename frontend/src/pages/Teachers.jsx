/**
 * Teachers Management Page
 * Handles Department, Manage Teacher, Class Lecture, Rating
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
import ManageDepartment from '../components/modules/teachers/ManageDepartment';
import ManageTeacher from '../components/modules/teachers/ManageTeacher';
import ManageClassLecture from '../components/modules/teachers/ManageClassLecture';
import ManageRating from '../components/modules/teachers/ManageRating';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`teachers-tabpanel-${index}`}
      aria-labelledby={`teachers-tab-${index}`}
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

const Teachers = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = parseInt(searchParams.get('tab')) || 0;
  const [currentTab, setCurrentTab] = useState(initialTab);

  const handleTabChange = (event, newValue) => {
    console.log('Teachers: Tab changed from', currentTab, 'to', newValue);
    setCurrentTab(newValue);
    setSearchParams({ tab: newValue });
  };

  const tabsData = [
    { label: t('departments') || 'Departments', id: 0 },
    { label: t('manageTeacher') || 'Manage Teacher', id: 1 },
    { label: t('classLecture') || 'Class Lecture', id: 2 },
    { label: t('rating') || 'Rating', id: 3 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t('teachers') || 'Teachers'}
        </Typography>

        <Paper sx={{ borderRadius: 2, boxShadow: theme.shadows[1] }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="teachers tabs"
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
                id={`teachers-tab-${tab.id}`}
                aria-controls={`teachers-tabpanel-${tab.id}`}
              />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Department Tab */}
            <TabPanel value={currentTab} index={0}>
              <ManageDepartment />
            </TabPanel>

            {/* Manage Teacher Tab */}
            <TabPanel value={currentTab} index={1}>
              <ManageTeacher />
            </TabPanel>

            {/* Class Lecture Tab */}
            <TabPanel value={currentTab} index={2}>
              <ManageClassLecture />
            </TabPanel>

            {/* Rating Tab */}
            <TabPanel value={currentTab} index={3}>
              <ManageRating />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Teachers;
