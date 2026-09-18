# TODO: Implement Complete Frontend Features for Manage SMS/Email Templates

## Current Status
- Basic CRUD implementations exist for SMS and Email templates
- Header lacks global elements
- Need to add collapsible layout, tabs, detailed list view, export functionality, pagination

## Tasks

### 1. Update Global Header (Header.jsx)
- [ ] Add --Select School-- dropdown (for school selection)
- [ ] Add Global Search text input
- [ ] Add --Select School-- dropdown (duplicate for filter?)
- [ ] Add --Session Year-- dropdown
- [ ] Add Update button (black button)
- [ ] Make elements persistent across pages

### 2. Create Shared Components
- [ ] Create CollapsibleCard component for main page layout
- [ ] Create TemplateTable component for list view
- [ ] Create TemplateForm component for add/edit form
- [ ] Create Export functionality (CSV, Excel, PDF, Copy)

### 3. Add Services for Dependencies
- [ ] Add colleges service to fetch schools list
- [ ] Add academic years service to fetch session years
- [ ] Update templatesSlice to support pagination, filtering

### 4. Overhaul SMSTemplates.jsx
- [ ] Implement collapsible white card with envelope icon title
- [ ] Add Quick Links bar (Email Template | SMS Template)
- [ ] Add Tab Navigation (List/Add tabs with icons)
- [ ] Implement List tab with filters, table controls, data table, pagination
- [ ] Implement Add tab with form (School Name*, Receiver Type*, Title*, Template*, Dynamic Tag link)
- [ ] Add export buttons functionality
- [ ] Add search and pagination logic

### 5. Overhaul EmailTemplates.jsx
- [ ] Same as SMS but with email-specific fields (Title = subject, Template = content)
- [ ] Ensure identical layout, only title changes

### 6. Install Dependencies
- [ ] Install xlsx for Excel export
- [ ] Install jspdf for PDF export
- [ ] Install react-data-table-component or similar for advanced table features

### 7. Testing
- [ ] Test UI layout and responsiveness
- [ ] Test CRUD operations
- [ ] Test export functionality
- [ ] Test permissions
- [ ] Test navigation between SMS/Email templates

## Notes
- Layout identical for both screens, only page title changes
- Receiver Type = template_type from model
- For SMS: Title = name, Template = content
- For Email: Title = subject, Template = content
- School = college field
- Need to handle empty states, loading states
- Dynamic Tag link should show available tags modal
