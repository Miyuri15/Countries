import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByName, getCountryByCode } from '../services/api';
import CountryDetails from '../components/CountryDetails';
import { Box, CircularProgress, Typography } from '@mui/material';

const CountryPage = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First try to get by name
        let data = await getCountryByName(name);
        
        // If not found, try to get by code (for border countries)
        if (!data || data.length === 0) {
          data = await getCountryByCode(name);
        }
        
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError('Country not found');
        }
      } catch (error) {
        console.error('Error fetching country:', error);
        setError('Failed to load country data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountry();
  }, [name]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return <CountryDetails country={country} />;
};

export default CountryPage;