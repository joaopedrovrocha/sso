import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  params: yup.object({
    platformUUID: yup.string().required('platformUUID is required')
  })
})