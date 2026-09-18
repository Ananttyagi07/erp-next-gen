import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  KeyboardArrowDown as ExpandIcon,
  KeyboardArrowUp as CollapseIcon,
} from '@mui/icons-material';

const CollapsibleCard = ({
  title,
  icon: Icon,
  children,
  defaultExpanded = true,
  sx = {}
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {Icon && <Icon sx={{ fontSize: 32, color: 'primary.main' }} />}
            <Typography variant="h5" component="h2" fontWeight="bold">
              {title}
            </Typography>
          </Box>
        }
        action={
          <IconButton onClick={handleToggle} size="large">
            {expanded ? <CollapseIcon /> : <ExpandIcon />}
          </IconButton>
        }
        sx={{ pb: expanded ? 2 : 0 }}
      />
      {expanded && (
        <CardContent sx={{ pt: 0 }}>
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default CollapsibleCard;
