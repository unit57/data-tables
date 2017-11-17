import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import'./App.css'
import TurnerReactTable from './TurnerReactTable.js'
import brandSettingsData from './data/brand-setting-data.js'

class App extends Component {


  render() {
    return (
      <div className="reactTableParent">

        <TurnerReactTable data={brandSettingsData} />

      </div>
    );
  }
}

export default App;
