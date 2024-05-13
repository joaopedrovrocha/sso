import { useFormik } from "formik"
import { useState } from "react"
import * as yup from 'yup'
import { ErrorNotificationProps } from "../components/error.notification.component"
import { SuccessNotificationProps } from "../components/success.notification.component"
import { useApp } from "../context/app.context"

export interface FormController<T> {
  initialValues: T
  validationSchema: yup.ObjectSchema<any>
  onSubmit: (values: T) => Promise<any>
  successNotification?: { title: string, message: string }
  errorNotification: { title: string }
}

export function useFormController({
  initialValues,
  validationSchema,
  onSubmit,
  successNotification,
  errorNotification,
}: FormController<any>) {

  const [showErrorNotification, setShowErrorNotification] = useState<boolean>(false)
  const [errorNotificationState, setErrorNotification] = useState<ErrorNotificationProps>()

  const [showSuccessNotification, setShowSuccessNotification] = useState<boolean>(false)
  const [successNotificationState, setSuccessNotification] = useState<SuccessNotificationProps>()

  const { setIsLoading } = useApp()

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      setIsLoading(true)

      try {
        await onSubmit(values)

        if (successNotification) {
          setSuccessNotification({
            title: successNotification.title,
            message: successNotification.message,
            show: true,
          })
        }

      } catch (e) {
        setErrorNotification({
          title: errorNotification.title,
          message: (e as Error).message,
          show: true
        })

      } finally {
        setIsLoading(false)
      }
    }
  })

  return {
    ...formik,
    errorNotification: errorNotificationState,
    successNotification: successNotificationState,
  }
}