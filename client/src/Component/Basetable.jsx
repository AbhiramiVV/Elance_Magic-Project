import React from 'react'
import DataTable from "react-data-table-component";


const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
const customStyles = {
  headCells: {
    style: {
      
      backgroundColor: "#2d4d52",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
      color: "white",
    },
  },
 


  cells: {
    style: {
      fontSize: "16px",
      color: "#222222",
      backgroundColor: "white",
      
    },
  },
  pagination: {
    style: {
      backgroundColor: "white",
      color: "black",
    },
  },
  header: {
    style: {
      backgroundColor: "black",
      color: "white",
    },
  },
  subHeader: {
    style: {
      backgroundColor: "black",
      color: "white",
    },
  },
};

function Basetable(props) {
  return (
    <div style={{ border: "1px solid black", padding:'1px', background:'black', }}>
      <DataTable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
        selectableRowsComponentProps={selectProps}
        customStyles={customStyles}
        {...props}
      />
    </div>
  );
}

export default Basetable