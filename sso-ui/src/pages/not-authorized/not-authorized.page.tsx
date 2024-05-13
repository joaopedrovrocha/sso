import { PageSubTitle } from "../../components/page-subtitle.component";
import { PageTitle } from "../../components/page-title.component";
import { AppLayout } from "../../layout/app.layout";

export function Unauthorized() {
  return (
    <>
      <AppLayout>
        <PageTitle>
          Token não encontrado
        </PageTitle>

        <PageSubTitle>
          Não foi possível encontrar o token de autenticação. Volte a página anterior e tente novamente.
        </PageSubTitle>
      </AppLayout>
    </>
  )
}