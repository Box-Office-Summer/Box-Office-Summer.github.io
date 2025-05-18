// @ts-nocheck
import React, { useState } from 'react';
import './App.css';
import Table from './table'
import Navbar from './Navbar'
import * as movieDataList from './movieData'
import * as entriesList from './entries'
import MovieGrid from './MovieGrid'

function App() {  
  const [year, setYear] = useState(2025)
  const handleNavClick = (newYear) => {
    setYear(newYear)
  }

  const movieTitlesByGross = Object.entries(movieDataList[`movieData${year}`])
    .sort(([,a], [,b]) => a - b)
    .map(([key]) => key)

  const rows = []
  
  for (const [name, pickList] of Object.entries(entriesList[`entries${year}`])) {
    const picks = []

    for (let i = 0; i < pickList.length; i++) {
      const actualPlacement = movieTitlesByGross.findIndex((title) => title === pickList[i])
      const difference = Math.abs(i - actualPlacement)

      let score = 0

      // this means the title is not here or the name is wrong
      if (actualPlacement === -1) {
        score = 0
      }
      // wildcards can only get 1 point for being top 10
      else if (i > 9) {
        if (actualPlacement < 10) {
          score = 1
        }
      } else if (difference === 0) {
        if (i === 0 || i === 9) {
          score = 13
        } else {
          score = 10
        }
      } else if (difference === 1) {
        score = 7
      } else if (difference === 2) {
        score = 5
      } else if (actualPlacement < 10) {
        score = 3
      }

      picks.push({
        title: pickList[i],
        prediction: i < 10 ? i + 1 : "Wildcard",
        actual: actualPlacement >= 0 ? actualPlacement + 1 : 'N/A',
        score,
        gross: movieDataList[`movieData${year}`][pickList[i]] || 'N/A'
      })
    }

    const obj = {
      name,
      picks,
      wins: 0, // TODO
      score: picks.reduce((accum, curr) => {
        return accum + curr.score
      }, 0)

    }
    rows.push(obj)
  }

  rows.sort((a, b) => b.score - a.score)



  return (
    <div className="App">
      <div className="popcorn-container" />
      <header className="App-header">
        <Navbar onClick={handleNavClick} activeYear={year}/>
        <div className="main-content">
          <Table rows={rows} />
          <br />
          <br />
          <MovieGrid year={year} moviesRanked={movieTitlesByGross} moviesLookup={movieDataList[`movieData${year}`]} />
        </div>
      </header>
    </div>
  );
}

export default App;
