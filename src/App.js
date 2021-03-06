import React, { Component } from 'react';
import 'react-table/react-table.css'
import'./App.css'
import TurnerReactTable from './components/TurnerReactTable.js'
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
