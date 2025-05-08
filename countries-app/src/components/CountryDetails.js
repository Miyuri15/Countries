import { Box, Typography, Button, Chip, Stack, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CountryDetails = ({ country }) => {
  if (!country) return null;

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => `${currency.name} (${currency.symbol || '—'})`)
        .join(', ')
    : 'N/A';

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        component={Link} 
        to="/" 
        variant="outlined" 
        startIcon={<ArrowBackIcon />}
        sx={{ 
          mb: 4,
          px: 3,
          py: 1,
          borderRadius: 2,
          textTransform: 'none'
        }}
      >
        Back
      </Button>
      
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 6 
        }}>
          <Box sx={{ 
            flex: 1,
            minHeight: 400,
            display: 'flex',
            alignItems: 'center'
          }}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={{ 
                width: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              {country.name.common}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 4, 
              mb: 4 
            }}>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography sx={{ mb: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>Native Name:</Box> {country.name.official}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>Population:</Box> {country.population.toLocaleString()}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>Region:</Box> {country.region}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>Sub Region:</Box> {country.subregion || 'N/A'}
                </Typography>
                <Typography>
                  <Box component="span" sx={{ fontWeight: 600 }}>Capital:</Box> {country.capital?.[0] || 'N/A'}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 200 }}>
                <Typography sx={{ mb: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>Top Level Domain:</Box> {country.tld?.[0] || 'N/A'}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>Currencies:</Box> {currencies}
                </Typography>
                <Typography>
                  <Box component="span" sx={{ fontWeight: 600 }}>Languages:</Box> {languages}
                </Typography>
              </Box>
            </Box>
            
            {country.borders && country.borders.length > 0 && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  Border Countries:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {country.borders.map((border) => (
                    <Chip
                      key={border}
                      label={border}
                      component={Link}
                      to={`/country/${border}`}
                      clickable
                      sx={{
                        borderRadius: 1,
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white'
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CountryDetails;