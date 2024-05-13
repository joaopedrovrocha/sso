import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  query: yup.object({
    platformUUID: yup.string().required('platformUUID is required')
  }),
  session: yup.object({
    userId: yup.number().required('userId is required')
  })
})