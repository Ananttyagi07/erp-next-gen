import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSchool } from '../../context/useSchool';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Lock as LockIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import apiService from '../../services/apiService';

const RolePermission = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedSchool } = useSchool();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [permissionsByModule, setPermissionsByModule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState(new Set());
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);


  const fetchRoles = async (schoolId = selectedSchool) => {
    try {
      setLoading(true);
      // Build URL with college filter if selected
      let url = '/roles/roles/';
      if (schoolId) {
        url += `?college_id=${schoolId}`;
      }
      const response = await apiService.get(url);
      const rolesData = response.data.results || response.data.data || response.data || [];
      setRoles(Array.isArray(rolesData) ? rolesData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  // Refetch roles when school selection changes
  useEffect(() => {
    if (selectedSchool !== '') {
      fetchRoles(selectedSchool);
    }
  }, [selectedSchool]);

  const fetchPermissions = async () => {
    try {
      const response = await apiService.get('/roles/permissions/grouped/');
      const data = response.data.data || response.data || {};
      setPermissionsByModule(data.permissions_by_module || []);

      // Flatten permissions for easier lookup
      const allPermissions = [];
      (data.permissions_by_module || []).forEach(mod => {
        mod.permissions?.forEach(perm => {
          allPermissions.push({ ...perm, module: mod.module });
        });
      });
      setPermissions(allPermissions);
    } catch (err) {
      console.error('Error fetching permissions:', err);
      setError('Failed to load permissions');
    }
  };

  const loadRolePermissions = async (roleId) => {
    try {
      const response = await apiService.get(`/roles/roles/${roleId}/permissions/`);
      const data = response.data.data || response.data;

      // Extract assigned permission IDs
      const assignedIds = new Set();
      (data.permissions_by_module || []).forEach(mod => {
        mod.permissions?.forEach(perm => {
          if (perm.is_assigned) {
            assignedIds.add(perm.id);
          }
        });
      });

      setSelectedPermissions(assignedIds);

      // Initialize expanded modules with permissions
      const expandedSet = new Set();
      (data.permissions_by_module || []).forEach(mod => {
        if (mod.permissions?.some(p => p.is_assigned)) {
          expandedSet.add(mod.module);
        }
      });
      setExpandedModules(expandedSet);
    } catch (err) {
      console.error('Error loading role permissions:', err);
      setError('Failed to load role permissions');
    }
  };

  const handleRoleSelect = (role) => {
    navigate(`/admin/role-permission/${role.id}/checklist`);
  };

  const handlePermissionToggle = (permissionId) => {
    const newPermissions = new Set(selectedPermissions);
    if (newPermissions.has(permissionId)) {
      newPermissions.delete(permissionId);
    } else {
      newPermissions.add(permissionId);
    }
    setSelectedPermissions(newPermissions);
  };

  const handleModuleToggle = (module) => {
    const modulePermissions = permissionsByModule
      .find(m => m.module === module)?.permissions || [];

    const allModulePermissionsSelected = modulePermissions.every(p =>
      selectedPermissions.has(p.id)
    );

    const newPermissions = new Set(selectedPermissions);

    if (allModulePermissionsSelected) {
      // Deselect all permissions in module
      modulePermissions.forEach(p => newPermissions.delete(p.id));
    } else {
      // Select all permissions in module
      modulePermissions.forEach(p => newPermissions.add(p.id));
    }

    setSelectedPermissions(newPermissions);
  };

  const handleToggleModule = (module) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(module)) {
      newExpanded.delete(module);
    } else {
      newExpanded.add(module);
    }
    setExpandedModules(newExpanded);
  };

  const handleSavePermissions = async () => {
    try {
      const permissionIds = Array.from(selectedPermissions);

      await apiService.put(`/roles/roles/${selectedRole.id}/permissions/`, {
        permission_ids: permissionIds,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setDialogOpen(false);
      fetchRoles();
    } catch (err) {
      console.error('Error saving permissions:', err);
      setError('Failed to save permissions');
    }
  };

  const handleSelectAll = () => {
    const allPermissionIds = new Set(permissions.map(p => p.id));
    setSelectedPermissions(allPermissionIds);
  };

  const handleDeselectAll = () => {
    setSelectedPermissions(new Set());
  };

  const filteredPermissionsByModule = permissionsByModule
    .map(module => ({
      ...module,
      permissions: (module.permissions || []).filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(module => module.permissions.length > 0);

  const getModulePermissionStats = (module) => {
    const permissions = permissionsByModule.find(m => m.module === module)?.permissions || [];
    const assigned = permissions.filter(p => selectedPermissions.has(p.id)).length;
    return { assigned, total: permissions.length };
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Permissions saved successfully!
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Header Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LockIcon sx={{ fontSize: 32, color: '#667eea' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {t('rolePermission')}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Manage permissions assigned to each role. Customize access control for different user roles in the system.
        </Typography>
      </Paper>

      {/* Roles Selection Table */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Role Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Assigned Permissions</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress size={32} />
                  </TableCell>
                </TableRow>
              ) : roles.length > 0 ? (
                roles.map(role => (
                  <TableRow key={role.id} hover>
                    <TableCell sx={{ fontWeight: '500' }}>{role.name}</TableCell>
                    <TableCell>{role.description || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={role.is_default ? 'System Role' : 'Custom'}
                        size="small"
                        variant={role.is_default ? 'filled' : 'outlined'}
                        color={role.is_default ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${role.permissions_count || 0} permissions`}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Manage Permissions">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleRoleSelect(role)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                    No roles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Permission Management Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="lg" fullWidth sx={{ '& .MuiDialog-paper': { height: '90vh' } }}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LockIcon color="primary" />
            <Box>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Manage Permissions: <strong>{selectedRole?.name}</strong>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {selectedRole?.description}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={() => setDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column' }}>
          {/* Search and Action Buttons */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              size="small"
              placeholder="Search permissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'gray' }} />,
              }}
              sx={{ flex: 1 }}
            />
            <Button size="small" variant="contained" color="success" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button size="small" variant="outlined" onClick={handleDeselectAll}>
              Clear All
            </Button>
          </Stack>

          {/* Permission Count Summary */}
          <Paper sx={{ mb: 2, p: 1.5, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">
              <strong>Total Selected:</strong> {selectedPermissions.size} / {permissions.length} permissions
            </Typography>
            <Box>
              {selectedPermissions.size > 0 && (
                <Chip label={`${Math.round((selectedPermissions.size / permissions.length) * 100)}%`} size="small" color="primary" />
              )}
            </Box>
          </Paper>

          {/* Permissions Grouped by Module - Table Format */}
          <Box sx={{ flex: 1, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: 1 }}>
            {filteredPermissionsByModule.length > 0 ? (
              filteredPermissionsByModule.map(module => {
                const stats = getModulePermissionStats(module.module);
                const isExpanded = expandedModules.has(module.module);

                return (
                  <Box key={module.module}>
                    {/* Module Header */}
                    <Box
                      onClick={() => handleToggleModule(module.module)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1.5,
                        backgroundColor: '#f9f9f9',
                        borderBottom: '1px solid #e0e0e0',
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                      }}
                    >
                      <ExpandMoreIcon
                        sx={{
                          transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.3s',
                        }}
                      />
                      <Checkbox
                        checked={
                          module.permissions.length > 0 &&
                          module.permissions.every(p => selectedPermissions.has(p.id))
                        }
                        indeterminate={
                          module.permissions.length > 0 &&
                          module.permissions.some(p => selectedPermissions.has(p.id)) &&
                          !module.permissions.every(p => selectedPermissions.has(p.id))
                        }
                        onChange={() => handleModuleToggle(module.module)}
                        onClick={(e) => e.stopPropagation()}
                        size="small"
                      />
                      <Typography sx={{ fontWeight: 'bold', flex: 1, textTransform: 'capitalize' }}>
                        {module.module_name || module.module}
                      </Typography>
                      <Chip
                        label={`${stats.assigned}/${stats.total}`}
                        size="small"
                        variant="outlined"
                        color={stats.assigned === stats.total ? 'success' : 'default'}
                      />
                    </Box>

                    {/* Module Permissions */}
                    {isExpanded && (
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: '#fafafa' }}>
                              <TableCell sx={{ width: '5%' }}></TableCell>
                              <TableCell sx={{ width: '45%', fontWeight: 'bold' }}>Permission</TableCell>
                              <TableCell sx={{ width: '50%', fontWeight: 'bold' }}>Description</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {module.permissions.map(permission => (
                              <TableRow
                                key={permission.id}
                                hover
                                sx={{
                                  backgroundColor: selectedPermissions.has(permission.id)
                                    ? '#e3f2fd'
                                    : 'transparent',
                                }}
                              >
                                <TableCell sx={{ width: '5%', p: 1 }}>
                                  <Checkbox
                                    checked={selectedPermissions.has(permission.id)}
                                    onChange={() => handlePermissionToggle(permission.id)}
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell sx={{ width: '45%' }}>
                                  <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                    {permission.name}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    {permission.codename}
                                  </Typography>
                                </TableCell>
                                <TableCell sx={{ width: '50%' }}>
                                  <Typography variant="caption">
                                    {permission.description || '-'}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                );
              })
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
                No permissions found matching "{searchTerm}"
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSavePermissions}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save Permissions
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RolePermission;
