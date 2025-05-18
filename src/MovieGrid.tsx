import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PosterRenderer from './PosterRenderer';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  paddingBottom: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function MovieGrid({ moviesRanked, moviesLookup, year}: {moviesRanked: any, moviesLookup: any, year:number}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 8, lg: 10 }}>
        {moviesRanked.slice(0, 10).map((movieName: string) => {
          const gross = moviesLookup[movieName]
          return (
            <Grid item xs={2}>
              <Item>
                <PosterRenderer movieName={movieName} year={year}/>
                <h4>{gross}</h4>
              </Item>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
}