export const url = {
  getAllSchoolAdminApplications: '/admin/school/applications',
  getApplicationsStat: '/admin/school/applications/statistics',
  reviewApplication: (applicationId: string) => `/admin/school/application/${applicationId}/review`,
  getApplication: (applicationId: string) => `/admin/school/application/${applicationId}/view`,
  rejectApplication: (applicationId: string) =>
    `/admin/school/application/${applicationId}/decline`,
  acceptApplication: (applicationId: string) =>
    `/admin/school/application/${applicationId}/approve`,
};

export const queryKey = {
  all: ['onboarding, school-admin'],
  getAllSchoolAdminApplications: (filters?: Record<string, any>) => [
    ...queryKey.all,
    'get-all-applications',
    { filters },
  ],
  getApplicationStat: () => [...queryKey.all, 'school-admin-applications-stat'],
  reviewApplication: (applicationId: string) => ['review-application', applicationId],
  rejectApplication: (applicationId: string) => ['reject-application', applicationId],
  acceptApplication: (applicationId: string) => ['accept-application', applicationId],
  getApplication: (applicationId: string) => [...queryKey.all, 'application', applicationId],
};
