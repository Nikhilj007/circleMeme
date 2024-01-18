import {
    Avatar,
    Box,
    DialogActions,
    DialogContent,
    DialogContentText,
    IconButton,
    TextField,
  } from '@mui/material';
  import { useState } from 'react';
  import CropEasy from './crop/CropEasy';
  import { IoCropOutline } from "react-icons/io5";

  import { useEffect } from 'react';
  
  const Profile = () => {
    const [name, setName] = useState();
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState();
    const [openCrop, setOpenCrop] = useState(false);
  
    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
        setPhotoURL(URL.createObjectURL(file));
        setOpenCrop(true);
      }
    };

  
    useEffect(() => {
      if (openCrop) {
        setModal({ ...modal, title: 'Crop Profile Photo' });
      } else {
        setModal({ ...modal, title: 'Update Profile' });
      }
    }, [openCrop]);
  
    return !openCrop ? (
      <form onSubmit={}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating these fields:
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            type="text"
            inputProps={{ minLength: 2 }}
            fullWidth
            variant="standard"
            value={name || ''}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="profilePhoto">
              <input
                accept="image/*"
                id="profilePhoto"
                type="file"
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              <Avatar
                src={photoURL}
                sx={{ width: 75, height: 75, cursor: 'pointer' }}
              />
            </label>
            {file && (
              <IconButton
                aria-label="Crop"
                color="primary"
                onClick={() => setOpenCrop(true)}
              >
                <Crop />
              </IconButton>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </form>
    ) : (
      <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
    );
  };
  
  export default Profile;