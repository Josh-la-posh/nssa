import { AppLayout } from '@/components/Layout/AppLayout/AppLayout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApplicationForm } from '@/components/Form/ApplicationForm';

export function SchoolAppForm() {
  return (
    <>
      <AppLayout>
        <div className="pt-11 px-14">
          <div className="sec-heading" style={{ marginBottom: '2rem' }}>
            <Link to="">
              <FontAwesomeIcon icon="arrow-left" width="16px" />
            </Link>
            <span className="ml-5" style={{ color: '#333333' }}>
              Fill in School Application Details
            </span>
          </div>
          <ApplicationForm to="" style={{}} children={undefined} />
        </div>
      </AppLayout>
    </>
  );
}
