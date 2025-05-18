import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ReactComponent as BronzeMedalSVG } from './bronze-medal.svg'
import { ReactComponent as SilverMedalSVG } from './silver-medal.svg'
import { ReactComponent as GoldMedalSVG } from './gold-medal.svg'


function Row(props: { row: any, place: number}) {
// function Row(props: { row: ReturnType<typeof createData> }) {
  const { row, place } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '&:hover': { cursor: 'pointer' }, '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ lineHeight: 0 }}>
          {place === 0 && <GoldMedalSVG />}
          {place === 1 && <SilverMedalSVG />}
          {place === 2 && <BronzeMedalSVG />}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.score}</TableCell>
        {/* <TableCell align="right">{row.wins}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Predictions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Prediction</TableCell>
                    <TableCell align="right">Actual</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell align="right">Gross</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.picks?.map((pickRow: any) => (
                    <TableRow key={pickRow.title}>
                      <TableCell component="th" scope="row">
                        {pickRow.title}
                      </TableCell>
                      <TableCell>{pickRow.prediction}</TableCell>
                      <TableCell align="right">{pickRow.actual}</TableCell>
                      <TableCell align="right">{pickRow.score}</TableCell>
                      <TableCell align="right">{pickRow.gross}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable({ rows } : any) {
  if (!rows?.length) {
    return (
      <Box>
        <Paper
          sx={{
            width: '70vw',
            height: '70vh',
            margin: 'auto',
            backgroundColor: 'honeydew',
            paddingTop: '30px'
          }}
          elevation={3} 
        >
          <Typography variant="h2" textAlign='center' sx={{ marginTop: '10px' }}>
            Awaiting Results...
          </Typography>
          <div style={{
            background: `url('https://i.gifer.com/8V9H.gif') no-repeat 50% 25%`,
            width: '100%',
            height: '100%'
          }} />
        </Paper>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width="30px"/>
            <TableCell width="10px"/>
            <TableCell>Academy Member</TableCell>
            <TableCell align="right">Score</TableCell>
            {/* <TableCell align="right">Years Won</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row: any, i: number) => (
            <Row key={`${row.name}-${row.score}`} row={row} place={i}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}