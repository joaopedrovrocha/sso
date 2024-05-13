import { FormikErrors, FormikTouched } from "formik"
import { ChangeEvent } from "react"

export interface GenericFormProps<T> {
  values: T
  errors: FormikErrors<T>
  touched?: FormikTouched<T>
  handleSubmit: () => void
  handleChange: (e: ChangeEvent<any>) => void
  handleBlur?: (e: ChangeEvent<any>) => void
  isSubmitting: boolean
}

interface FormProps {
  handleSubmit: () => void
  isSubmitting: boolean
  children: React.ReactNode
  handleBackButton?: boolean
  onBackButton?: () => void
  submitText: string
  extraButtons?: React.ReactNode
}

export function Form({
  handleSubmit,
  isSubmitting,
  children,
  handleBackButton,
  submitText,
  onBackButton,
  extraButtons,
}: FormProps) {

  function handleBack() {
    if (onBackButton) {
      onBackButton()

      return
    }

    window.history.back()
  }

  return (
    <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"> {children} </div>
      <div className="mt-10 flex justify-end border-t border-gray-900/10 pt-8">
        {extraButtons}

        {handleBackButton && (
          <button
            type="button"
            className="ml-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleBack}
          >
            Voltar
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {submitText}
        </button>
      </div>
    </form>
  )
}