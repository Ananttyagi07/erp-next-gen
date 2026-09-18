/**
 * Academic Management Page
 * Handles Class, Section, Subject, Syllabus, Material, Live Class, Assignment, Submission
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
import ManageClass from '../components/modules/academic/ManageClass';
import ManageSection from '../components/modules/academic/ManageSection';
import ManageSubject from '../components/modules/academic/ManageSubject';
import ManageSyllabus from '../components/modules/academic/ManageSyllabus';
import ManageMaterial from '../components/modules/academic/ManageMaterial';
import ManageLiveClass from '../components/modules/academic/ManageLiveClass';
import ManageAssignment from '../components/modules/academic/ManageAssignment';
import ManageSubmission from '../components/modules/academic/ManageSubmission';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`academic-tabpanel-${index}`}
      aria-labelledby={`academic-tab-${index}`}
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

const Academic = () => {
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
    console.log('Academic: Tab changed from', currentTab, 'to', newValue);
    setCurrentTab(newValue);
    setSearchParams({ tab: newValue });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t('academic') || 'Academic'}
        </Typography>

        <Paper sx={{ borderRadius: 2, boxShadow: theme.shadows[1] }}>
          <Box sx={{ p: 3 }}>
            {/* Class Tab */}
            <TabPanel value={currentTab} index={0}>
              <ManageClass />
            </TabPanel>

            {/* Section Tab */}
            <TabPanel value={currentTab} index={1}>
              <ManageSection />
            </TabPanel>

            {/* Subject Tab */}
            <TabPanel value={currentTab} index={2}>
              <ManageSubject />
            </TabPanel>

            {/* Syllabus Tab */}
            <TabPanel value={currentTab} index={3}>
              <ManageSyllabus />
            </TabPanel>

            {/* Material Tab */}
            <TabPanel value={currentTab} index={4}>
              <ManageMaterial />
            </TabPanel>

            {/* Live Class Tab */}
            <TabPanel value={currentTab} index={5}>
              <ManageLiveClass />
            </TabPanel>

            {/* Assignment Tab */}
            <TabPanel value={currentTab} index={6}>
              <ManageAssignment />
            </TabPanel>

            {/* Submission Tab */}
            <TabPanel value={currentTab} index={7}>
              <ManageSubmission />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Academic;
