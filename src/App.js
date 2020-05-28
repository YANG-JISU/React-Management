import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './compoenent/customer';

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


class App extends Customer{
  render(){
    return (
      <div>
        {
        customers.map(c => {
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
        })
      }
      </div>
    );
  }
}

export default App;
