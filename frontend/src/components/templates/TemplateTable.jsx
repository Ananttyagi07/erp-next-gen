import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TableFooter,
  TablePagination,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
  PictureAsPdf as PdfIcon,
  GetApp as ExcelIcon,
  Description as CsvIcon,
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf/dist/polyfills.es.js';
import autoTable from 'jspdf-autotable';

const TemplateTable = ({
  templates,
  loading,
  onEdit,
  onDelete,
  onCopy,
  columns,
  emptyMessage = 'No data available in table',
  type = 'sms', // 'sms' or 'email'
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSchool, setFilterSchool] = useState('');

  // Mock schools data - replace with actual data
  const schools = [
    { id: 1, name: 'School A' },
    { id: 2, name: 'School B' },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = !searchTerm ||
      template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (type === 'email' && template.subject?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSchool = !filterSchool || template.college === filterSchool;

    return matchesSearch && matchesSchool;
  });

  const paginatedTemplates = filteredTemplates.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTemplates.map(template => ({
      '#SL': templates.indexOf(template) + 1,
      School: template.college_name || 'N/A',
      'Receiver Type': template.template_type,
      Title: type === 'email' ? template.subject : template.name,
      Template: template.content,
      Status: template.is_active ? 'Active' : 'Inactive',
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${type.toUpperCase()} Templates`);
    XLSX.writeFile(wb, `${type}_templates.xlsx`);
  };

  const exportToCSV = () => {
    const csvData = filteredTemplates.map(template => ({
      '#SL': templates.indexOf(template) + 1,
      School: template.college_name || 'N/A',
      'Receiver Type': template.template_type,
      Title: type === 'email' ? template.subject : template.name,
      Template: template.content,
      Status: template.is_active ? 'Active' : 'Inactive',
    }));
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${type.toUpperCase()} Templates`);
    XLSX.writeFile(wb, `${type}_templates.csv`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['#SL', 'School', 'Receiver Type', 'Title', 'Template', 'Status'];
    const tableRows = filteredTemplates.map(template => [
      templates.indexOf(template) + 1,
      template.college_name || 'N/A',
      template.template_type,
      type === 'email' ? template.subject : template.name,
      template.content,
      template.is_active ? 'Active' : 'Inactive',
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      columnStyles: {
        4: { cellWidth: 60 }, // Template column wider
      },
    });

    doc.text(`${type.toUpperCase()} Templates`, 14, 15);
    doc.save(`${type}_templates.pdf`);
  };

  const copyToClipboard = () => {
    const text = filteredTemplates.map(template =>
      `${templates.indexOf(template) + 1}. ${template.name} - ${template.content}`
    ).join('\n');
    navigator.clipboard.writeText(text);
  };

  const getTemplateTypeColor = (type) => {
    const colors = {
      general: 'default',
      admission: 'primary',
      fee: 'secondary',
      attendance: 'warning',
      exam: 'info',
      holiday: 'success',
    };
    return colors[type] || 'default';
  };

  return (
    <Box>
      {/* Table Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<CopyIcon />}
            onClick={copyToClipboard}
            size="small"
          >
            Copy
          </Button>
          <Button
            variant="outlined"
            startIcon={<ExcelIcon />}
            onClick={exportToExcel}
            size="small"
          >
            Excel
          </Button>
          <Button
            variant="outlined"
            startIcon={<CsvIcon />}
            onClick={exportToCSV}
            size="small"
          >
            CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<PdfIcon />}
            onClick={exportToPDF}
            size="small"
          >
            PDF
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>--Select School--</InputLabel>
            <Select
              value={filterSchool}
              onChange={(e) => setFilterSchool(e.target.value)}
              label="--Select School--"
            >
              <MenuItem value="">All Schools</MenuItem>
              {schools.map((school) => (
                <MenuItem key={school.id} value={school.id}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 200 }}
          />

          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              {columns.map((column) => (
                <TableCell key={column.key} sx={{ fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : paginatedTemplates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="textSecondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTemplates.map((template, index) => (
                <TableRow key={template.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{template.college_name || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={template.template_type}
                      color={getTemplateTypeColor(template.template_type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                      {type === 'email' ? template.subject : template.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                      {template.content.length > 50
                        ? `${template.content.substring(0, 50)}...`
                        : template.content}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={template.is_active ? 'Active' : 'Inactive'}
                      color={template.is_active ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(template)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onDelete(template.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15, 25, 50]}
                colSpan={columns.length}
                count={filteredTemplates.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  borderBottom: 'none',
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    fontSize: '0.875rem',
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TemplateTable;
