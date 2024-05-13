import ErrorNotification from "../../components/error.notification.component";
import { PageSubTitle } from "../../components/page-subtitle.component";
import { PageTitle } from "../../components/page-title.component";
import { usePlatform } from "../../context/platform.context";
import { useCheckMeController } from "./check-me.controller";
import { CheckMeForm } from "./check-me.form";

export function CheckMePage() {
  const { platform } = usePlatform()

  const { values, errors, handleSubmit, handleChange, isSubmitting, errorNotification } = useCheckMeController()

  return (
    <>
      <PageTitle>
        <span className="text-lg">Mayo Delivery +</span> {platform?.name}
      </PageTitle>

      <PageSubTitle>
        Seja bem vindo à {platform?.name} <br />
        Informe o seu email para prosseguir com o seu cadatro/login.
      </PageSubTitle>

      <CheckMeForm
        errors={errors}
        values={values}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <ErrorNotification
        title={errorNotification?.title}
        message={errorNotification?.message}
        show={errorNotification?.show}
      />
    </>
  )
}