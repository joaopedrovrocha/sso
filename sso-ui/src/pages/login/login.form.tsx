import { ChangeEvent } from "react"
import { Form } from "../../components/form.component"
import { FormInput } from "../../components/form.input.component"

interface LoginFormProps {
  values: { password: string }
  errors: { password?: string | undefined }
  handleSubmit: () => void
  handleChange: (e: ChangeEvent<any>) => void
  isSubmitting: boolean
  username: string
}

export function LoginForm({
  values,
  errors,
  handleSubmit,
  handleChange,
  isSubmitting,
  username
}: LoginFormProps) {

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitText="Entrar"
        handleBackButton
      >
        <div className="sm:col-span-2">
          <FormInput
            label="Email *"
            inputName="username"
            type="email"
            values={values}
            errors={errors}
            handleChange={handleChange}
            placeholder="Ex.: joao@mail.com"
            readOnly
          />
        </div>

        <div className="sm:col-span-2">
          <FormInput
            label="Senha *"
            inputName="password"
            type="password"
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
        </div>
      </Form>
    </>
  )
}