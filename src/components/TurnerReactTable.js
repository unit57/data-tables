import React, { Component } from 'react';
import ReactTable from 'react-table'




export default class TurnerReactTable extends Component {

 render() {

  let data = this.props.data;

  const filterCaseInsensitive = (filter, row) => {
      const id = filter.pivotId || filter.id;
      return (
          row[id] !== undefined ?
              String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
              :
              true
      );
  };  

  const columns = [{
    expander: true
  }, {
    Header: 'Name',
    accessor: 'name', // String-based value accessors!
    Cell: props => <span className='number'>{props.value}</span> ,
    width: 500,
  }, {
    Header: 'Type',
    accessor: 'type',
    Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
    filterable: false
  }, {
    Header: 'Location',
    accessor: 'location',
    Cell: props => <span className='number'>{props.value}</span>,
    sortable: false // Custom cell components!
  }, {
    Header: 'Version',
    accessor: 'version',
    Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
    filterable: false,
    sortable: false
  }, {
    Header: 'Category',
    accessor: 'category',
    Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
    filterable: false,
    sortable: false
  }, {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name, // Custom value accessors!
    filterable: false
  }, {
    Header: props => <span>Friend Age</span>, // Custom header components!
    accessor: 'friend.age',
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">Show All</option>
        <option value="21">21</option>
        <option value="23">23</option>
      </select>
  }]

    
    return (
      <div>
           <ReactTable
              filterable
              data={data}
              columns={columns}
              showPaginationBottom={false}
              defaultFilterMethod={filterCaseInsensitive}
              SubComponent={(row) => {
              return (
                <div>
                  SUB COMPONENT
                </div>
              )
            }}
            />
      </div>
    )
  }
}
    




