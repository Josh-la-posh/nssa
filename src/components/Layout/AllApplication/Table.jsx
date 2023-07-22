import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'rc-pagination';
import Loader from './Loader';
import { userData } from '@/Data';

// type Parameters = {
//   id: number,
//   size: number,
//   value: number,
//   current: number,
//   pageSize: number,
//   page: number,
//   type: string,
//   originalElement: number,
//   index: number,
// };

// type PageValue = {
//   current: number,
//   pageSize: number,
// };

// interface PaginationProps {
//   className: string;
//   showTotal: (total: number, range: [number, number]) => React.ReactNode;
//   onChange: (page: number, pageSize?: number) => void;
//   total: number;
//   current: number;
//   pageSize: number;
//   showSizeChanger: boolean;
//   itemRender: (page: number, type: 'page' | 'prev' | 'next') => React.ReactNode;
//   onShowSizeChange: (current: number, size: number) => void;
// }

export default function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(6);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [isOptionOpen, setIsOptionOpen] = useState(null);

  const headers = [
    'S/N',
    'School Name',
    'Admin Name',
    'Phone',
    'Address',
    'City',
    'State',
    'Status',
    'Acton',
  ];

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(data.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  function getData(current, pageSize) {
    return data.slice((current - 1) * pageSize, current * pageSize);
  }

  const PaginationChange = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === 'prev') {
      return <button>Prev</button>;
    }
    if (type === 'next') {
      return <button>Next</button>;
    }
    return originalElement;
  };

  // async function getDataFromApi() {
  //   await axios
  //     .get(`${URL}`)
  //     .then(function (response) {
  //       setData(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       const err = error.response.data;
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }

  function optionOpenHandler(id) {
    if (isOptionOpen === id) {
      setIsOptionOpen(null);
    } else {
      setIsOptionOpen(id);
    }
  }

  useEffect(() => {
    // getDataFromApi();
    const fetchData = setTimeout(() => {
      setData(userData);
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(fetchData);
    };
  }, []);

  return (
    <div>
      <div className="tableContent">
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <>
            <div className="tableContainer text-priGreyColor text-left">
              <table className="w-full">
                <thead style={{ display: 'table-header-group' }}>
                  <tr>
                    {headers.map((header, index) => {
                      return (
                        <th key={index} className="text-12 font-700 h-10">
                          {header}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    getData(current, size).map((data) => {
                      return (
                        <tr key={data.id}>
                          <td style={{ fontSize: '12px' }}>{data.sn}</td>
                          <td className="flex flex-col justify-center">
                            <p style={{ fontSize: '10px', fontWeight: 600 }}>{data.school}</p>
                            <p style={{ fontSize: '10px', fontWeight: 400 }}>{data.schoolEmail}</p>
                          </td>
                          <td>
                            <p style={{ fontSize: '10px', fontWeight: 600 }}>{data.admin}</p>
                            <p style={{ fontSize: '10px', fontWeight: 400 }}>{data.adminEmail}</p>
                          </td>
                          <td>{data.phone}</td>
                          <td>{data.address}</td>
                          <td>{data.city}</td>
                          <td>{data.state}</td>
                          <td>
                            <p
                              className={
                                data.status === 'Rejected' ? 'status_reject' : 'status_review'
                              }
                              style={{
                                fontSize: '8px',
                                fontWeight: 700,
                                height: '18px',
                                borderRadius: '11px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {data.status}
                            </p>
                          </td>
                          <td>
                            <Link to="/appform" className="tableLink">
                              {data.action}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <Pagination
              className="pagination-data"
              showTotal={(total, range) => `Showing ${range[1]} out of ${total}`}
              onChange={PaginationChange}
              total={data.length}
              defaultPageSize={size}
              pageSizeOptions={['6','12','18']}
              current={current}
              pageSize={size}
              showSizeChanger={false}
              itemRender={PrevNextArrow}
              onShowSizeChange={PerPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
