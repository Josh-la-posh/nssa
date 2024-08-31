type SchoolOwnerInfoProp = {
  schoolOwnerCountry: string;
  schoolOwnerEmail: string;
  schoolOwnerFirstName: string;
  schoolOwnerGender: string;
  schoolOwnerLastName: string;
  schoolAdminIsOwner: boolean;
};
export const SchoolOwnerInfo = ({
  schoolOwnerCountry,
  schoolOwnerEmail,
  schoolOwnerFirstName,
  schoolOwnerGender,
  schoolOwnerLastName,
  schoolAdminIsOwner,
}: SchoolOwnerInfoProp) => {
  return (
    <>
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px] text-center mb-4">
        School Owner Details
      </h3>
      <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
          First name
        </p>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
          {schoolOwnerFirstName}
        </p>
      </div>
      <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
          Last name
        </p>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
          {schoolOwnerLastName}
        </p>
      </div>
      <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
          Email
        </p>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
          {schoolOwnerEmail}
        </p>
      </div>
      <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
          Gender
        </p>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
          {schoolOwnerGender}
        </p>
      </div>
      <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
          Country
        </p>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
          {schoolOwnerCountry}
        </p>
      </div>
      <div className="border-b-[1px] border-[#EAEBED] pl-[35px] pr-[32px] pt-[18px] pb-[20px] flex flex-wrap gap-[20px] justify-between">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-[16px] tracking-[0.2px]">
          Is Admin
        </p>
        <p className="font-bold text-gray-800 dark:text-gray-100 text-[18px] tracking-[0.2px]">
          {schoolAdminIsOwner ? 'Yes' : 'No'}
        </p>
      </div>
    </>
  );
};
