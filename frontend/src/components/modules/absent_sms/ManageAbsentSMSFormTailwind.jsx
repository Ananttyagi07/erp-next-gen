/**
 * Manage Absent SMS Form Component - Material-UI Version
 * Form for sending absent SMS with vertical layout
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

// Sample data constants
const SCHOOLS = [
  { id: 1, name: 'School A' },
  { id: 2, name: 'School B' },
  { id: 3, name: 'School C' }
];

const RECEIVER_TYPES = [
  { id: 1, name: 'Student' },
  { id: 2, name: 'Parent' },
  { id: 3, name: 'Teacher' }
];

const TEMPLATES = [
  { id: 1, name: 'Default Template' },
  { id: 2, name: 'Absence Notice' },
  { id: 3, name: 'Custom Template' }
];

const GATEWAYS = [
  { id: 1, name: 'SMS Gateway 1' },
  { id: 2, name: 'SMS Gateway 2' },
  { id: 3, name: 'SMS Gateway 3' }
];

const ManageAbsentSMSFormTailwind = () => {
  const [formData, setFormData] = useState({
    school: '',
    receiverType: '',
    receiver: '',
    template: '',
    absentDate: '',
    sms: '',
    gateway: ''
  });
  const [characterCount, setCharacterCount] = useState(0);
  const remainingCharacters = 160 - characterCount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sms') {
      setCharacterCount(value.length);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      school: '',
      receiverType: '',
      receiver: '',
      template: '',
      absentDate: '',
      sms: '',
      gateway: ''
    });
    setCharacterCount(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ space: 6 }}>
        {/* Form Fields with Label-Input Layout */}
        <Box sx={{ space: 4 }}>
          {/* School Name */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ width: '20%', pt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                School Name <span style={{ color: '#f44336' }}>*</span>
              </Typography>
            </Box>
            <Box sx={{ width: '80%' }}>
              <FormControl fullWidth size="small">
                <InputLabel>--Select School--</InputLabel>
                <Select
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  label="--Select School--"
                  required
                >
                  <MenuItem value="">--Select School--</MenuItem>
                  {SCHOOLS.map((school) => (
                    <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Receiver Type */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ width: '20%', pt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                Receiver Type <span style={{ color: '#f44336' }}>*</span>
              </Typography>
            </Box>
            <Box sx={{ width: '80%' }}>
              <FormControl fullWidth size="small">
                <InputLabel>--Select--</InputLabel>
                <Select
                  name="receiverType"
                  value={formData.receiverType}
                  onChange={handleChange}
                  label="--Select--"
                  required
                >
                  <MenuItem value="">--Select--</MenuItem>
                  {RECEIVER_TYPES.map((type) => (
                    <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Receiver */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ width: '20%', pt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                Receiver <span style={{ color: '#f44336' }}>*</span>
              </Typography>
            </Box>
            <Box sx={{ width: '80%' }}>
              <FormControl fullWidth size="small">
                <InputLabel>--Select--</InputLabel>
                <Select
                  name="receiver"
                  value={formData.receiver}
                  onChange={handleChange}
                  label="--Select--"
                  required
                >
                  <MenuItem value="">--Select--</MenuItem>
                  <MenuItem value="1">Receiver 1</MenuItem>
                  <MenuItem value="2">Receiver 2</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Template */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ width: '20%', pt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                Template
              </Typography>
            </Box>
            <Box sx={{ width: '80%' }}>
              <FormControl fullWidth size="small">
                <InputLabel>--Select--</InputLabel>
                <Select
                  name="template"
                  value={formData.template}
                  onChange={handleChange}
                  label="--Select--"
                >
                  <MenuItem value="">--Select--</MenuItem>
                  {TEMPLATES.map((template) => (
                    <MenuItem key={template.id} value={template.id}>{template.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Absent Date */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ width: '20%', pt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                Absent Date <span style={{ color: '#f44336' }}>*</span>
              </Typography>
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                fullWidth
                size="small"
                type="date"
                name="absentDate"
                value={formData.absentDate}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>

          {/* SMS */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ width: '20%', pt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                SMS <span style={{ color: '#f44336' }}>*</span>
              </Typography>
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                fullWidth
                name="sms"
                placeholder="SMS"
                value={formData.sms}
                onChange={handleChange}
                required
                multiline
                rows={5}
                sx={{ mb: 1 }}
              />
              <Typography sx={{ fontSize: '0.85rem', color: '#999' }}>
                You have remain {remainingCharacters}/160 character
              </Typography>
            </Box>
          </Box>

          {/* Gateway */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ width: '20%', pt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                Gateway <span style={{ color: '#f44336' }}>*</span>
              </Typography>
            </Box>
            <Box sx={{ width: '80%' }}>
              <FormControl fullWidth size="small">
                <InputLabel>--Select--</InputLabel>
                <Select
                  name="gateway"
                  value={formData.gateway}
                  onChange={handleChange}
                  label="--Select--"
                  required
                >
                  <MenuItem value="">--Select--</MenuItem>
                  {GATEWAYS.map((gateway) => (
                    <MenuItem key={gateway.id} value={gateway.id}>{gateway.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Dynamic Tag */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ width: '20%', pt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                Dynamic Tag
              </Typography>
            </Box>
            <Box sx={{ width: '80%', display: 'flex', gap: 2 }}>
              <Button
                size="small"
                sx={{
                  color: '#0066cc',
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                [name]
              </Button>
              <Button
                size="small"
                sx={{
                  color: '#0066cc',
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                [absent_date]
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Form Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, pt: 4, borderTop: '1px solid #e0e0e0' }}>
          <Button
            type="button"
            onClick={handleCancel}
            sx={{
              px: 6,
              py: 1,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              color: '#666',
              textTransform: 'capitalize',
              fontWeight: 'medium',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              px: 6,
              py: 1,
              backgroundColor: '#000',
              color: '#fff',
              textTransform: 'capitalize',
              fontWeight: 'medium',
              '&:hover': { backgroundColor: '#333' }
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ManageAbsentSMSFormTailwind;
