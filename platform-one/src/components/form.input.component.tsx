import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { ChangeEvent } from "react"

export interface FormInputProps<T> {
  label: string
  inputName: string
  values: T,
  errors: any,
  touched?: any,
  handleChange: (e: ChangeEvent<any>) => void,
  handleBlur?: (e: ChangeEvent<any>) => void,
  placeholder?: string
  type?: string
  disabled?: boolean
  readOnly?: boolean
}

export function FormInput({
  label,
  inputName,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  placeholder,
  type,
  disabled,
  readOnly
}: FormInputProps<any>) {
  return (
    <>
      <label htmlFor={inputName} className={"block text-sm font-semibold leading-6 text-gray-900 " + ((errors[inputName] && (!touched || (touched && touched[inputName]))) ? "text-red-600" : "")}> {label} </label>
      <div className="relative mt-2.5">
        <input
          id={inputName}
          name={inputName}
          type={type || "text"}
          autoComplete={inputName}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[inputName]}
          placeholder={placeholder}
          className={
            "block w-full rounded-md px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +
            ((errors[inputName] && (!touched || (touched && touched[inputName]))) ? "border-red-400" : "border-0")
          }
          disabled={disabled}
          readOnly={readOnly}
        />
        {errors[inputName] && (!touched || (touched && touched[inputName])) && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {(errors[inputName] && (!touched || (touched && touched[inputName]))) && (
        <p className="mt-2 text-xs text-red-600" id="email-error"> {errors[inputName]} </p>
      )}
    </>
  )
}