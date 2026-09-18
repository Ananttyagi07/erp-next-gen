import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import collegesService from '../../services/colleges';

const TemplateForm = ({
  template,
  onSubmit,
  onCancel,
  loading,
  type = 'sms', // 'sms' or 'email'
}) => {
  const dispatch = useDispatch();
  const [schools, setSchools] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [formData, setFormData] = useState({
    college: '',
    template_type: 'general',
    name: '',
    subject: '', // Only for email
    content: '',
    is_active: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await collegesService.getColleges();
        if (response.success) {
          setSchools(response.data);
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    if (template) {
      setFormData({
        college: template.college || '',
        template_type: template.template_type || 'general',
        name: template.name || '',
        subject: template.subject || '', // Only for email
        content: template.content || '',
        is_active: template.is_active ?? true,
      });
    } else {
      setFormData({
        college: '',
        template_type: 'general',
        name: '',
        subject: '', // Only for email
        content: '',
        is_active: true,
      });
    }
  }, [template]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.college) {
      newErrors.college = 'School is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Template name is required';
    }

    if (type === 'email' && !formData.subject.trim()) {
      newErrors.subject = 'Email subject is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Template content is required';
    }

    if (type === 'sms' && formData.content.length > 160) {
      newErrors.content = 'SMS content cannot exceed 160 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const availableTags = [
    '{name}', '{email}', '{phone}', '{school}', '{class}',
    '{section}', '{roll}', '{subject}', '{date}', '{time}'
  ];

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth error={!!errors.college}>
          <InputLabel>School Name *</InputLabel>
          <Select
            value={formData.college}
            onChange={(e) => handleChange('college', e.target.value)}
            label="School Name *"
          >
            {schools.map((school) => (
              <MenuItem key={school.id} value={school.id}>
                {school.name}
              </MenuItem>
            ))}
          </Select>
          {errors.college && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
              {errors.college}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Receiver Type *</InputLabel>
          <Select
            value={formData.template_type}
            onChange={(e) => handleChange('template_type', e.target.value)}
            label="Receiver Type *"
          >
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="admission">Admission</MenuItem>
            <MenuItem value="fee">Fee</MenuItem>
            <MenuItem value="attendance">Attendance</MenuItem>
            <MenuItem value="exam">Exam</MenuItem>
            <MenuItem value="holiday">Holiday</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label={type === 'email' ? 'Email Subject' : 'Template Name'}
          value={type === 'email' ? formData.subject : formData.name}
          onChange={(e) => handleChange(type === 'email' ? 'subject' : 'name', e.target.value)}
          error={!!errors[type === 'email' ? 'subject' : 'name']}
          helperText={errors[type === 'email' ? 'subject' : 'name']}
          required
        />

        <TextField
          fullWidth
          label={type === 'email' ? 'Email Content' : 'SMS Content'}
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          error={!!errors.content}
          helperText={
            errors.content ||
            (type === 'sms' ? `${formData.content.length}/160 characters` : '')
          }
          multiline
          rows={type === 'email' ? 6 : 4}
          required
          inputProps={type === 'sms' ? { maxLength: 160 } : {}}
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.is_active}
            onChange={(e) => handleChange('is_active', e.target.value)}
            label="Status"
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Use dynamic tags in your template:
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={() => setShowTagsModal(true)}
            sx={{ textDecoration: 'underline' }}
          >
            View Available Tags
          </Link>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {template ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Box>

      {/* Dynamic Tags Modal */}
      <Dialog open={showTagsModal} onClose={() => setShowTagsModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Available Dynamic Tags</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            You can use the following tags in your template content. They will be automatically replaced with actual values when the template is used.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {availableTags.map((tag) => (
              <Typography
                key={tag}
                variant="body2"
                sx={{
                  bgcolor: 'grey.100',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontFamily: 'monospace'
                }}
              >
                {tag}
              </Typography>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTagsModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TemplateForm;
