// src/components/CountryCard.js
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Card sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: 3,
      transition: 'transform 0.3s ease',
      '&:hover': { transform: 'scale(1.03)' }
    }}>
      <CardMedia
        component="img"
        height="160"
        image={country.flags.png}
        alt={country.name.common}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" fontWeight="bold">
          {country.name.common}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          <b>Population:</b> {country.population.toLocaleString()}<br />
          <b>Region:</b> {country.region}<br />
          <b>Capital:</b> {country.capital?.[0] || 'N/A'}
        </Typography>
      </CardContent>
      <Button 
        component={Link}
        to={`/country/${country.name.common}`}
        variant="contained"
        sx={{ m: 2, mt: 'auto' }} // Pushes button to bottom
      >
        View Details
      </Button>
    </Card>
  );
};

export default CountryCard;