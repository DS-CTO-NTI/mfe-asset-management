export class User {
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  loginId: string;
  orgUser = [
    {
      organization: {
        orgId: null,
        orgName: null,
      },
    },
  ];
  photo: any;
  externalUser: string = 'N';
  address1: string;
  address2: string;
  city: string = null;
  zip: string;
  country: string = null;
  emailAddress: string;
  mobileNumber: string;
  phoneNumber: string;
  userPassword = [
    {
      id: null,
      password: null,
    },
  ];
  requiresPassword: string = 'N';
  isenabled: string = 'Y';
  isactive: string = 'N';
  timezone: string = null;
  language: string = null;

}