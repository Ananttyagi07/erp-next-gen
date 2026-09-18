/**
 * Lesson Management Page
 * Handles Lesson, Topic, Timeline, and Status
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
import ManageLesson from '../components/modules/lesson_plan/ManageLesson';
import ManageTopic from '../components/modules/lesson_plan/ManageTopic';
import ManageTimeline from '../components/modules/lesson_plan/ManageTimeline';
import ManageStatus from '../components/modules/lesson_plan/ManageStatus';
import ManageLessonPlan from '../components/modules/lesson_plan/ManageLessonPlan';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-plan-tabpanel-${index}`}
      aria-labelledby={`lesson-plan-tab-${index}`}
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

const LessonPlan = () => {
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
    console.log('LessonPlan: Tab changed from', currentTab, 'to', newValue);
    setCurrentTab(newValue);
    setSearchParams({ tab: newValue });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {t('Lesson') || 'Lesson'}
        </Typography>

        <Paper sx={{ borderRadius: 2, boxShadow: theme.shadows[1] }}>
          <Box sx={{ p: 3 }}>
            {/* Lesson Tab */}
            <TabPanel value={currentTab} index={0}>
              <ManageLesson />
            </TabPanel>

            {/* Topic Tab */}
            <TabPanel value={currentTab} index={1}>
              <ManageTopic />
            </TabPanel>

            {/* Timeline Tab */}
            <TabPanel value={currentTab} index={2}>
              <ManageTimeline />
            </TabPanel>

            {/* Status Tab */}
            <TabPanel value={currentTab} index={3}>
              <ManageStatus />
            </TabPanel>

            {/* Lesson Plan Tab */}
            <TabPanel value={currentTab} index={4}>
              <ManageLessonPlan />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LessonPlan;
