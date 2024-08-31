import * as Yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    phone(): StringSchema;
  }
}

export default Yup;
