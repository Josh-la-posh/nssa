import { useGetSchoolAdminApplicationsStat } from '../../api';

import { StatCard } from '.';

export const StatSection = () => {
  const { data, isPending } = useGetSchoolAdminApplicationsStat();
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
      <StatCard
        isLoading={isPending}
        title="Total Application"
        statValue={data?.data.totalApplications ?? 0}
        statValueColor="text-[#2B2C2E]"
      />
      <StatCard
        isLoading={isPending}
        title="Approved"
        statValue={data?.data.approvedApplications ?? 0}
        statValueColor="text-green"
      />
      <StatCard
        isLoading={isPending}
        title="In-Review"
        statValue={data?.data.inReviewApplications ?? 0}
        statValueColor="text-warning-400"
      />
      <StatCard
        isLoading={isPending}
        title="Blocked"
        statValue={data?.data.blockedApplications ?? 0}
        statValueColor="text-error"
      />
      <StatCard
        isLoading={isPending}
        title="Rejected"
        statValue={data?.data.rejectedApplications ?? 0}
        statValueColor="text-error"
      />
    </div>
  );
};
