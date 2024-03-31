import Snippet from "../../models/snippet.ts";
import useSnippetsStore from "../../snippets-store.ts";
import {useNavigate} from "react-router-dom";
import {useToast} from "../../../toast/toast-provider.tsx";
import {MessageType} from "../../../toast/models/message.ts";
import styles from "./styles.module.scss";
import IconCopy from "../../icons/icon-copy.tsx";
import IconEdit from "../../icons/icon-edit.tsx";
import IconDelete from "../../icons/icon-delete.tsx";
import {useTranslation} from "react-i18next";

export default function Card({ snippet }: { snippet: Snippet }) {
  const removeSnippet = useSnippetsStore(state => state.removeSnippet)
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { t } = useTranslation()

  const removeSnippetClick = (id: string) => {
    removeSnippet(id)
    showToast(t('snippet removed'), MessageType.Success)
  }

  const copySnippetClick = (snippet: Snippet) => {
    navigator.clipboard.writeText(snippet.content).then(() => showToast(t('snippet copied'), MessageType.Success))
  }

  return <div className={styles.card}>
    <h3>{snippet.title}</h3>
    <p>{snippet.content}</p>

    <div className={styles.actionLayer}>
      <button className={styles.actionButton} onClick={() => copySnippetClick(snippet)} >
        <IconCopy />
      </button>
      <button className={styles.actionButton} onClick={() => navigate(`/snippets-form/${snippet.id}`)}>
        <IconEdit />
      </button>
      <button className={styles.actionButton} onClick={_ => removeSnippetClick(snippet.id)}>
        <IconDelete />
      </button>
    </div>
  </div>
}