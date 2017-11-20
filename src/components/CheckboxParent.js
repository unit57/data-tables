import React, { Component } from 'react';
import shortid from 'shortid';
import ReactTable from 'react-table';

import CheckboxTableHOC from './CheckboxChild.js';

//const CheckboxTable = CheckboxTableHOC(ReactTable);

async function getData(data){
  const result = data
  // we are adding a unique ID to the data for tracking the selected records
  return result.map((item) => {
    const _id = shortid.generate();
    return {
      _id,
      ...item,
    }
  });
}

function getColumns(data){
  const columns = [];
  const sample = data[0];
  
  for(let key in sample){
    if(key==='_id') continue;
    columns.push({
      accessor: key,
      Header: key,
    })
  }
  return columns;
}



export default class CheckboxParent extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      data: null,
      columns: null,
      selection: [],
      selectAll: false,
    };
  }

  componentDidMount(){
    getData(this.props.data).then((data) => {
      const columns = getColumns(data);
      this.setState({ data, columns });
    });
  }
  
  toggleSelection = (key,shift,row) => {
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [
      ...this.state.selection
    ];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if(keyIndex>=0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0,keyIndex),
        ...selection.slice(keyIndex+1)
      ]
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({selection});
  }

  toggleAll = () => {
    const selectAll = this.state.selectAll?false:true;
    const selection = [];
    if(selectAll)
    {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach((item)=>{
        selection.push(item._original._id);
      })
    }
    this.setState({selectAll,selection})
  }

  isSelected = (key) => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  }

  logSelection = () => {
    console.log('selection:',this.state.selection);
  }

 render() {
    const { toggleSelection, toggleAll, isSelected, logSelection } = this;
    const { data, columns, selectAll } = this.state;
    const extraProps = {
      selectAll,
      isSelected,
      toggleAll,
      toggleSelection
    }

    return (
        <div style={{ padding: '10px'}}>
        CHECKBOX PARENT
        <h1>react-table - Checkbox Table</h1>
        <button onClick={logSelection}>Log Selection to Console</button>
        {` (${this.state.selection.length}) selected`}
        {
          data?
          <CheckboxTableHOC
            data={data}
            columns={columns}
            ref={(r)=>this.checkboxTable = r}
            className="-striped -highlight"
            {...extraProps}
          />
          :null
        }
      </div>
   

    )
  }
}
    




