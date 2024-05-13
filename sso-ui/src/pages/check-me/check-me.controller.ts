import * as yup from 'yup'
import { usePlatform } from '../../context/platform.context'
import { FormController, useFormController } from '../../controllers/form.controller'
import { useMayoCustomerSSO } from '../../services/mayo-customer-sso.service'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .email('Informe um email válido')
    .required('Informe um usuário')
})

export interface CheckMeFields {
  username: string
}

export function useCheckMeController() {
  const initialValues: CheckMeFields = {
    username: ''
  }

  const { checkMe } = useMayoCustomerSSO()
  const { uuid } = usePlatform()

  async function onSubmit(values: CheckMeFields) {
    const response = await checkMe(values.username)

    let url = '/register'

    if (response.isUser) {
      url = '/login'
    }

    window.location.href = `${url}?uuid=${uuid}&username=${values.username}`
  }

  const errorNotification: FormController<CheckMeFields>['errorNotification'] = {
    title: 'Erro ao validar o usuário'
  }

  return useFormController({
    onSubmit,
    initialValues,
    validationSchema,
    errorNotification,
  })
}