import React from 'react';
import { Box, Typography, Button, Divider, Paper, Grid } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ShippingInfo: React.FC = () => {
  const location = useLocation();
  const data = location.state?.data;

  const displayData = (value: string | null | undefined) => (value ? value : 'No disponible');

  if (!data) {
    return <Typography variant="h6" color="error" align="center">No hay datos de envío disponibles.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 4, backgroundColor: '#f5f7fa', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <LocalShippingIcon fontSize="large" sx={{ color: blue[700] }} />
        <Typography variant="h5" sx={{ color: blue[800], fontWeight: 'bold' }}>
          Información General de Envío
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: blue[700] }}>
                Guía Nivel 1:
              </Typography>
              <Typography variant="body1" color="textSecondary">{displayData(data.guia)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: blue[700] }}>
                Unidades:
              </Typography>
              <Typography variant="body1" color="textSecondary">{displayData(data.total_unidades?.toString())}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, borderRadius: 3, backgroundColor: grey[50], minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <PersonIcon sx={{ color: blue[500] }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: grey[800] }}>Cliente</Typography>
                </Box>
                <Typography variant="body2"><strong>Nombre:</strong> {displayData(data.cliente?.razon_social)}</Typography>
                <Typography variant="body2"><strong>Nivel/Servicio:</strong> {displayData(data.servicio?.descripcion)}</Typography>
                <Typography variant="body2"><strong>Observaciones:</strong> {displayData(data.observaciones)}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, borderRadius: 3, backgroundColor: grey[50], minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <PersonIcon sx={{ color: blue[500] }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: grey[800] }}>Remitente</Typography>
                </Box>
                <Typography variant="body2"><strong>Nombre:</strong> {displayData(data.remitente?.nombre)}</Typography>
                <Typography variant="body2"><strong>Teléfono:</strong> {displayData(data.remitente?.telefono)}</Typography>
                <Typography variant="body2"><strong>Dirección:</strong> {displayData(data.remitente?.zonificacion?.direccion)}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, borderRadius: 3, backgroundColor: grey[50], minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <PersonIcon sx={{ color: blue[500] }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: grey[800] }}>Destinatario</Typography>
                </Box>
                <Typography variant="body2"><strong>Nombre:</strong> {displayData(data.destinatario?.nombre)}</Typography>
                <Typography variant="body2"><strong>Teléfono:</strong> {displayData(data.destinatario?.telefono)}</Typography>
                <Typography variant="body2"><strong>Dirección:</strong> {displayData(data.destinatario?.zonificacion?.direccion)}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, borderRadius: 3, backgroundColor: grey[50], minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <LocationOnIcon sx={{ color: blue[500] }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: grey[800] }}>Terminales</Typography>
                </Box>
                <Typography variant="body2"><strong>Terminal Origen:</strong> {displayData(data.remitente?.zonificacion?.nombre_terminal)}</Typography>
                <Typography variant="body2"><strong>Terminal Destino:</strong> {displayData(data.destinatario?.zonificacion?.nombre_terminal)}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: blue[600],
            '&:hover': { bgcolor: blue[800] },
            paddingX: 4,
            paddingY: 1.5,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          Ver Guía Digital
        </Button>
      </Box>
    </Box>
  );
};

export default ShippingInfo;
