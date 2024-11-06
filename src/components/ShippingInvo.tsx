import React from 'react';
import { Box, Typography, Button, Divider, Paper, Grid } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useLocation } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ShippingInvo: React.FC = () => {
  const location = useLocation();
  const data = location.state?.data;

  const displayData = (value: string | null | undefined) => (value ? value : 'No disponible');

  if (!data) {
    return <Typography variant="h6" color="error" align="center">No hay datos de envío disponibles.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 4, backgroundColor: '#f5f7fa', borderRadius: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Typography variant="h5" sx={{ color: blue[800], fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <RequestQuoteIcon fontSize="large" sx={{ color: blue[700] }} />
          Información de Facturación
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: blue[700] }}>
                Guía Nivel:
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
                  <InventoryIcon sx={{ color: blue[500] }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: grey[800] }}>Paquete</Typography>
                </Box>
                <Typography variant="body2"><strong>Tipo cuenta:</strong> {displayData(data.abreviado_cuenta)}</Typography>
                <Typography variant="body2"><strong>Peso:</strong> {displayData(data.peso)}</Typography>
                <Typography variant="body2"><strong>Volumen:</strong> {displayData(data.volumen)}</Typography>
                <Typography variant="body2"><strong>Peso liquidado:</strong> {displayData(data.peso_liquidado)}</Typography>
              </Box>
            </Paper>
          </Grid>


          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, borderRadius: 3, backgroundColor: grey[50], minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AttachMoneyIcon sx={{ color: blue[500] }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: grey[800] }}>Valor</Typography>
                </Box>
                <Typography variant="body2"><strong>Valor declarado:</strong> {displayData(data.valor_declarado)}</Typography>
                <Typography variant="body2"><strong>Valor flete:</strong> {displayData(data.flete?.flete_total)}</Typography>
                <Typography variant="body2"><strong>Flete fijo:</strong> {displayData(data.flete?.flete_fijo)}</Typography>
                <Typography variant="body2"><strong>Flete variable:</strong> {displayData(data.flete?.flete_variable)}</Typography>
                <Typography variant="body2"><strong>Otros valores:</strong> {displayData(data.flete?.otros_valores)}</Typography>
                <Typography variant="body2"><strong>Valor total:</strong> {displayData(data.flete?.valor_facturado)}</Typography>
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

export default ShippingInvo;
