import { Attachment, AuthUser, Country, CountryState } from '@/features/auth';

export type TSchoolApplication = {
  id: string;
  schoolName: string;
  schoolCode: string;
  schoolAddress: string;
  schoolPhoneNumber: string;
  schoolOwnerFirstName: string;
  schoolOwnerLastName: string;
  schoolOwnerEmail: string;
  schoolOwnerGender: string;
  schoolOwnerCountry: Country;
  schoolSize: string;
  city: string;
  state: CountryState;
  country: Country;
  documents: Attachment[];
  applicant: AuthUser;
  status: string;
  blocked: boolean;
  comment: string;
  schoolAdminIsOwner: boolean;
  school: null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
