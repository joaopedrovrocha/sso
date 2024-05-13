import { PageSubTitle } from "../../components/page-subtitle.component";
import { PageTitle } from "../../components/page-title.component";
import { AppLayout } from "../../layout/app.layout";

export function NotFound() {
  return (
    <>
      <AppLayout>
        <PageTitle>
          Plataforma não encontrada
        </PageTitle>
        <PageSubTitle>
          Não foi possível encontrar a plataform. Volte a página anterior e tente novamente.
        </PageSubTitle>
      </AppLayout>
    </>
  )
}