import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  body: yup.object({
    name: yup.string().required('name is required'),
    url: yup.string().url().required('url is required'),
    logo: yup.string().required('logo is required'),
    redirectUrl: yup.string().required('redirectUrl is required'),
  })
})