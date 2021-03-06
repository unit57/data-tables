              SubComponent={(row) => {
                
              return (
                data.map((company,i)=>{
                  return company.brands.map((brand, i)=>{
                    return <div key={i}>{brand.brandName}</div>
                  })
                })
                ) 

            }}


            
            {
    expander: true
  }, 




                 row.original.brands.map((brand, i)=>{
                    return <div key={i}>{brand.brandName}</div>
                  })


           expanded={{ // The nested row indexes on the current page that should appear expanded
              0: false,
              1: true,

              }}

                const filterCaseInsensitive = (filter, row) => {
      const id = filter.pivotId || filter.id;
      return (
          row[id] !== undefined ?
              String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
              :
              true
      );
  }; 


  import React, { Component } from 'react';
import ReactTable from 'react-table'
import CheckboxParent from './CheckboxParent.js'




export default class TurnerReactTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchBrand: '',
      searchLocation:'',
      searchCategory:''
    }
  }

  handleBrandSearch(e){
    this.setState({
      searchLocation: '',
      searchBrand: e.target.value,
      searchCategory: ''
    });
  }
  handleLocationSearch(e){
    this.setState({
      searchLocation: e.target.value,
      searchBrand: '',
      searchCategory: ''
    });
  }
  handleCategorySearch(e){
    this.setState({
      searchLocation: '',
      searchBrand: '',
      searchCategory: e.target.value
    });
  }


 render() {

  let data = [];
  
  // search by name 
  if (this.state.searchBrand){
    data = this.props.data.filter((row) => {
      return row.name.toLowerCase().includes(this.state.searchBrand.toLowerCase())
    })
  }
  // search by location
  if (this.state.searchLocation){
    data = this.props.data.filter((row) => {
      return row.location.toLowerCase().includes(this.state.searchLocation.toLowerCase())
    })
  }
  // search by category status
  if (this.state.searchCategory){
    data = this.props.data.filter((row)=>{
      return row.category.includes(this.state.searchCategory) 
    })
  }
 

 

  const companyColumns = [{
    expander: true,
    width: 50
  }, {
    Header: 'Name',
    accessor: 'name', // String-based value accessors!
    Cell: props => <span className='number'> <input type="checkbox"/> {props.value}</span> ,
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
  },{
    width: 65,
    filterable: false,
    sortable: false
  }]

  const brandColumns = [{
    width: 50
  }, {
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
  }]

    
    return (
      <div>
        <div> 
             <input value={this.state.searchBrands}
                    onChange={(e)=>{this.handleBrandSearch(e)}} 
                    placeholder="Search Brands"
                    style={{height: "30px", width: "200px", fontSize:"1em"}}
                    /> 
             <input value={this.state.searchLocation}
                    onChange={(e)=>{this.handleLocationSearch(e)}} 
                    placeholder="Search Location"
                    style={{height: "30px", width: "200px", fontSize:"1em"}}
                    /> 
              <select
                    onChange={(e)=>{this.handleCategorySearch(e)}}
                  >
                    <option value="all">Show All</option>
                    <option value="Company">Company</option>
                    <option value="Brand">Brand</option>
                  </select>
        </div>


           <ReactTable
              defaultPageSize={10}
              data={data}
              columns={companyColumns}
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
                                  <div style={{padding: "20px 20px 20px 50px", border:"solid black 1px",}}> 
                                  Run new affinio report on @{row.original.brandName}                           
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
    




