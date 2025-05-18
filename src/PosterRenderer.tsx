import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function PosterRenderer({ movieName, year}: {movieName: string, year:number }) {
  const localStorageKey = `${movieName}-${year}-poster`
  const [url, setUrl] = React.useState('')

  async function getPoster() {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${movieName}`
    )
  
    const data = await res.json()
    const matchingMovie = data?.results?.find((movieData: any) => movieData.release_date?.slice(0,4) === String(year))

    const posterURL = `http://image.tmdb.org/t/p/w500${matchingMovie?.poster_path}`
    localStorage.setItem(localStorageKey, posterURL)
    setUrl(posterURL)
  }

  React.useEffect(() => {
    const cachedPoster = localStorage.getItem(localStorageKey)
    if (cachedPoster) {
      setUrl(cachedPoster)
    } else {
      getPoster()
    }
  }, [movieName])

  return (
    <img
      src={url}
      style={{
        width: '100%',
        objectFit: 'scale-down'
      }}
    />
  )
}