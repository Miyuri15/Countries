import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Card sx={{ 
      maxWidth: 345, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 3
      }
    }}>
      <CardMedia
        component="img"
        height="160"
        image={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease'
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {country.name.common}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            <Box component="span" sx={{ fontWeight: 600 }}>Population:</Box> {country.population.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            <Box component="span" sx={{ fontWeight: 600 }}>Region:</Box> {country.region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ fontWeight: 600 }}>Capital:</Box> {country.capital?.[0] || 'N/A'}
          </Typography>
        </Box>
        <Button
          component={Link}
          to={`/country/${country.name.common}`}
          variant="contained"
          fullWidth
          sx={{ 
            mt: 'auto',
            fontWeight: 600,
            py: 1
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CountryCard;