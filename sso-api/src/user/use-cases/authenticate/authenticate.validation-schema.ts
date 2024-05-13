import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  body: yup.object({
    username: yup.string().email('invalid email').required('username is required'),
    password: yup.string().required('password is required'),
    platformUUID: yup.string().required('platformUUID is required'),
  })
})