import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAuth } from '../../context/auth.context'
import { usePlatform } from '../../context/platform.context'
import { FormController, useFormController } from '../../controllers/form.controller'

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Informe uma senha')
})

export interface LoginFields {
  username: string
  password: string
}

export function useLoginController() {
  const [initialValues, setInitialValues] = useState<LoginFields>({
    username: '',
    password: ''
  })

  const { username, uuid } = usePlatform()
  const { login } = useAuth()

  useEffect(() => {
    if (username) {
      setInitialValues({ ...initialValues, username })
    }
  }, [username])

  async function onSubmit(values: LoginFields) {
    if (!username || !uuid) {
      throw new Error('Erro ao carregar as propriedades: usuário e uuid')
    }

    await login(username, values.password, uuid)
  }

  const errorNotification: FormController<LoginFields>['errorNotification'] = {
    title: 'Erro ao realizar o login'
  }

  return useFormController({
    onSubmit,
    initialValues,
    validationSchema,
    errorNotification,
  })
}