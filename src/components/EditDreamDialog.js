import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

const EditDreamDialog = ({ open, dream, onClose, onSave }) => {
  const [editedDream, setEditedDream] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    targetDate: '',
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (dream) {
      setEditedDream({
        title: dream.title || '',
        description: dream.description || '',
        category: dream.category || '',
        priority: dream.priority || 'medium',
        targetDate: dream.targetDate || '',
      });
    }
  }, [dream]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDream({ ...editedDream, [name]: value });
    
    // Clear error when field is changed
    if (error[name]) {
      setError({ ...error, [name]: '' });
    }
  };

  const handleSubmit = () => {
    // Validate form
    const newErrors = {};
    if (!editedDream.title.trim()) {
      newErrors.title = '请输入梦想标题';
    }
    if (!editedDream.category) {
      newErrors.category = '请选择类别';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    
    onSave(editedDream);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        编辑梦想
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="梦想标题"
              name="title"
              value={editedDream.title}
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
              value={editedDream.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="类别"
              name="category"
              value={editedDream.category}
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
              value={editedDream.priority}
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
              value={editedDream.targetDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">取消</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">保存</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDreamDialog; 