import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login: authLogin, isLoading, user } = useAuth();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = t('emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('invalidEmailFormat');
    }

    if (!formData.password) {
      errors.password = t('passwordRequired');
    } else if (formData.password.length < 6) {
      errors.password = t('passwordMinLength');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setError(null);
      console.log('[Login Form] Submitting login request...');
      const result = await authLogin(formData.email, formData.password);

      console.log('[Login Form] Login result:', result);

      // Check if MFA is required
      if (result.mfaRequired) {
        console.log('[Login Form] MFA required, redirecting...');
        // Navigate to MFA page (will be implemented in Phase 5)
        navigate('/mfa-verify', {
          state: { sessionId: result.sessionId, message: result.message }
        });
        return;
      }

      // Navigate to dashboard on successful login
      console.log('[Login Form] Login successful, redirecting to dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('[Login Form] Login error:', error);

      let errorMessage = t('loginFailed');

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        console.error('[Login Form] Server error:', error.response.status, error.response.data);
        errorMessage = error.response.data?.message ||
                      error.response.data?.detail ||
                      `${t('serverError')}: ${error.response.status}`;
      } else if (error.request) {
        // Request made but no response
        console.error('[Login Form] No server response');
        errorMessage = t('noServerConnection');
      } else {
        // Error setting up request
        console.error('[Login Form] Request setup error:', error.message);
        errorMessage = error.message || 'An unexpected error occurred';
      }

      setError(errorMessage);
    }
  };

  return (
    <Box
      className="animated-gradient-bg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient floating shapes (sharp-edged, no rounded blobs) */}
      <Box
        className="float-blob"
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-6%',
          width: 340,
          height: 340,
          background: 'rgba(255,255,255,0.08)',
          transform: 'rotate(20deg)',
          pointerEvents: 'none',
        }}
      />
      <Box
        className="float-blob"
        sx={{
          position: 'absolute',
          bottom: '-12%',
          right: '-8%',
          width: 420,
          height: 420,
          background: 'rgba(255,255,255,0.06)',
          transform: 'rotate(-15deg)',
          animationDelay: '2.5s',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <Paper
              elevation={8}
              sx={{
                p: 4,
                borderTop: (theme) => `4px solid ${theme.palette.primary.main}`,
                boxShadow: '0 24px 60px -20px rgba(0,0,0,0.35)',
              }}
            >
              {/* Logo / Title */}
              <motion.div variants={itemVariants}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
                  >
                    {t('erp_system')}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                    {t('university_management')}
                  </Typography>
                </Box>
              </motion.div>

              <form onSubmit={handleSubmit}>
                {/* Error Alert */}
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  </motion.div>
                )}

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label={t('emailAddress')}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(validationErrors.email)}
                    helperText={validationErrors.email}
                    disabled={isLoading}
                    margin="normal"
                    placeholder="your.email@example.com"
                    autoComplete="off"
                    inputProps={{ autoComplete: 'off' }}
                    autoFocus
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label={t('password')}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(validationErrors.password)}
                    helperText={validationErrors.password}
                    disabled={isLoading}
                    margin="normal"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    inputProps={{ autoComplete: 'new-password' }}
                  />
                </motion.div>

                {/* Remember Me */}
                <motion.div variants={itemVariants}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    }
                    label={t('rememberMe')}
                    sx={{ mt: 1 }}
                  />
                </motion.div>

                {/* Login Button */}
                <motion.div variants={itemVariants} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isLoading}
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : t('loginButton')}
                  </Button>
                </motion.div>

                {/* Forgot Password Link */}
                <motion.div variants={itemVariants}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2">
                      <a href="#forgot" style={{ color: '#667eea', textDecoration: 'none' }}>
                        {t('forgotPassword')}
                      </a>
                    </Typography>
                  </Box>
                </motion.div>
              </form>
            </Paper>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mt: 3, color: 'white' }}>
              <Typography variant="caption">
                {t('copyright')}
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;
