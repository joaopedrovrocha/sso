import ErrorNotification from "../../components/error.notification.component"
import { PageSubTitle } from "../../components/page-subtitle.component"
import { PageTitle } from "../../components/page-title.component"
import SuccessNotification from "../../components/success.notification.component"
import { usePlatform } from "../../context/platform.context"
import { useRegisterController } from "./register.controller"
import { RegisterForm } from "./register.form"

export function RegisterPage() {
  const { username, platform } = usePlatform()

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    errorNotification,
    successNotification
  } = useRegisterController()

  return (
    <>
      <PageTitle> <span className="text-lg">Mayo Delivery +</span> {platform?.name} </PageTitle>
      <PageSubTitle> Faça seu Cadastro. Você será redirecionado de volta ao finalizá-lo. </PageSubTitle>

      <RegisterForm
        values={values}
        errors={errors}
        touched={touched}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleBlur={handleBlur}
        isSubmitting={isSubmitting}
      />

      <ErrorNotification
        title={errorNotification?.title}
        message={errorNotification?.message}
        show={errorNotification?.show}
      />

      <SuccessNotification
        title={successNotification?.title}
        message={successNotification?.message}
        show={successNotification?.show}
      />
    </>
  )
}