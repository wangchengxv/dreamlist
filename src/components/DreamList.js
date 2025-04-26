import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DreamItem from './DreamItem';
import EditDreamDialog from './EditDreamDialog';

const DreamList = ({ dreams, toggleDreamCompleted, deleteDream, editDream }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentDream, setCurrentDream] = useState(null);

  const handleOpenEditDialog = (dream) => {
    setCurrentDream(dream);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentDream(null);
  };

  const handleSaveEdit = (updatedDream) => {
    editDream(currentDream.id, updatedDream);
    handleCloseEditDialog();
  };

  if (dreams.length === 0) {
    return (
      <Box sx={{ my: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          还没有梦想，点击"添加新梦想"开始创建吧！
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {dreams.map((dream) => (
          <Grid item xs={12} key={dream.id}>
            <DreamItem
              dream={dream}
              onToggleComplete={() => toggleDreamCompleted(dream.id)}
              onDelete={() => deleteDream(dream.id)}
              onEdit={() => handleOpenEditDialog(dream)}
            />
          </Grid>
        ))}
      </Grid>

      {currentDream && (
        <EditDreamDialog
          open={editDialogOpen}
          dream={currentDream}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
        />
      )}
    </Box>
  );
};

export default DreamList; 