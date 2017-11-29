import React, { Component } from 'react';
import ReactTable from 'react-table'
import CheckboxParent from './CheckboxParent.js'

let expandedGroups = {};


export default class TurnerReactTable extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchBrand: '',
      searchLocation:'',
      searchCategory:'',
      expanded: {},
      isCheckedBrandName:[]
    }
    this.handleCheckCompany = this.handleCheckCompany.bind(this);
    this.handleCheckBrand = this.handleCheckBrand.bind(this);
  }

// Search Handelers 
  handleBrandSearch(e){
    this.setState({
      searchBrand: e.target.value,
      expanded: expandedGroups
    });
  }
  handleLocationSearch(e){
    this.setState({
      searchLocation: e.target.value,
      expanded: expandedGroups
    }, ()=>{console.log('this.state.searchLocation', this.state.searchLocation, expandedGroups)});
  }
  handleCategorySearch(e){
    this.setState({
      searchLocation: '',
      searchBrand: '',
      searchCategory: e.target.value
    });
  }

//checkboxHandelers
// Select All
handleCheckCompany(e, props){
  // is id set to company name
  let selectedCompany = e.target.id
  console.log('props', props)

  // find the company that matches the selected company
  let company = props.original
  // get all brand names from  selected company
  let brandNames = company.brands.map((brand) => {
    return brand.brandName  
  });
  // if checkbox is checked add brandNames to existing state of isCheckedBrandName
  if (e.target.checked){ 
  // make new array from existing state and new brand names
    let newBrandArray = [...this.state.isCheckedBrandName, ...brandNames];

    this.setState({
    // set new state to existing state plus new brands with no duplicates
    isCheckedBrandName: Array.from(new Set(newBrandArray))
    }, ()=>{console.log('state selected names',this.state.isCheckedBrandName)})
  } else {
  // if checkbox is unchecked remove from isCheckedBrandName all the brands associated with selected company
  let removeBrands = this.state.isCheckedBrandName.filter((brand) => {
  // why does this work?
    return brandNames.includes(brand) === false;
  });
  this.setState({
    isCheckedBrandName: removeBrands,
    },()=>{console.log('state selected names removed company',this.state.isCheckedBrandName)});
  }
};


// Select One *** should this be based on if checked or not?
handleCheckBrand(e) {
  // id is set to brand name
  let brandName = e.target.id;
  // if the checked brand state does not include the selected brand, add it.
  if (e.target.checked === true && this.state.isCheckedBrandName.includes(brandName) === false) {
    this.setState({
    isCheckedBrandName: [...this.state.isCheckedBrandName, brandName]
  },() => {console.log('checked Brands',this.state.isCheckedBrandName)});
  } else if (e.target.checked === false) { 
  // if the checked brand state does not include the selected brand, remove it.
  let filterExistingBrandName = this.state.isCheckedBrandName.filter((b) => {
    return b !== brandName;
  })
  this.setState({
    isCheckedBrandName: filterExistingBrandName
    },()=>{console.log('checked Brands', this.state.isCheckedBrandName)});  
  }
}


// When all brands are selected check company, when company is selected but a brand is delecected, deselect company
areBrandsChecked(props){
  let brandNames = props.original.brands.map((brand) => {return brand.brandName;})
   return brandNames.every((brandName)=>{
     return this.state.isCheckedBrandName.includes(brandName)
   });
}
// fires when expaner arrow is clicked
handleRowExpanded(newExpanded, index, event) {
  // make a new object of existing values of expanded state
  let expandedTables = Object.assign({}, this.state.expanded);
  // if expandedTable is not expanded, expand it.
  if (expandedTables[index] === false || expandedTables[index] === undefined ) {
    expandedTables[index] = true;
  } else {
  // if expanded tables are expanded collapse them   
    expandedTables[index] = false;
  }
  this.setState({
    expanded: expandedTables
  });
}



