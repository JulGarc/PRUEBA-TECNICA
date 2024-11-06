import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, Fade } from '@mui/material';
import ShippingInfo from './ShippingInfo';
import ShippingInvo from './ShippingInvo';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';

const ShippingDetails: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', padding: 4, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: '#1565c0',
              height: '3px',
              borderRadius: '2px',
            },
          }}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              color: '#888',
              fontSize: '1rem',
              '&.Mui-selected': { color: '#1565c0' },
            },
          }}
        >
          <Tab icon={<LocalShippingIcon />} label="Información General" />
          <Tab icon={<ReceiptIcon />} label="Información de Facturación" />
        </Tabs>
      </Paper>
      <Box sx={{ mt: 3 }}>
        <Fade in={selectedTab === 0} timeout={500}>
          <Box hidden={selectedTab !== 0}>
            <ShippingInfo />
          </Box>
        </Fade>
        <Fade in={selectedTab === 1} timeout={500}>
          <Box hidden={selectedTab !== 1}>
            <ShippingInvo />
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

export default ShippingDetails;
