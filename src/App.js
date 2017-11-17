import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import TurnerReactTable from './TurnerReactTable.js'

class App extends Component {


  render() {
    return (
      <div>
      
        <TurnerReactTable />

      </div>
    );
  }
}

export default App;
