import { Card } from '@/components/UI/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Table from './Table';

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
        <div className="flex items-center">
          <p className="text-priGreyColor text-15 leading-18 mr-auto" style={{fontWeight: 700}}>All Application</p>
          <div className="search-bar mr-20 h-7 w-36 border border-greyLight rounded flex justify-between items-center pr-2 pl-3">
            <input type="text" placeholder="Search for ..." className="text-8 focus:outline-8" />
            <FontAwesomeIcon className="search-icon" icon="magnifying-glass" />
          </div>
          <div className="flex gap-2">
            <button className="sec-btn">Filter</button>
            <Link to="">
              <button className="sec-btn">Add New School</button>
            </Link>
          </div>
        </div>
      </div>
      <Table />
    </Card>
  );
}
