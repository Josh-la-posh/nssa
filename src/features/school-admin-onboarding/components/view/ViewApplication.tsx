import { Avatar, Button, Section, Spinner, Tag } from '@/components/Elements';
import { format } from '@/lib/date';

import { useGetApplication } from '../../api';
import { ReactComponent as BackBtnSvg } from '../../assets/icons/back-btn.svg';

import { SchoolApplicationActions } from './Action';
import { ApplicationDocument } from './Document';
import { SchoolOwnerInfo } from './SchoolOwner';

type ViewApplicationProp = {
  applicationId: string;
};
export const ViewApplication = ({ applicationId }: ViewApplicationProp) => {
  const { data, isLoading, refetch } = useGetApplication({ applicationId });

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading || (isLoading && !data)) {
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>;
  }

  if (!data) {
    return (
      <div className="h-full flex justify-center items-center flex-col">
        <h3 className="mb-3">Something went wrong try again later</h3>
        <Button onClick={handleRefetch}>Refresh</Button>
      </div>
    );
  }
  const { data: applicationData } = data;

  const {
    applicant,
    schoolName,
    schoolCode,
    schoolAddress,
    schoolPhoneNumber,
    schoolSize,
    documents,
    city,
    country,
    state,
    status,
    createdAt,
    updatedAt,
    comment,
    schoolOwnerCountry,
    schoolOwnerEmail,
    schoolOwnerFirstName,
    schoolOwnerGender,
    schoolOwnerLastName,
    schoolAdminIsOwner,
  } = applicationData;
  return (
    <>
      <div className="flex gap-3 items-center  pb-4">
        <Button.Link to={'/onboarding/school-admin'} variant="text">
          <BackBtnSvg />
        </Button.Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 capitalize">
          {data.data.applicant.firstName}&apos;s Application
        </h1>
      </div>

      <div className="h-full">
        <Section
          className="rounded-lg scroll-smooth
         bg-white py-[35px] px-[20px] dark:bg-blue-600"
        >
          <div className="rounded-xl relative border dark:border-gray-600 flex flex-col justify-between">
            <div className="p-6 flex flex-col gap-8 lg:flex-row lg:justify-between pb-12 relative z-10">
              <div className="flex items-start gap-6 flex-wrap">
                <Avatar
                  name={`${applicant && applicant.firstName} ${applicant && applicant?.lastName}`}
                  src={applicant?.avatar?.url}
                  textClassName="text-white"
                  className="mx-auto h-40 w-40 rounded-full !bg-blue-500 object-cover text-4xl"
                />
                <div className="space-y-2 pt-2 text-blue-600 dark:text-white">
                  <h3 className="sm:text-3xl text-2xl font-bold capitalize">
                    {applicant?.firstName || '-'} {applicant?.lastName || '-'}
                  </h3>
                  <div className="flex items-center flex-wrap gap-2">
                    {/* <MailIcon /> */}
                    <a
                      className="text-gray-800 text-ellipsis dark:text-gray-100 font-medium"
                      href={`mailto:${applicant?.email}`}
                    >
                      {applicant?.email}
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Tag
                      hideStartIcon
                      size="sm"
                      className="!capitalize whitespace-nowrap"
                      color={'info'}
                      label={applicant.accountType.replace(/_/g, ' ')}
                    />
                  </div>
                </div>
              </div>
              {(status === 'IN_REVIEW' || status === 'PENDING') && (
                <SchoolApplicationActions applicationId={applicationId} />
              )}
            </div>
            <div className="mt-[24px] px-4 pb-10 grid grid-flow-row-dense lg:grid-cols-3 gap-[10px] md:grid-cols-2 sm:grid-cols-1">
              <div className="col-span-2 border-[1px] border-[#EAEBED] rounded-[12px] pb-[22px]">
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    School Name
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {schoolName}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    School Code
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {schoolCode}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    School Size
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {schoolSize}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    School Phone number
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {schoolPhoneNumber}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    School Address
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {schoolAddress}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    School City
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {city}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    School State
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {state?.name ?? '-'}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    School Country
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {country?.name ?? '-'}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    Application Status
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    <Tag
                      hideStartIcon
                      size="xs"
                      className="!capitalize whitespace-nowrap"
                      color={
                        status === 'APPROVED'
                          ? 'success'
                          : status === 'PENDING'
                          ? 'pending'
                          : status === 'IN_REVIEW'
                          ? 'warning'
                          : 'error'
                      }
                      label={status.replace(/_/g, ' ')}
                    />
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    Comment
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {comment ?? '-'}
                  </p>
                </div>
                <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    Date of Application
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {format(new Date(createdAt), 'MMMM d, yyyy hh:mm')}
                  </p>
                </div>
                <div className="border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] flex flex-wrap gap-[20px] justify-between">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
                    Feedback Date
                  </p>
                  <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
                    {updatedAt && updatedAt !== createdAt
                      ? format(new Date(updatedAt), 'MMMM d, yyyy hh:mm')
                      : '-'}
                  </p>
                </div>
              </div>
              <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 border-[1px] border-[#EAEBED] rounded-[12px] py-[37px]  flex flex-col align-middle">
                <SchoolOwnerInfo
                  schoolOwnerEmail={schoolOwnerEmail}
                  schoolOwnerFirstName={schoolOwnerFirstName}
                  schoolOwnerLastName={schoolOwnerLastName}
                  schoolOwnerGender={schoolOwnerGender}
                  schoolAdminIsOwner={schoolAdminIsOwner}
                  schoolOwnerCountry={schoolOwnerCountry?.name ?? '-'}
                />
              </div>
            </div>
            <div className="py-10 px-14">
              <h3 className="mb-3">Documents({documents.length})</h3>
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-11">
                  {documents.map((document) => (
                    <ApplicationDocument key={document.id} attachment={document} />
                  ))}
                </div>
              ) : (
                <p className="text-center">No document is attached to this application</p>
              )}
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};
