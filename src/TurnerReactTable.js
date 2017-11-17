import React, { Component } from 'react';
import ReactTable from 'react-table'




export default class TurnerReactTable extends Component {

 render() {
  
  const data = [{
    name: 'Samsung',
    type: 'External',
    location: 'Worldwide',
    version: 'International',
    category: 'Company',
    friend: {
      name: 'Jason Maurer',
      age: 23
    }
  },{
    name: 'Turner',
    type: 'Internal',
    location: 'USA',
    version: 'US Only',
    category: 'Company',
    friend: {
      name: 'Jason Maurer',
      age: 23
    }
    }];

  const columns = [{
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Type',
    accessor: 'type',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'Location',
    accessor: 'location',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'Version',
    accessor: 'type',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'Category',
    accessor: 'category',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age'
  }]

    
    return (
      <div>
           <ReactTable
              data={data}
              columns={columns}
            />
      </div>
    )
  }
}
    




