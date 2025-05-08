import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

const Filter = ({ onFilter }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="region-filter-label">Filter by Region</InputLabel>
        <Select
          labelId="region-filter-label"
          label="Filter by Region"
          onChange={handleChange}
          defaultValue=""
          sx={{
            borderRadius: 2,
            backgroundColor: 'background.paper',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'divider',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          }}
        >
          <MenuItem value="">All Regions</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;