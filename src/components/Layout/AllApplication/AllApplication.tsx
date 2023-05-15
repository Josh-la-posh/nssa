// import DataTable, { TableColumn } from 'react-data-table-component';
// import { Card } from '@/components/UI/Card';
// import { data } from '@/Data';

// // // A super simple expandable component.
// // const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

// type DataRow = {
//   sn: number;
//   school: string;
//   admin: string;
//   phone: number;
//   address: string;
//   city: string;
//   state: string;
//   status: string;
//   action: any;
// };

// const columns: TableColumn<DataRow>[] = [
//   {
//     name: 'S/N',
//     selector: (row) => row.sn,
//     sortable: true,
//   },
//   {
//     name: 'School Name',
//     selector: (row) => row.school,
//     sortable: true,
//   },
//   {
//     name: 'Admin Name',
//     selector: (row) => row.admin,
//     sortable: true,
//   },
//   {
//     name: 'Phone',
//     selector: (row) => row.phone,
//     sortable: true,
//   },
//   {
//     name: 'Address',
//     selector: (row) => row.address,
//     sortable: true,
//   },
//   {
//     name: 'City',
//     selector: (row) => row.city,
//     sortable: true,
//   },
//   {
//     name: 'State',
//     selector: (row) => row.state,
//     sortable: true,
//   },
//   {
//     name: 'Status',
//     selector: (row) => row.status,
//     sortable: true,
//   },
//   {
//     name: 'Action',
//     selector: (row) => row.action,
//     sortable: true,
//   },
// ];

// const customStyles = {
//   rows: {
//     style: {
//       minHeight: '44px', // override the row height
//     },
//   },
//   header: {
//       style: {
//           fontSize: '20px',

//       }
//   },
//   headCells: {
//     style: {
//         paddingLeft: '8px', // override the cell padding for head cells
//         paddingRight: '8px',
//     },
//   },
//   cells: {
//     style: {
//       paddingLeft: '8px', // override the cell padding for data cells
//       paddingRight: '8px',
//     },
//   },
// };

// function Table(): JSX.Element {
//   return (
//     <Card>
//       <div className="mt-7 mb-14">
//         <div className="">
//           <p className="text-priGreyColor text-15 font-700 leading-18">All Application</p>
//           <DataTable
//             columns={columns}
//             data={data}
//             // defaultSortField="school"
//             pagination
//             // expandableRows
//             // expandableRowsComponent={ExpandedComponent}
//             customStyles={customStyles}
//           />
//         </div>
//       </div>
//     </Card>
//   );
// }

// export default Table;

import { Card } from '@/components/UI/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
// import React from 'react';
// import { Table } from '.';
// import EnhancedTable from './Table';

type DataRow = {
  sn: number;
  school: string;
  admin: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  status: string;
  action: any;
};

export function AllApplication() {
  return (
    <Card>
      <div className="mt-7 mb-14">
        <div className="pl-6 pr-4 flex items-center">
          <p className="text-priGreyColor text-15 font-700 leading-18 mr-auto">All Application</p>
          <div className="search-bar mr-20 h-7 w-36 border border-greyLight rounded flex justify-between items-center pr-2 pl-3">
            <input type="text" placeholder="Search for ..." className="text-8 focus:outline-8" />
            <FontAwesomeIcon className="search-icon" icon="magnifying-glass" />
          </div>
          <div className="flex gap-2">
            <button className="sec-btn">
              Filter
            </button>
            <Link to="/appform">
              <button className="sec-btn">Add New School</button>
            </Link>
          </div>
        </div>
      </div>
      {/* <EnhancedTable /> */}
    </Card>
  );
}
