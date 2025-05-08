import { useState, useEffect } from 'react';
import { Grid, Container, Box, CircularProgress, Typography } from '@mui/material';
import { getAllCountries, getCountriesByRegion } from '../services/api';
import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import Filter from '../components/Filter';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleFilter = async (region) => {
    setLoading(true);
    try {
      if (!region) {
        const data = await getAllCountries();
        setFilteredCountries(data);
      } else {
        const data = await getCountriesByRegion(region);
        setFilteredCountries(data);
      }
    } catch (error) {
      console.error('Error filtering countries:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 3,
        mb: 4 
      }}>
        <Box sx={{ width: { xs: '100%', sm: '50%', md: '40%' } }}>
          <Search onSearch={handleSearch} />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '30%', md: '20%' } }}>
          <Filter onFilter={handleFilter} />
        </Box>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={60} />
        </Box>
      ) : filteredCountries.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No countries found matching your criteria
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredCountries.map((country) => (
            <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
              <CountryCard country={country} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;