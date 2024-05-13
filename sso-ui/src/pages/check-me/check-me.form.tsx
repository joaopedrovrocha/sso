import { Form, GenericFormProps } from "../../components/form.component"
import { FormInput } from "../../components/form.input.component"

interface CheckMeFormInput {
  username: string
}

export function CheckMeForm({
  handleSubmit,
  handleChange,
  values,
  errors,
  isSubmitting
}: GenericFormProps<CheckMeFormInput>) {
  return (
    <Form
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitText="Entrar / Cadastrar"
    >
      <div className="sm:col-span-2">
        <FormInput
          label="Email *"
          inputName="username"
          values={values}
          errors={errors}
          handleChange={handleChange}
          placeholder="Ex.: joao@mail.com"
        />
      </div>
    </Form>
  )
}