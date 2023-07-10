import { Button } from '@chakra-ui/react';
import React, { useMemo, useState, useEffect } from 'react';
import axios from "../../instance/axios";
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useAuthContext } from '../../Hooks/useAuthContext';
import Superadminbar from '../../Component/Superadminbar';

const TextField = styled.input`
  height: 38px;
  width: 200px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 2px solid black;
  padding: 0 16px;

  &:hover {
    cursor: text;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 38px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const TransactionTable = () => {
  const { superadmin } = useAuthContext();
  const [data, setData] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/superadmin/transactions', {
        headers: {
          Authorization: `${superadmin.token}`,
        },
      });
      const { data } = response.data;
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Transaction Report";
    const headers = [["ManagerId", "UserId", "Date", "Payment Status"]];

    const datas = filteredItems.map((elt) => [
      elt.CaterId,
      elt.userId,
      elt.Date,
      elt.Paid,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: datas,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  function convertArrayOfObjectsToCSV(array) {
    let result;
    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;
        if (key !== "estimate") {
          result += item[key];

          ctr++;
        } else {
          // result += item[key].reduce((sum, amount) => { return (Number(sum) + Number(amount.price)) }, 0);

          ctr++;
        }
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <Button onClick={(e) => onExport(e.target.value)}>Export to CSV</Button>
  );

  const columns = [
    {
      name: "ManagerId",
      selector: (row) => row.CaterId.VendorId,
    },
    {
      name: "UserId",
      selector: (row) => row.userId,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
    },
    {
      name: "Payment Status",
      selector: (row) => row.Paid,
    },
  ];

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = data.filter((item) =>
    item.CaterId.VendorId && item.CaterId.VendorId.toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );

  return (
    <div className="flex">
      <Superadminbar />
      <div className="ml-72 mx-auto max-w-[2000px]" style={{width:"50%"}}>
        <Button onClick={() => exportPDF()} className="mx-auto mb-4">
          Transaction Report
        </Button>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          actions={actionsMemo}
          responsive
          dense
          noHeader
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
