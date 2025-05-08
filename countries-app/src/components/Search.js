import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search for a country..."
      variant="outlined"
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }
      }}
      sx={{ 
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'divider',
          },
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
        }
      }}
    />
  );
};

export default Search;