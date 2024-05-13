import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  body: yup.object({
    username: yup.string().email('invalid email').required('username is required'),
    password: yup.string().required('password is required'),
    name: yup.string().required('name is required'),
    phoneNumber: yup.string().required('phoneNumer is required'),
    email: yup.string().email('invalid email').required('email is required'),
    platformUUID: yup.string().required('platformUUID is required'),
  })
})