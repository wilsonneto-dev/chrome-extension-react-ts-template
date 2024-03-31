import Snippet from "../../models/snippet.ts";
import styles from "./styles.module.scss";
import Card from "../card/card.tsx";
import {useTranslation} from "react-i18next";

export default function List({snippets}: { snippets: Snippet[] }) {
  const { t } = useTranslation()

  if (snippets.length == 0)
    return <NotFoundMessage/>

  return (
    <div className={styles.list}>
      <h2>{ t('snippets') }</h2>
      {snippets?.map(snippet => <Card key={snippet.id} snippet={snippet}/>)}
    </div>
  )
}

function NotFoundMessage() {
  const { t } = useTranslation()

  return (
    <div className={styles.empty}>
      <p>
        { t('search empty') }
      </p>
    </div>
  )
}