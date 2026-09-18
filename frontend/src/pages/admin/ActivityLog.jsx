import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import apiService from '../../services/apiService';

const ActivityLog = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filterModule, setFilterModule] = useState('');

  useEffect(() => {
    fetchActivityLogs();
  }, [page, pageSize, filterModule]);

  const fetchActivityLogs = async () => {
    try {
      setLoading(true);
      const params = { page, page_size: pageSize };
      if (filterModule) {
        params.module = filterModule;
      }

      const response = await apiService.get('/admin-settings/activity-logs/', { params });
      if (response.data.success) {
        setActivityLogs(response.data.data);
        setTotalPages(response.data.pagination?.pages || 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load activity logs');
      console.error('Error fetching activity logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (log) => {
    setSelectedLog(log);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLog(null);
  };

  const getActionColor = (action) => {
    const colors = {
      'create': 'success',
      'update': 'info',
      'delete': 'error',
      'login': 'warning',
      'logout': 'default',
      'export': 'primary',
      'import': 'secondary'
    };
    return colors[action] || 'default';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader
          title="Activity Log"
          subheader="View system activity and user actions"
        />
        <CardContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Filter Section */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Filter by Module"
              value={filterModule}
              onChange={(e) => {
                setFilterModule(e.target.value);
                setPage(1);
              }}
              placeholder="e.g., Students, Finance"
              size="small"
              sx={{ minWidth: '200px' }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                setFilterModule('');
                setPage(1);
              }}
            >
              Clear Filter
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Date & Time</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Module</TableCell>
                <TableCell>User</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No activity logs found
                  </TableCell>
                </TableRow>
              ) : (
                activityLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(log.created_at).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={log.action_type.toUpperCase()}
                        color={getActionColor(log.action_type)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {log.module}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {log.user_name || log.user || 'System'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {log.ip_address || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewDetail(log)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3, alignItems: 'center' }}>
            <Button
              variant="outlined"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Typography variant="body2">
              Page {page} of {totalPages}
            </Typography>
            <Button
              variant="outlined"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
            <TextField
              label="Page Size"
              type="number"
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value));
                setPage(1);
              }}
              inputProps={{ min: 5, max: 100 }}
              size="small"
              sx={{ width: '100px' }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Activity Log Details</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedLog && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Action</Typography>
                  <Chip
                    label={selectedLog.action_type.toUpperCase()}
                    color={getActionColor(selectedLog.action_type)}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Date & Time</Typography>
                  <Typography variant="body2">
                    {new Date(selectedLog.created_at).toLocaleString()}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Module</Typography>
                  <Typography variant="body2">{selectedLog.module}</Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">User</Typography>
                  <Typography variant="body2">
                    {selectedLog.user_name || selectedLog.user || 'System'}
                  </Typography>
                </Box>
              </Grid>

              {selectedLog.user_email && (
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">User Email</Typography>
                    <Typography variant="body2">{selectedLog.user_email}</Typography>
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">Description</Typography>
                  <Typography variant="body2">{selectedLog.action_description}</Typography>
                </Box>
              </Grid>

              {selectedLog.object_name && (
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Affected Object</Typography>
                    <Typography variant="body2">
                      {selectedLog.object_name} (ID: {selectedLog.object_id})
                    </Typography>
                  </Box>
                </Grid>
              )}

              {selectedLog.ip_address && (
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">IP Address</Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {selectedLog.ip_address}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {selectedLog.user_agent && (
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">User Agent</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-word' }}>
                      {selectedLog.user_agent}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivityLog;
