import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  body: yup.object({
    validationToken: yup.string().required('validationToken is required')
  })
})