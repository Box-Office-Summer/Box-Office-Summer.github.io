import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function ButtonAppBar({ onClick, activeYear }: { onClick: Function, activeYear: number }) {
  const ButtonComponent = ({ year }: { year: number }) => (
    <Button sx={{
      '@media (min-width: 800px)': {
        margin: '0px 30px',
      },
      flexGrow: 1,
      color: activeYear === year ? '#1976d2' : 'white',
      backgroundColor: activeYear === year ? 'white' : '#1976d2',
      '&:hover': {
        color: 'black',
        backgroundColor: activeYear === year ? 'white' : '#1976d2',
      },
    }} onClick={() => onClick(year)}>
      {year}
    </Button>
  )

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const availableYears = [2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
              <Typography sx={{ marginLeft: '10px' }}>
                {activeYear}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {availableYears.map((year) => (
                <MenuItem key={year} onClick={()=>{
                  handleCloseNavMenu()
                  onClick(year)
                }}>
                  <Typography textAlign="center" marginX={'20px'}>{year}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography sx={{ margin: 'auto' }}>
              The Archives:
            </Typography>
            {availableYears.map((year: number) => (
              <ButtonComponent year={year}/>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}