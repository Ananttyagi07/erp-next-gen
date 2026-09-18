import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  FileDownload as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState('student');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      setTimeout(() => {
        setReportData({
          title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
          startDate,
          endDate,
          records: Math.floor(Math.random() * 100) + 50,
          summary: `Generated report containing ${Math.floor(Math.random() * 100) + 50} records`,
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    // Download logic would go here
    alert(`Downloading ${reportType} report...`);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const reportMetrics = [
    { label: 'Total Students', value: '1,245', color: '#1976d2' },
    { label: 'Total Teachers', value: '89', color: '#dc004e' },
    { label: 'Total Courses', value: '42', color: '#ff9800' },
    { label: 'Avg Attendance', value: '92%', color: '#4caf50' },
  ];

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#fff", py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <h1 style={{ color: "#000" }}>Reports & Analytics</h1>
        <Typography variant="body1" color="textSecondary">
          Generate and analyze ERP reports
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {reportMetrics.map((metric, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {metric.label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: metric.color, fontWeight: 'bold' }}
                >
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Report Generator */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <h2 style={{ color: "#000" }}>Generate Report</h2>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                label="Report Type"
              >
                <MenuItem value="student">Student Report</MenuItem>
                <MenuItem value="teacher">Teacher Report</MenuItem>
                <MenuItem value="attendance">Attendance Report</MenuItem>
                <MenuItem value="finance">Finance Report</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleGenerateReport}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Report Results */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {reportData && !loading && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <h2 style={{ color: "#000" }}>{reportData.title}</h2>
              <Typography variant="body2" color="textSecondary">
                {reportData.startDate} to {reportData.endDate}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadReport}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrintReport}
              >
                Print
              </Button>
            </Box>
          </Box>

          <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Records Found</Typography>
                <Typography variant="h6">{reportData.records}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Summary</Typography>
                <Typography variant="body2">{reportData.summary}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Report Details
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Detailed report data would be displayed here in a table or chart format.
              This is a template for the reports module that can be extended with actual
              data visualization and more comprehensive reporting features.
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default Reports;