render() {
  let data = [].concat(this.props.data);
  //let expandedGroups = this.state.expanded;

  // Search by Company/Brand names
  if(this.state.searchBrand){
    // get company names that match searchString with name and/or brandNames
   
    data = data.filter((company, index) => {
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
    }).map((company, index) => {

      const companyClone = Object.assign({}, company);
      // check if search is in brands of a particular company
      companyClone.brands = company.brands.filter((brand) => {
        return brand.brandName.toLowerCase().includes(this.state.searchBrand.toLowerCase())
      });
      return companyClone;

    });
    expandedGroups = data.map((element, index)=>{
      return expandedGroups[index] = true;
    }); 
  } else if (this.state.searchBrand === '' && this.state.searchLocation === ''){
      expandedGroups = data.map((element, index)=>{
        return expandedGroups[index] = false;
      });
      data = [].concat(this.props.data)
  }
   
  // Search by Location
  if(this.state.searchLocation){
    data = data.filter((company) => {
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
    
    expandedGroups = data.map((element, index)=>{
      return expandedGroups[index] = true;
    }); 
  }else if (this.state.searchBrand === '' && this.state.searchLocation === ''){
      expandedGroups = data.map((element, index)=>{
        return expandedGroups[index] = false;
      });
      data = [].concat(this.props.data);
}
  // Search by Category ***** FIND OUT WHAT WE ARE REALLY FILTERING HERE ********
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
   
// Company Columns
  const companyColumns = [{
    expander: true,
    width: 50
  }, {
    Header: 'Name',
    accessor: 'name', // String-based value accessors!
    Cell: (props) => {
      let index = props.index;
      let checked = this.areBrandsChecked(props);
    return(
      <span className='number'> 
        <input 
        type="checkbox" 
        id={props.value} 
        value={props.value}
        checked={checked}
        onChange={(e)=>{this.handleCheckCompany(e, props)}}/>
        <label htmlFor={props.value}> {props.value} </label>
      </span>
      )},

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

// Brand Columns
  const brandColumns = [{
    width: 50
  }, {
    accessor: 'brandName', // String-based value accessors!
    Cell: (props) => {
      
      let checked = false;
      
      if (this.state.isCheckedBrandName.includes(props.original.brandName)){
        checked = true;
      } else {
        checked = false
      };
      return (
        <span style={{ paddingLeft: "20px" }} className='number'>
        <input 
          type="checkbox" 
          id={props.value} 
          value={props.value}
          checked={checked}
          onChange={(e)=>{this.handleCheckBrand(e)}}/>
        <label htmlFor={props.value}> {props.value} </label></span>
        )},
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
       <input 
        value={this.state.searchBrand}
        onChange={(e)=>{this.handleBrandSearch(e)}} 
        placeholder="Search Brands"
        style={{height: "30px", width: "200px", fontSize:"1em"}}
        /> 
       <select 
        value={this.state.searchLocation}
        onChange={(e)=>{this.handleLocationSearch(e)}}
        style={{height: "30px", width: "200px", fontSize:"1em"}}>                   
          <option value="">Worldwide</option>
          <option value="USA">USA</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>    
       </select> 
       <select
        style={{height: "30px", width: "200px", fontSize:"1em"}}
        onChange={(e)=>{this.handleCategorySearch(e)}}>
          <option value="all">All Categories</option>
          <option value="Company">Company</option>
          <option value="Brand">Brand</option>
        </select>
      </div>
       <ReactTable
          defaultPageSize={10}
          data={data}
          columns={companyColumns}
          resizable={false}
          expanded={this.state.expanded}
          onExpandedChange={(newExpanded, index, event) => {this.handleRowExpanded(newExpanded, index, event)}}
            SubComponent={(row) => {
              console.log('row brands', row.original.brands)
              return (
              <ReactTable
                showPaginationBottom={false}
                defaultPageSize={row.original.brands.length}
                data={row.original.brands}
                columns={brandColumns}
                resizale={false}
                  SubComponent={(row) => {
                    //console.log('row', row) 
                    return (
                      <div style={{padding: "20px 20px 20px 50px", border:"solid black 1px",}}> 
                      Run new affinio report on @{row.original.brandName}                           
                      </div>
                    )}}/> 
                )}}/>
      </div>
    )
  }
}
    




