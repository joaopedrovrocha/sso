import * as yup from 'yup'
import { usePlatform } from '../../context/platform.context'
import { FormController, useFormController } from '../../controllers/form.controller'
import { useMayoCustomerSSO } from '../../services/mayo-customer-sso.service'
import { useEffect, useState } from 'react'

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Informe um nome'),
  phoneNumber: yup
    .string()
    .required('Informe um telefone')
    .matches(/^\(\d{2}\)\d{5}\-\d{4}$/, { message: 'O telefone deve ter o formato (99)99999-9999' }),
  password: yup
    .string()
    .required('Informe uma senha')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, { message: 'Senha deve conter pelo menos 5 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número' })
})

export interface RegisterFields {
  name: string
  phoneNumber: string
  password: string
  username: string
}

export function useRegisterController() {
  const [initialValues, setInitialValues] = useState<RegisterFields>({
    name: '',
    phoneNumber: '',
    password: '',
    username: ''
  })

  const { username, uuid } = usePlatform()
  const { register } = useMayoCustomerSSO()

  useEffect(() => {
    if (username) {
      setInitialValues({ ...initialValues, username })
    }
  }, [username])

  async function onSubmit(values: RegisterFields) {
    if (!username || !uuid) {
      throw new Error('usuário/uuid não encontrado')
    }

    await register(username, values.password, values.name, values.phoneNumber.replace(/[^\d]/g, ''), username, uuid)

    setTimeout(() => {
      window.location.href = `/login?uuid=${uuid}&username=${username}`
    }, 3000)
  }

  const successNotification: FormController<RegisterFields>['successNotification'] = {
    title: 'Cadastro realizado com sucesso!',
    message: 'Aguarde, você está sendo redirecionado...'
  }

  const errorNotification: FormController<RegisterFields>['errorNotification'] = {
    title: 'Erro ao realizar o cadastro'
  }

  return useFormController({
    onSubmit,
    initialValues,
    validationSchema,
    errorNotification,
    successNotification,
  })
}