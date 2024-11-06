import React, { useState } from 'react';
import { Box, Button, Typography, TextField, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { grey, blue } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchGuideStart, fetchGuideSuccess, fetchGuideFailure } from '../store/slices/guideSlice';

const SearchPanel: React.FC = () => {
  const [searchType, setSearchType] = useState<'guías' | 'etiqueta'>('guías');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state: RootState) => state.guide);

  const validateSearchQuery = () => {
    if (searchQuery.trim() === '' || (searchType === 'guías' && (!/^\d+$/.test(searchQuery) || searchQuery.length < 11))) {
      dispatch(fetchGuideFailure('El número de guía debe tener al menos 11 dígitos y ser numérico.'));
      return false;
    }
    return true;
  };

  const handleSearch = async () => {
    if (!validateSearchQuery()) return;
    dispatch(fetchGuideStart());

    try {
      const response = await axios.get(`https://apiv2-test.coordinadora.com/cm-consultar-guia-ms/guia/${searchQuery}`);
      if (response.data.isError || !response.data.data) {
        dispatch(fetchGuideFailure('No se encontró la guía.'));
      } else {
        dispatch(fetchGuideSuccess(response.data.data));
        navigate('/shipping-details', { state: { data: response.data.data } });
      }
    } catch (error) {
      dispatch(fetchGuideFailure('Hubo un problema al realizar la búsqueda. Inténtalo de nuevo.'));
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        margin: '0 auto',
        marginTop: '2cm',
        padding: 4,
        borderRadius: 4,
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, color: blue[800], fontWeight: 'bold', letterSpacing: 1 }}>
        Selecciona la consulta que quieres realizar
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Button
          variant={searchType === 'guías' ? 'contained' : 'outlined'}
          startIcon={<SearchIcon />}
          onClick={() => setSearchType('guías')}
          sx={{
            bgcolor: searchType === 'guías' ? blue[600] : 'transparent',
            color: searchType === 'guías' ? '#fff' : grey[600],
            textTransform: 'none',
            borderColor: searchType === 'guías' ? 'transparent' : grey[300],
            borderRadius: 2,
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: searchType === 'guías' ? blue[700] : grey[200],
              color: searchType === 'guías' ? '#fff' : grey[700],
            },
            paddingX: 3,
          }}
        >
          Guías
        </Button>

        <Button
          variant="outlined"
          startIcon={<QrCodeIcon />}
          disabled
          sx={{
            color: grey[600],
            textTransform: 'none',
            borderColor: grey[300],
            borderRadius: 2,
            fontWeight: 'bold',
            paddingX: 3,
            '&:hover': { bgcolor: grey[200] },
          }}
        >
          Etiqueta
        </Button>
      </Box>

      <TextField
        variant="outlined"
        fullWidth
        placeholder={`Buscar número de ${searchType}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        error={Boolean(error)}
        helperText={error}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            '& fieldset': { borderColor: grey[300] },
            '&:hover fieldset': { borderColor: blue[600] },
            '&.Mui-focused fieldset': { borderColor: blue[600] },
          },
        }}
      />

      {loading ? (
        <CircularProgress sx={{ color: blue[600], mb: 3 }} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            bgcolor: blue[600],
            '&:hover': { bgcolor: blue[800] },
            paddingX: 4,
            fontWeight: 'bold',
          }}
        >
          Buscar
        </Button>
      )}

      <Button
        variant="text"
        endIcon={<ArrowForwardIcon />}
        sx={{
          color: blue[600],
          fontWeight: 'bold',
          textTransform: 'none',
          mt: 2,
          '&:hover': { color: blue[800] },
        }}
        onClick={() => alert('Función de búsqueda avanzada en desarrollo...')}
      >
        Buscar múltiples guías
      </Button>
    </Box>
  );
};

export default SearchPanel;
