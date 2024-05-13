import { Form, GenericFormProps } from "../../components/form.component"
import { FormInput } from "../../components/form.input.component"

interface RegisterFormInput {
  name: string
  phoneNumber: string
  password: string
}

export function RegisterForm({
  values,
  errors,
  touched,
  handleSubmit,
  handleChange,
  handleBlur,
  isSubmitting,
}: GenericFormProps<RegisterFormInput>) {

  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitText="Cadastrar"
        handleBackButton
      >
        <div>
          <FormInput
            label="Nome *"
            inputName="name"
            values={values}
            errors={errors}
            handleChange={handleChange}
            touched={touched}
            handleBlur={handleBlur}
            placeholder="João"
          />
        </div>

        <div>
          <FormInput
            label="Telefone *"
            inputName="phoneNumber"
            values={values}
            errors={errors}
            handleChange={handleChange}
            touched={touched}
            handleBlur={handleBlur}
            placeholder="(99)99999-9999"
          />
        </div>

        <div className="sm:col-span-2">
          <FormInput
            label="Email *"
            inputName="username"
            values={values}
            errors={errors}
            handleChange={handleChange}
            touched={touched}
            handleBlur={handleBlur}
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
            touched={touched}
            handleBlur={handleBlur}
          />
        </div>
      </Form>
    </>
  )
}