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

// Search Handelers 
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
// Search by Company/Brand names

let data = [].concat(this.props.data);

if(this.state.searchBrand){
  // get company names that match searchString with name and/or brandNames
  data = this.props.data.filter((company) => {
    // check if search is in company name
    let companyMatches = company.name.toLowerCase().includes(this.state.searchBrand.toLowerCase());
    // check if search is in brands of a particular company
    let filteredBrands = company.brands.filter((brand) => {
      return brand.brandName.toLowerCase().includes(this.state.searchBrand.toLowerCase())
    });
    // if search string is in company name or brand name return true
    if(companyMatches || filteredBrands.length > 0){
      return true;
    }  
    return false; 
  }).map((company) => {

    const companyClone = Object.assign({}, company);

    // check if search is in brands of a particular company
    companyClone.brands = company.brands.filter((brand) => {
      return brand.brandName.toLowerCase().includes(this.state.searchBrand.toLowerCase())
    });

    return companyClone;
  });
}

// Search by Location
if(this.state.searchLocation){
  data = this.props.data.filter((company) => {
    let companyMatches = company.location.toLowerCase().includes(this.state.searchLocation.toLowerCase());
    let filteredLocation = company.brands.filter((brand) => {
      return brand.brandName.toLowerCase().includes(this.state.searchLocation.toLowerCase())
    });
    if (companyMatches || filteredLocation.length > 0){
      return true;
    }
    return false;
  }).map((company)=>{
    const companyClone = Object.assign({},company);

    companyClone.brands = company.brands.filter((brand)=>{
      return brand.brandName.toLowerCase().includes(this.state.searchLocation.toLowerCase());
    });
    return companyClone;
  });
};

// Search by Category
if(this.state.searchCategory){
  data = this.props.data.filter((company) => {
    let companyMatches = company.category.toLowerCase().includes(this.state.searchCategory.toLowerCase());
    let filteredCategory = company.brands.filter((brand) => {
      return brand.category.toLowerCase().includes(this.state.searchCategory.toLowerCase())
    });
    if (companyMatches || filteredCategory.length > 0){
      return true;
    }
    return false;
  }).map((company)=>{
    const companyClone = Object.assign({},company);

    companyClone.brands = company.brands.filter((brand)=>{
      return brand.category.toLowerCase().includes(this.state.searchCategory.toLowerCase());
    });
    return companyClone;
  });
};





 

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
             <input value={this.state.searchBrand}
                    onChange={(e)=>{this.handleBrandSearch(e)}} 
                    placeholder="Search Brands"
                    style={{height: "30px", width: "200px", fontSize:"1em"}}
                    /> 
             <select 
                  value={this.state.searchLocation}
                  onChange={(e)=>{this.handleLocationSearch(e)}}
                  defaultValue='Search Locations'
                  style={{height: "30px", width: "200px", fontSize:"1em"}}>
                    
                    <option value="">Worldwide</option>
                    <option value="USA">USA</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>    
             </select> 
             <select
                  style={{height: "30px", width: "200px", fontSize:"1em"}}
                  onChange={(e)=>{this.handleCategorySearch(e)}}>
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
    




