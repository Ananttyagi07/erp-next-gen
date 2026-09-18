import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { Translate as TranslateIcon } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import apiService from '../../services/apiService';

const LanguageSettings = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    language: 'en',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  ];

  // Fetch current language settings
  useEffect(() => {
    const fetchLanguageSettings = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('/admin-settings/general/');
        const data = response.data.data;
        setFormData({
          language: data.language || 'en',
        });
      } catch (err) {
        console.error('Failed to fetch language settings:', err);
        setError('Failed to load language settings');
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleLanguageSelect = (languageCode) => {
    setFormData({ language: languageCode });
    setError(null);
  };

  const { updateTheme, currentTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      // Use ThemeContext's updateTheme which handles language change and i18n sync
      await updateTheme(currentTheme, false, formData.language);

      console.log('Language settings updated and applied');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save language settings:', err);
      setError(
        err.response?.data?.message ||
        'Failed to save language settings. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const getCurrentLanguage = languages.find(l => l.code === formData.language);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <TranslateIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {t('languageSettings')}
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{t('languageSettings')} saved successfully!</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Current Language Selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t('selectLanguage')}</InputLabel>
                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  label={t('selectLanguage')}
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Language Preview */}
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {t('currentLanguage')}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: 24 }}>
                    {getCurrentLanguage?.flag}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {getCurrentLanguage?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Language Selection Cards */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                {t('selectLanguage')}:
              </Typography>
              <Grid container spacing={2}>
                {languages.map((lang) => (
                  <Grid item xs={12} sm={6} md={4} key={lang.code}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: formData.language === lang.code ? '2px solid' : '1px solid',
                        borderColor: formData.language === lang.code ? 'primary.main' : 'divider',
                        backgroundColor: formData.language === lang.code ? 'action.selected' : 'background.paper',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: 3,
                          borderColor: 'primary.main',
                        },
                      }}
                      onClick={() => handleLanguageSelect(lang.code)}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 3 }}>
                        <Typography variant="h5" sx={{ fontSize: 32, mb: 1 }}>
                          {lang.flag}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {lang.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Code: {lang.code}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Information Box */}
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>{t('note')}:</strong> {t('noteLanguageSettings')}
                </Typography>
              </Alert>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving}
                  sx={{ minWidth: 120 }}
                >
                  {saving ? <CircularProgress size={24} /> : t('save')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LanguageSettings;
