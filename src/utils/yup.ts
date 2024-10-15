
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(10).required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
    .required('Phone number is required'),
  company: Yup.string().required('Company name is required'),
  title: Yup.string().required('Designation is required'),
});