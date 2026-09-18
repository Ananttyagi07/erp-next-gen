/**
 * ManageLanguage Component
 * Allows admin users to manage system languages, create custom languages, and manage translations/labels
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Chip,
  Grid,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  InputAdornment,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Translate as TranslateIcon,
} from '@mui/icons-material';
import languageService from '../../services/languageService';

const ManageLanguage = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState(0);

  // Languages list state
  const [languages, setLanguages] = useState([]);
  const [languagesLoading, setLanguagesLoading] = useState(false);
  const [languagesPage, setLanguagesPage] = useState(0);
  const [languagesRowsPerPage, setLanguagesRowsPerPage] = useState(10);
  const [languagesTotal, setLanguagesTotal] = useState(0);
  const [languageSearch, setLanguageSearch] = useState('');
  const [filterActive, setFilterActive] = useState(null);
  const [filterDefault, setFilterDefault] = useState(null);
  const [filterCustom, setFilterCustom] = useState(null);

  // Labels list state
  const [labels, setLabels] = useState([]);
  const [labelsLoading, setLabelsLoading] = useState(false);
  const [labelsPage, setLabelsPage] = useState(0);
  const [labelsRowsPerPage, setLabelsRowsPerPage] = useState(10);
  const [labelsTotal, setLabelsTotal] = useState(0);
  const [labelSearch, setLabelSearch] = useState('');
  const [selectedLanguageForLabels, setSelectedLanguageForLabels] = useState('');

  // Dialog states
  const [addLanguageOpen, setAddLanguageOpen] = useState(false);
  const [editLanguageOpen, setEditLanguageOpen] = useState(false);
  const [deleteLanguageOpen, setDeleteLanguageOpen] = useState(false);
  const [addLabelOpen, setAddLabelOpen] = useState(false);
  const [editLabelOpen, setEditLabelOpen] = useState(false);
  const [deleteLabelOpen, setDeleteLabelOpen] = useState(false);

  // Form states
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    base_language: 'en',
    is_active: true,
    rtl_support: false,
    description: '',
  });
  const [labelFormData, setLabelFormData] = useState({
    language: '',
    label_key: '',
    label_value: '',
    description: '',
  });

  // Alert states
  const [alert, setAlert] = useState(null);

  // Fetch languages
  const fetchLanguages = async (page = 0, search = '') => {
    setLanguagesLoading(true);
    try {
      const params = {
        page: page + 1,
        page_size: languagesRowsPerPage,
        search: search,
      };

      if (filterActive !== null) {
        params.is_active = filterActive;
      }
      if (filterDefault !== null) {
        params.is_default = filterDefault;
      }
      if (filterCustom !== null) {
        params.is_custom = filterCustom;
      }

      console.log('Fetching languages with params:', params);
      const response = await languageService.getLanguages(params);
      console.log('Languages response:', response);

      if (response.success) {
        setLanguages(response.data);
        setLanguagesTotal(response.pagination?.total || 0);
        console.log('Languages loaded:', response.data.length);
      } else {
        setAlert({ type: 'error', message: response.message || 'Failed to fetch languages' });
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
      setAlert({ type: 'error', message: error.message || 'Failed to fetch languages' });
    } finally {
      setLanguagesLoading(false);
    }
  };

  // Fetch labels
  const fetchLabels = async (page = 0, search = '') => {
    setLabelsLoading(true);
    try {
      const params = {
        page: page + 1,
        page_size: labelsRowsPerPage,
        search: search,
      };

      if (selectedLanguageForLabels) {
        params.language_id = selectedLanguageForLabels;
      }

      const response = await languageService.getLanguageLabels(params);
      if (response.success) {
        setLabels(response.data);
        setLabelsTotal(response.pagination?.total || 0);
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch labels' });
    } finally {
      setLabelsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    console.log('ManageLanguage component mounted, fetching languages...');
    fetchLanguages(0, '');
  }, []);

  // Refetch when filters change
  useEffect(() => {
    if (activeTab === 0) {
      console.log('Filters changed, refetching languages');
      fetchLanguages(languagesPage, languageSearch);
    }
  }, [filterActive, filterDefault, filterCustom, languagesRowsPerPage, activeTab]);

  // Fetch labels when tab changes or language is selected
  useEffect(() => {
    if (activeTab === 1) {
      console.log('Labels tab active, fetching labels');
      fetchLabels(labelsPage, labelSearch);
    }
  }, [selectedLanguageForLabels, labelsRowsPerPage, activeTab]);

  // Handle language creation
  const handleCreateLanguage = async () => {
    try {
      const response = await languageService.createLanguage(formData);
      if (response.success) {
        setAlert({ type: 'success', message: 'Language created successfully' });
        setAddLanguageOpen(false);
        setFormData({
          code: '',
          name: '',
          base_language: 'en',
          is_active: true,
          rtl_support: false,
          description: '',
        });
        fetchLanguages();
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to create language' });
    }
  };

  // Handle language update
  const handleUpdateLanguage = async () => {
    try {
      const response = await languageService.updateLanguage(selectedLanguage.id, formData);
      if (response.success) {
        setAlert({ type: 'success', message: 'Language updated successfully' });
        setEditLanguageOpen(false);
        fetchLanguages(languagesPage);
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update language' });
    }
  };

  // Handle language deletion
  const handleDeleteLanguage = async () => {
    try {
      const response = await languageService.deleteLanguage(selectedLanguage.id);
      if (response.success) {
        setAlert({ type: 'success', message: 'Language deleted successfully' });
        setDeleteLanguageOpen(false);
        fetchLanguages();
      }
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to delete language' });
    }
  };

  // Handle label creation
  const handleCreateLabel = async () => {
    try {
      const response = await languageService.createLanguageLabel(labelFormData);
      if (response.success) {
        setAlert({ type: 'success', message: 'Label created successfully' });
        setAddLabelOpen(false);
        setLabelFormData({
          language: '',
          label_key: '',
          label_value: '',
          description: '',
        });
        fetchLabels();
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to create label' });
    }
  };

  // Handle label update
  const handleUpdateLabel = async () => {
    try {
      const response = await languageService.updateLanguageLabel(selectedLabel.id, labelFormData);
      if (response.success) {
        setAlert({ type: 'success', message: 'Label updated successfully' });
        setEditLabelOpen(false);
        fetchLabels(labelsPage);
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update label' });
    }
  };

  // Handle label deletion
  const handleDeleteLabel = async () => {
    try {
      const response = await languageService.deleteLanguageLabel(selectedLabel.id);
      if (response.success) {
        setAlert({ type: 'success', message: 'Label deleted successfully' });
        setDeleteLabelOpen(false);
        fetchLabels();
      }
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to delete label' });
    }
  };

  // Handle edit language button
  const handleEditLanguage = (language) => {
    setSelectedLanguage(language);
    setFormData({
      code: language.code,
      name: language.name,
      base_language: language.base_language,
      is_active: language.is_active,
      rtl_support: language.rtl_support,
      description: language.description,
    });
    setEditLanguageOpen(true);
  };

  // Handle edit label button
  const handleEditLabel = (label) => {
    setSelectedLabel(label);
    setLabelFormData({
      language: label.language,
      label_key: label.label_key,
      label_value: label.label_value,
      description: label.description,
    });
    setEditLabelOpen(true);
  };

  // Handle search
  const handleLanguageSearch = (value) => {
    setLanguageSearch(value);
    setLanguagesPage(0);
    fetchLanguages(0, value);
  };

  const handleLabelSearch = (value) => {
    setLabelSearch(value);
    setLabelsPage(0);
    fetchLabels(0, value);
  };

  return (
    <Box sx={{ p: 2 }}>
      {alert && (
        <Alert
          severity={alert.type}
          onClose={() => setAlert(null)}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      )}

      <Card>
        <CardHeader
          title="Language Management"
          avatar={<TranslateIcon sx={{ width: 32, height: 32, color: 'primary.main' }} />}
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Refresh">
                <IconButton onClick={() => activeTab === 0 ? fetchLanguages() : fetchLabels()}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />

        <CardContent>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Languages" />
            <Tab label="Translations / Labels" />
          </Tabs>

          {/* Languages Tab */}
          {activeTab === 0 && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    placeholder="Search languages..."
                    value={languageSearch}
                    onChange={(e) => handleLanguageSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setFormData({
                        code: '',
                        name: '',
                        base_language: 'en',
                        is_active: true,
                        rtl_support: false,
                        description: '',
                      });
                      setAddLanguageOpen(true);
                    }}
                  >
                    Add Language
                  </Button>
                </Grid>
              </Grid>

              {/* Filters */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterActive === true}
                        onChange={(e) => setFilterActive(e.target.checked ? true : null)}
                      />
                    }
                    label="Active Only"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterDefault === true}
                        onChange={(e) => setFilterDefault(e.target.checked ? true : null)}
                      />
                    }
                    label="Default Languages"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterCustom === true}
                        onChange={(e) => setFilterCustom(e.target.checked ? true : null)}
                      />
                    }
                    label="Custom Languages"
                  />
                </Grid>
              </Grid>

              {languagesLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell>Code</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Base Language</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">RTL</TableCell>
                          <TableCell align="center">Labels</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {languages.length > 0 ? (
                          languages.map((language) => (
                            <TableRow key={language.id} hover>
                              <TableCell sx={{ fontWeight: 500 }}>{language.code}</TableCell>
                              <TableCell>{language.name}</TableCell>
                              <TableCell>{language.base_language}</TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={language.is_active ? 'Active' : 'Inactive'}
                                  color={language.is_active ? 'success' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={language.is_default ? 'Default' : 'Custom'}
                                  variant={language.is_default ? 'filled' : 'outlined'}
                                  color={language.is_default ? 'primary' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell align="center">
                                {language.rtl_support ? '✓' : '-'}
                              </TableCell>
                              <TableCell align="center">
                                {language.label_count || 0}
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="Edit">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleEditLanguage(language)}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                {language.is_custom && (
                                  <Tooltip title="Delete">
                                    <IconButton
                                      size="small"
                                      onClick={() => {
                                        setSelectedLanguage(language);
                                        setDeleteLanguageOpen(true);
                                      }}
                                      color="error"
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                              No languages found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={languagesTotal}
                    rowsPerPage={languagesRowsPerPage}
                    page={languagesPage}
                    onPageChange={(e, newPage) => {
                      setLanguagesPage(newPage);
                      fetchLanguages(newPage);
                    }}
                    onRowsPerPageChange={(e) => {
                      setLanguagesRowsPerPage(parseInt(e.target.value, 10));
                      setLanguagesPage(0);
                    }}
                  />
                </>
              )}
            </Box>
          )}

          {/* Labels Tab */}
          {activeTab === 1 && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Select Language</InputLabel>
                    <Select
                      value={selectedLanguageForLabels}
                      onChange={(e) => {
                        setSelectedLanguageForLabels(e.target.value);
                        setLabelsPage(0);
                      }}
                      label="Select Language"
                    >
                      <MenuItem value="">All Languages</MenuItem>
                      {languages.map((lang) => (
                        <MenuItem key={lang.id} value={lang.id}>
                          {lang.name} ({lang.code})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    placeholder="Search labels..."
                    value={labelSearch}
                    onChange={(e) => handleLabelSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setLabelFormData({
                        language: selectedLanguageForLabels || '',
                        label_key: '',
                        label_value: '',
                        description: '',
                      });
                      setAddLabelOpen(true);
                    }}
                    disabled={!selectedLanguageForLabels}
                  >
                    Add Label
                  </Button>
                </Grid>
              </Grid>

              {labelsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                          <TableCell>Language</TableCell>
                          <TableCell>Label Key</TableCell>
                          <TableCell>Label Value</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell align="center">System</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {labels.length > 0 ? (
                          labels.map((label) => (
                            <TableRow key={label.id} hover>
                              <TableCell>{label.language_name}</TableCell>
                              <TableCell sx={{ fontFamily: 'monospace' }}>
                                {label.label_key}
                              </TableCell>
                              <TableCell sx={{ maxWidth: 300 }}>
                                {label.label_value}
                              </TableCell>
                              <TableCell>{label.description}</TableCell>
                              <TableCell align="center">
                                {label.is_system ? '✓' : '-'}
                              </TableCell>
                              <TableCell align="center">
                                {!label.is_system && (
                                  <>
                                    <Tooltip title="Edit">
                                      <IconButton
                                        size="small"
                                        onClick={() => handleEditLabel(label)}
                                      >
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                      <IconButton
                                        size="small"
                                        onClick={() => {
                                          setSelectedLabel(label);
                                          setDeleteLabelOpen(true);
                                        }}
                                        color="error"
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                              No labels found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={labelsTotal}
                    rowsPerPage={labelsRowsPerPage}
                    page={labelsPage}
                    onPageChange={(e, newPage) => {
                      setLabelsPage(newPage);
                      fetchLabels(newPage);
                    }}
                    onRowsPerPageChange={(e) => {
                      setLabelsRowsPerPage(parseInt(e.target.value, 10));
                      setLabelsPage(0);
                    }}
                  />
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Add Language Dialog */}
      <Dialog open={addLanguageOpen} onClose={() => setAddLanguageOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Custom Language</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Instructions to Create Language:</strong>
            <br />
            1. Create your language with No Space, No Capital Letter, No Special Character
            <br />
            2. Create translation file (optional)
            <br />
            3. Update labels for this language
            <br />
            4. Activate when ready to use
          </Alert>

          <TextField
            fullWidth
            label="Language Code"
            placeholder="e.g., es, pt, ja"
            value={formData.code}
            onChange={(e) => {
              const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/\s+/g, '');
              setFormData({ ...formData, code: value });
            }}
            margin="normal"
            helperText="Use lowercase letters, numbers, and hyphens only. Examples: es, pt, zh-cn"
            error={formData.code !== '' && /[^a-z0-9-]/.test(formData.code)}
          />

          <TextField
            fullWidth
            label="Language Name"
            placeholder="e.g., Spanish, Portuguese, Japanese"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            helperText="Full name of the language as it will appear in dropdowns"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Base Language for Fallback</InputLabel>
            <Select
              value={formData.base_language}
              onChange={(e) => setFormData({ ...formData, base_language: e.target.value })}
              label="Base Language for Fallback"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">Hindi</MenuItem>
              <MenuItem value="ur">Urdu</MenuItem>
              <MenuItem value="ar">Arabic</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Description"
            placeholder="e.g., Spanish language for Spain and Latin America"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
            helperText="Optional: Add notes about this language variant"
          />

          <Box sx={{ mt: 3, mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.rtl_support}
                  onChange={(e) => setFormData({ ...formData, rtl_support: e.target.checked })}
                />
              }
              label="Right-to-Left (RTL) Support"
            />
            <Typography variant="caption" display="block" sx={{ ml: 4, color: 'text.secondary' }}>
              Enable for languages like Arabic, Urdu, Hebrew
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
            }
            label="Activate Immediately"
          />
          <Typography variant="caption" display="block" sx={{ ml: 4, color: 'text.secondary' }}>
            You can enable/disable this language later
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddLanguageOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreateLanguage}
            variant="contained"
            disabled={!formData.code || !formData.name}
          >
            Create Language
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Language Dialog */}
      <Dialog open={editLanguageOpen} onClose={() => setEditLanguageOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Language</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Language Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Language Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
            }
            label="Active"
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rtl_support}
                onChange={(e) => setFormData({ ...formData, rtl_support: e.target.checked })}
              />
            }
            label="RTL Support"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditLanguageOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateLanguage} variant="contained">
            Update Language
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Language Dialog */}
      <Dialog open={deleteLanguageOpen} onClose={() => setDeleteLanguageOpen(false)}>
        <DialogTitle>Delete Language</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the language "{selectedLanguage?.name}"?
          <br />
          <strong>Note:</strong> System languages cannot be deleted if they are in use.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteLanguageOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteLanguage} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Label Dialog */}
      <Dialog open={addLabelOpen} onClose={() => setAddLabelOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Label</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Language</InputLabel>
            <Select
              value={labelFormData.language}
              onChange={(e) => setLabelFormData({ ...labelFormData, language: e.target.value })}
              label="Language"
            >
              {languages.map((lang) => (
                <MenuItem key={lang.id} value={lang.id}>
                  {lang.name} ({lang.code})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Label Key"
            placeholder="e.g., btn_submit, msg_welcome"
            value={labelFormData.label_key}
            onChange={(e) => setLabelFormData({ ...labelFormData, label_key: e.target.value })}
            margin="normal"
            helperText="Unique identifier for this label"
          />
          <TextField
            fullWidth
            label="Label Value"
            placeholder="Translated text"
            value={labelFormData.label_value}
            onChange={(e) => setLabelFormData({ ...labelFormData, label_value: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Description"
            placeholder="What is this label used for?"
            value={labelFormData.description}
            onChange={(e) => setLabelFormData({ ...labelFormData, description: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddLabelOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateLabel} variant="contained">
            Create Label
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Label Dialog */}
      <Dialog open={editLabelOpen} onClose={() => setEditLabelOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Label</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Label Key"
            value={labelFormData.label_key}
            onChange={(e) => setLabelFormData({ ...labelFormData, label_key: e.target.value })}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="Label Value"
            value={labelFormData.label_value}
            onChange={(e) => setLabelFormData({ ...labelFormData, label_value: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Description"
            value={labelFormData.description}
            onChange={(e) => setLabelFormData({ ...labelFormData, description: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditLabelOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateLabel} variant="contained">
            Update Label
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Label Dialog */}
      <Dialog open={deleteLabelOpen} onClose={() => setDeleteLabelOpen(false)}>
        <DialogTitle>Delete Label</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the label "{selectedLabel?.label_key}"?
          <br />
          <strong>Note:</strong> System labels cannot be deleted.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteLabelOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteLabel} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageLanguage;
