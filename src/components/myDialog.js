import { useState } from "react";
import { useStore } from "react-context-hook";

import { Close } from '@material-ui/icons';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  ListItemText,
  Button,
  Divider,
  List,
  ListItemSecondaryAction,
  Checkbox,
  ListItem,
  DialogActions,
  Slider,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core';
import { useEffect } from "react";

function MyDialog({ onClose, open }) {
  const [showClear, setShowClear] = useState(false);

  const [calories, , ] = useStore('caloriesRange');
  const [newCalories, setNewCalories] = useState(calories);
  const [, setCurrentCalories, ] = useStore('currentCalories');

  const [filters, , ] = useStore('filters');
  const [newFilters, setNewFilters] = useState(filters);
  const [, setCurrentFilters, ] = useStore('currentFilters');

  const styles = {
    root: {
      width: 440
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
  };

  // show/hide clear button
  useEffect(() => {
    setShowClear(
      (Object.values(newFilters).join('') !== Object.values(filters).join('')) ||
      newCalories.toString() !== calories.toString()
    );
  }, [newFilters, newCalories]);

  useEffect(() => {
    setNewCalories(calories);
  }, [calories]);
  
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onClose();
    setCurrentFilters(newFilters);
    setCurrentCalories(newCalories);
  }

  const handleClear = () => {
    setNewFilters(filters);
    setNewCalories(calories);
  }

  const handleCheck = (key, value) => {
    if (newFilters == {}) {
      setNewFilters({...filters, [key]: value});
    } else {
      setNewFilters({...newFilters, [key]: value});
    }
  }

  const useStyles = makeStyles({
    root: {
      color: '#fff',
      borderRadius: 4,
      backgroundColor: 'var(--shade50)',
      '&:hover': {
        backgroundColor: '#635c52'
      }
    },
  });

  const btnStyles = useStyles();

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div style={styles.header}>
        <DialogTitle id="simple-dialog-title">Filter</DialogTitle>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <DialogContent>
        <List style={styles.root}>
          {Object.keys(newFilters).map(key =>
            <div key={key}>
              <ListItem>
                <ListItemText primary={key} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    color="default"
                    checked={newFilters[key]}
                    onChange={(e, v) => handleCheck(key, v)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          )}
        </List>
        <Slider
          min={calories[0]}
          max={calories[1]}
          className="slider"
          value={newCalories}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          onChange={(e, v) => setNewCalories(v)}
        />
        <p className="body">Calories, kCal</p>
      </DialogContent>
      <DialogActions>
        {showClear && <Button variant="outlined" onClick={handleClear} >Clear</Button>}
        <Button variant="contained" onClick={handleSubmit} disableElevation classes={btnStyles}>Show Recipes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MyDialog;