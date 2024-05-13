import ErrorNotification from "../../components/error.notification.component"
import { PageSubTitle } from "../../components/page-subtitle.component"
import { PageTitle } from "../../components/page-title.component"
import { usePlatform } from "../../context/platform.context"
import { useLoginController } from "./login.controller"
import { LoginForm } from "./login.form"

export function LoginPage() {
  const { platform, username } = usePlatform()
  const { values, errors, handleSubmit, handleChange, isSubmitting, errorNotification } = useLoginController()

  return (
    <>
      <PageTitle> <span className="text-lg">Mayo Delivery +</span> {platform?.name} </PageTitle>
      <PageSubTitle> Faça seu Login. Você será redirecionado para a loja em seguida. </PageSubTitle>

      <LoginForm
        values={values}
        errors={errors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
        username={username || ''}
      />

      <ErrorNotification
        title={errorNotification?.title}
        message={errorNotification?.message}
        show={errorNotification?.show}
      />
    </>
  )
}