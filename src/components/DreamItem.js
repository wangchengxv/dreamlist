import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import TodayIcon from '@mui/icons-material/Today';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, completed, priority }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: '12px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  borderLeft: `5px solid ${
    completed
      ? theme.palette.success.main
      : priority === 'high'
      ? theme.palette.error.main
      : priority === 'medium'
      ? theme.palette.warning.main
      : theme.palette.info.main
  }`,
  opacity: completed ? 0.8 : 1,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)'
  }
}));

const categoryColors = {
  career: '#673ab7',
  education: '#2196f3',
  family: '#e91e63',
  financial: '#4caf50',
  health: '#f44336',
  personal: '#ff9800',
  travel: '#009688',
  other: '#9e9e9e'
};

const getCategoryLabel = (category) => {
  const labels = {
    career: '职业',
    education: '教育',
    family: '家庭',
    financial: '财务',
    health: '健康',
    personal: '个人成长',
    travel: '旅行',
    other: '其他'
  };
  return labels[category] || category;
};

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'high':
      return <StarIcon fontSize="small" color="error" />;
    case 'medium':
      return <StarHalfIcon fontSize="small" color="warning" />;
    default:
      return <StarOutlineIcon fontSize="small" color="disabled" />;
  }
};

const DreamItem = ({ dream, onToggleComplete, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <StyledCard completed={dream.completed} priority={dream.priority}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={dream.completed}
            onChange={onToggleComplete}
            sx={{ 
              color: dream.completed ? 'success.main' : 'gray',
              '&.Mui-checked': {
                color: 'success.main',
              }
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                textDecoration: dream.completed ? 'line-through' : 'none',
                color: dream.completed ? 'text.secondary' : 'text.primary',
                fontWeight: 500
              }}
            >
              {dream.title}
            </Typography>
            {dream.description && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mb: 1,
                  textDecoration: dream.completed ? 'line-through' : 'none' 
                }}
              >
                {dream.description}
              </Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mt: 1, gap: 1 }}>
              <Chip 
                label={getCategoryLabel(dream.category)} 
                size="small" 
                sx={{ 
                  bgcolor: categoryColors[dream.category] || '#9e9e9e',
                  color: 'white',
                  fontWeight: 'bold'
                }} 
              />
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                {getPriorityIcon(dream.priority)}
              </Box>
              {dream.targetDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <TodayIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(dream.targetDate)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box>
            <IconButton size="small" onClick={onEdit} sx={{ color: 'primary.main' }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onDelete} sx={{ color: 'error.main' }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default DreamItem; 