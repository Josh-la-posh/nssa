import { Button } from '@/components/Elements';
import { Input, Select } from '@/components/Form';
import { SelectOnchangeEventType } from '@/types/components/form';

const FILTER_OPTIONS_VALUE = [
  { label: 'All', value: '' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'In-review', value: 'IN_REVIEW' },
  { label: 'Blocked', value: 'BLOCKED' },
];

type TableHeaderProps = {
  onFilterChange: (e: SelectOnchangeEventType) => void;
  filterValue?: string;
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
  searchValue?: string;
};
export const TableHeader = ({
  onFilterChange,
  onSearchChange,
  filterValue,
  searchValue,
}: TableHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row w-full gap-8 mb-8">
      <div className="flex flex-wrap gap-5 sm:gap-0 justify-between sm:items-center w-full">
        <h3 className="text-[#828282] text-[15px] font-bold">All Application</h3>
        <Input
          size="sm"
          className="max-w-[100px]"
          placeholder="Search for school ...."
          onChange={onSearchChange}
          value={searchValue}
        />
      </div>
      <div className="flex flex-wrap gap-5 sm:gap-2 justify-end items-center w-full">
        <div className="w-[127px]">
          <Select
            className=""
            size="sm"
            options={FILTER_OPTIONS_VALUE}
            placeholder="Filter"
            onChange={onFilterChange}
            value={filterValue}
          />
        </div>

        <Button size="sm">Add New School</Button>
      </div>
    </div>
  );
};
