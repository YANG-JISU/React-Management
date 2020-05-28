import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './compoenent/customer';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
  minWidth: 1080
  }
})

const customers = [
  {
    'id': 1,
    'image': 'https://placeimg.com/63/63/1',
    'name': '가길동',
    'birth': '300000',
    'gender': 'M',
    'job': 'student'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/63/63/2',
    'name': '나길동',
    'birth': '4000000',
    'gender': 'F',
    'job': 'grammer'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/63/63/3',
    'name': '다길동',
    'birth': '5000000',
    'gender': 'FF',
    'job': 'student'
  }
]


class App extends Customer {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(c => {
              return (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birth={c.birth}
                  gender={c.gender}
                  job={c.job}

                />
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
