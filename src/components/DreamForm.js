import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  transition: 'transform 0.3s ease-in-out',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const categories = [
  { value: 'career', label: '职业' },
  { value: 'education', label: '教育' },
  { value: 'family', label: '家庭' },
  { value: 'financial', label: '财务' },
  { value: 'health', label: '健康' },
  { value: 'personal', label: '个人成长' },
  { value: 'travel', label: '旅行' },
  { value: 'other', label: '其他' },
];

const priorities = [
  { value: 'low', label: '低' },
  { value: 'medium', label: '中' },
  { value: 'high', label: '高' },
];

const DreamForm = ({ addDream }) => {
  const [open, setOpen] = useState(false);
  const [dream, setDream] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    targetDate: '',
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDream({ ...dream, [name]: value });
    
    // Clear error when field is changed
    if (error[name]) {
      setError({ ...error, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!dream.title.trim()) {
      newErrors.title = '请输入梦想标题';
    }
    if (!dream.category) {
      newErrors.category = '请选择类别';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    
    addDream(dream);
    setDream({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      targetDate: '',
    });
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={open ? <CloseIcon /> : <AddIcon />}
          onClick={() => setOpen(!open)}
          sx={{ 
            borderRadius: '20px', 
            px: 3,
            boxShadow: '0 4px 10px rgba(255, 87, 34, 0.3)',
          }}
        >
          {open ? '取消' : '添加新梦想'}
        </Button>
      </Box>

      <Collapse in={open}>
        <StyledCard>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="div">
                添加新梦想
              </Typography>
              <IconButton size="small" onClick={() => setOpen(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="梦想标题"
                    name="title"
                    value={dream.title}
                    onChange={handleChange}
                    error={!!error.title}
                    helperText={error.title}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="描述"
                    name="description"
                    value={dream.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="类别"
                    name="category"
                    value={dream.category}
                    onChange={handleChange}
                    error={!!error.category}
                    helperText={error.category}
                    required
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="优先级"
                    name="priority"
                    value={dream.priority}
                    onChange={handleChange}
                  >
                    {priorities.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="目标日期"
                    name="targetDate"
                    type="date"
                    value={dream.targetDate}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    保存梦想
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </StyledCard>
      </Collapse>
    </>
  );
};

export default DreamForm; 