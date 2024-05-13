import { ChangeEvent } from "react"
import ReactInputMask from "react-input-mask"

export interface FormInputMaskProps<T> {
  mask: string
  label: string
  inputName: string
  values: T,
  errors: any,
  touched: any,
  handleChange: (e: ChangeEvent<any>) => void,
  handleBlur: (e: ChangeEvent<any>) => void,
  placeholder?: string
  type?: string
}

export function FormInputMask({
  mask,
  label,
  inputName,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  placeholder,
  type,
}: FormInputMaskProps<any>) {
  console.log('inputName', inputName, values)

  return (
    <>
      <label htmlFor={inputName} className={"block text-sm font-semibold leading-6 text-gray-900 " + ((errors[inputName] && touched[inputName]) ? "text-red-600" : "")}> {label} </label>
      <div className="mt-2.5">
        <ReactInputMask
          mask={mask}
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
            ((errors[inputName] && touched[inputName]) ? "border-red-400" : "border-0")
          }
        />
      </div>
      {(errors[inputName] && touched[inputName]) && (<span className="text-xs text-red-600">{errors[inputName]}</span>)}
    </>
  )
}