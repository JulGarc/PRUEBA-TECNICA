import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  ListItemIcon,
  Avatar,
  Divider,
  Autocomplete,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { grey, blue } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Terminal {
  codigo_terminal: number;
  abreviado?: string;
  nombre: string;
}

const Navbar: React.FC = () => {
  const [terminales, setTerminales] = useState<Terminal[]>([]);
  const [selectedTerminal, setSelectedTerminal] = useState<string>('Seleccionar terminal');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const fetchTerminales = async () => {
    try {
      const response = await axios.get('https://apiv2-test.coordinadora.com/cm-maestros-territorios-ms/api/v1/terminales');
      const terminalData = response.data.data.map((terminal: any) => ({
        codigo_terminal: terminal.codigo_terminal,
        abreviado: terminal.abreviado || terminal.nombre,
        nombre: terminal.nombre,
      }));
      setTerminales(terminalData);
    } catch (error) {
      console.error('Error fetching terminales:', error);
    }
  };

  useEffect(() => {
    fetchTerminales();
  }, []);

  const handleSelectTerminal = (event: React.ChangeEvent<{}>, value: Terminal | null) => {
    setSelectedTerminal(value ? `Terminal: ${value.codigo_terminal} - ${value.abreviado || value.nombre}` : 'Seleccionar terminal');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingX: { xs: 2, sm: 4 } }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => navigate('/')} color="inherit" aria-label="Inicio" sx={{ color: blue[600], '&:hover': { color: blue[800] } }}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: blue[700], letterSpacing: 1 }}>
            SIGGO Tracking
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Autocomplete
            options={terminales}
            getOptionLabel={(option) => `${option.codigo_terminal} - ${option.abreviado || option.nombre}`}
            onChange={handleSelectTerminal}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={selectedTerminal}
                sx={{
                  width: { xs: 180, sm: 250 },
                  bgcolor: grey[100],
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: grey[300] },
                    '&:hover fieldset': { borderColor: blue[600] },
                    '&.Mui-focused fieldset': { borderColor: blue[600] },
                  },
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconButton color="inherit" sx={{ color: grey[600], '&:hover': { color: blue[600] } }}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ color: grey[600], '&:hover': { color: blue[600] } }}>
            <GridViewIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleMenuOpen} sx={{ color: grey[600], '&:hover': { color: blue[600] } }}>
            <Avatar sx={{ width: 32, height: 32, backgroundColor: blue[600] }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: { 
                backgroundColor: '#ffffff', 
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)', 
                mt: 1, 
                borderRadius: 2,
                width: 250,
              },
            }}
          >
            <Box sx={{ padding: 2, textAlign: 'center' }}>
              <Avatar sx={{ margin: '0 auto', bgcolor: blue[600] }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>
                Nombre de usuario
              </Typography>
              <Typography variant="body2" color="text.secondary">
                usuario@correo.com
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Mi Cuenta
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Ajustes
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SupportAgentIcon fontSize="small" />
              </ListItemIcon>
              Soporte
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
