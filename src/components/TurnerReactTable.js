import React, { Component } from 'react';
import ReactTable from 'react-table'
import CheckboxParent from './CheckboxParent.js'




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

  const companyColumns = [{
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
    Header: 'Published',
    accessor: 'published', // Custom value accessors!
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">Show All</option>
        <option value="published">published</option>
        <option value="unpublished">unpublished</option>
      </select>
  }]

  const brandColumns = [{
    
    accessor: 'brandName', // String-based value accessors!
    Cell: props => <span style={{ paddingLeft: "20px" }} className='number'><input type="checkbox"/> &nbsp; {props.value}</span> ,
    width: 500,
    sortable: false
  }, {
   
    accessor: 'type',
    Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
    filterable: false,
    sortable: false
  }, {
    accessor: 'countryName',
    Cell: props => <span className='number'>{props.value}</span>,
    sortable: false, // Custom cell components!
  }, {
    accessor: 'version',
    Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
    filterable: false,
    sortable: false
  }, {
    accessor: 'category',
    Cell: props => <span className='number'>{props.value}</span>, // Custom cell components!
    filterable: false,
    sortable: false
  }, {
    accessor: 'published', // Custom value accessors!
  }, {
    expander: true,
    width: 65,
    Expander: ({ isExpanded, ...rest }) =>
      <div>
        {isExpanded
          ? <span>&#x2299;</span>
          : <span>&#x2295;</span>}
      </div>,
    style: {
      cursor: "pointer",
      fontSize: 25,
      padding: "0",
      textAlign: "center",
      userSelect: "none"
    }
  }
      
    ]

    
    return (
      <div>
           <ReactTable
              defaultPageSize={10}
              filterable
              data={data}
              columns={companyColumns}
              defaultFilterMethod={filterCaseInsensitive}
                SubComponent={(row) => {
                               
                  return (
                      <ReactTable
                          showPaginationBottom={false}
                          defaultPageSize={row.original.brands.length}
                          data={row.original.brands}
                          columns={brandColumns}
                            SubComponent={(row) => {
                              console.log('row', row) 
                              return (
                                  <div style={{padding: "20px"}}> 
                                  REPORT
                                  <br />
                                  {row.original.brandName}
                                  </div>
                                ) }}
                      /> 
                  ) 
                }} 
            />
      </div>
    )
  }
}
    




