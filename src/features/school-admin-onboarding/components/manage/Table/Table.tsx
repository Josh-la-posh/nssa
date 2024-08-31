import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Tag, Table, Button } from '@/components/Elements';
import { format } from '@/lib/date';
import { SelectOnchangeEventType } from '@/types/components/form';

import { useGetAllSchoolAdminApplications, useReviewApplication } from '../../../api';
import { TSchoolApplication } from '../../../types';

import { EmptyTable } from './EmptyTable';
import { ErrorComponent } from './Error';
import { TableHeader } from './TableHeader';

type FilterType = {
  search?: string;
  status?: string;
  sortBy?: string;
  page: number;
};

function filterQueryParam(arr: string[], obj: Record<string, any>) {
  const filteredObj: Record<string, any> = {};
  for (const key in obj) {
    if (arr.includes(key)) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}

export const ApplicationsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryKeyList = ['page', 'search', 'sortBy', 'status'];
  const _temp = Object.fromEntries(searchParams);
  const queries = filterQueryParam(queryKeyList, _temp);

  const [order, setOrder] = useState<{ key: string; type: 'asc' | 'desc' }>({
    key: '',
    type: 'desc',
  });

  const [filters, setFilters] = useState<FilterType>({ page: 1, ...queries });
  const [tableData, setTableData] = useState<TSchoolApplication[]>([]);

  const handleSearchParams = useCallback(
    (values: any) => {
      const data = {
        ...queries,
        ...values,
      };
      Object.keys(data).forEach((key) => {
        if (!data[key]) {
          delete data[key];
        }
      });
      setSearchParams(data, { replace: true });
    },
    [queries, setSearchParams]
  );

  // Handle Sort
  const handleSort = useMemo(
    () => (key: string) => {
      setOrder({ key, type: order.type === 'asc' ? 'desc' : 'asc' });

      const tableDataCopy: any[] = [...tableData];

      tableDataCopy.sort((a, b) => {
        const fnameA = a[key]?.toLowerCase() || '';
        const fnameB = b[key]?.toLowerCase() || '';

        if (order.type === 'asc') {
          return fnameB.localeCompare(fnameA, 'en', {});
        }

        return fnameA.localeCompare(fnameB);
      });
      setTableData(tableDataCopy);
    },
    [order.type, tableData]
  );

  useEffect(() => {
    handleSearchParams({ ...filters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleOnFilterChange = (e: SelectOnchangeEventType) => {
    setFilters({ ...filters, status: e.target.value as string });
  };

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value as string });
  };

  const { data, error, isLoading, isFetching } = useGetAllSchoolAdminApplications({
    filter: {
      ...filters,
      // planIds: filters.planIds,
    },
    config: {},
  });

  const reviewApplicationMUT = useReviewApplication();

  useEffect(() => {
    if (data) {
      setTableData(data?.data);
    }
  }, [data]);

  const column = useMemo(
    () => [
      {
        title: 'S/N',
        accessor: 'index',
      },
      {
        title: 'School name',
        accessor: 'schoolName',
        sortFn: handleSort,
      },
      {
        title: 'School code',
        accessor: 'schoolCode',
        sortFn: handleSort,
      },
      {
        title: 'Admin Name',
        accessor: 'adminName',
      },
      {
        title: 'Owner Name',
        accessor: 'ownerName',
      },
      {
        title: 'address',
        accessor: 'schoolAddress',
      },
      {
        title: 'country',
        accessor: 'country',
      },
      {
        title: 'status',
        accessor: 'status',
      },
      {
        title: 'Date Created',
        accessor: 'createdAt',
        sortFn: handleSort,
      },
    ],
    [handleSort]
  );

  const allApplicationsPaginationData = data?.meta;
  const allApplications = useMemo(
    () =>
      tableData.map((application, index) => ({
        ...application,
        index: `${
          (Number(filters.page) - 1) * Number(allApplicationsPaginationData?.limit) + index + 1
        }.`,
        applicationStatus: application.status,
        status: (
          <div className="inline-flex flex-wrap items-center gap-1.5">
            <Tag
              hideStartIcon
              size="xs"
              className="!capitalize whitespace-nowrap"
              color={
                application.status === 'APPROVED'
                  ? 'success'
                  : application.status === 'PENDING'
                  ? 'pending'
                  : application.status === 'IN_REVIEW'
                  ? 'warning'
                  : 'error'
              }
              label={application.status.replace(/_/g, ' ')}
            />
          </div>
        ),

        adminName: (
          <span className="capitalize">
            {application.applicant.firstName} {application.applicant.lastName}
          </span>
        ),
        ownerName: (
          <span className="capitalize">
            {application.schoolOwnerFirstName} {application.schoolOwnerLastName}
          </span>
        ),
        country: application.country.name,
        createdAt: format(new Date(application?.createdAt), 'dd/MMM/yyyy'),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allApplicationsPaginationData?.limit, filters.page, tableData]
  );

  return (
    <div className="shadow rounded-md mt-8 py-8 px-6 bg-white">
      <TableHeader
        onFilterChange={handleOnFilterChange}
        filterValue={filters.status}
        onSearchChange={handleOnSearch}
        searchValue={filters.search}
      />

      <Table
        name="School Admin Applications"
        isLoading={isLoading}
        isFetching={isFetching}
        column={column}
        rawData={allApplications}
        emptyComponent={tableData.length === 0 ? <EmptyTable /> : null}
        errorComponent={
          <ErrorComponent
            refresh={() => {
              setFilters({ page: 1 });
            }}
            errorMessage={String((error as { message: string })?.message)}
          />
        }
        meta={{
          page: Number(filters.page),
          count: Number(allApplicationsPaginationData?.itemCount),
          rowsPerPage: Number(allApplicationsPaginationData?.limit),
          onPageChange: (page) => setFilters({ ...filters, page }),
        }}
        data={allApplications}
        action={(acc: TSchoolApplication & { applicationStatus: string }) => (
          <Button
            onClick={() => {
              if (acc.applicationStatus === 'PENDING') {
                reviewApplicationMUT.mutate(acc.id);
              }

              navigate(`/onboarding/school-admin/${acc.id}`);
            }}
            variant="outlined"
            size="sm"
            className="!flex px-2 text-blue-600 w-full !justify-start"
          >
            View
          </Button>
        )}
      />
    </div>
  );
};
