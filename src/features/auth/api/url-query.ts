export const url = {
  logout: '/auth/logout',
  login: '/auth/admin/login',
  schoolSignup: '/auth/school/register',
  signupWithGoogle: '/auth/google',
  signupWithGithub: '/auth/github',
  signupWithLinkedin: '/auth/linkedin',
  socialAuthTempCodeExchange: '/auth/tcode-auth',
  getUser: '/auth/user',
  sessionExists: '/auth/session-exists',
  refreshToken: '/auth/token',
  confirmEmail: '/auth/email/confirmation',
  confirmEmailWithToken: '/auth/email/confirmation-token',
  resendVerificationEmail: '/auth/email/resend-verification',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  resetPasswordTokenValidity: '/auth/check-token',
  getCountries: '/auth/countries',
  getCountryStates: (countryId: string) => `/auth/country/${countryId}/states`,
};

export const queryKey = {
  all: ['auth'],
  getUser: () => [...queryKey.all, 'user'],
  getCountries: () => [...queryKey.all, 'countries'],
  getCountryStates: (countryId?: string) => [...queryKey.all, 'country-states', countryId],
  resendVerificationEmail: () => [...queryKey.all, 'resend-email-verification'],
};
