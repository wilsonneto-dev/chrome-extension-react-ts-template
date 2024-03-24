import {useEffect, useState} from "react"

import Snippet from "../../models/snippet.ts"
import {useToast} from '../../../toast/toast-provider.tsx';
import useSnippetsStore from "../../snippets-store.ts";
import {MessageType} from "../../../toast/models/message.ts";
import IconCopy from "../../icons/icon-copy.tsx";
import IconEdit from "../../icons/icon-edit.tsx";
import IconDelete from "../../icons/icon-delete.tsx";

import styles from './styles.module.scss'
import {Link, useNavigate} from "react-router-dom";

export default function SnippetsList() {
  const snippets = useSnippetsStore(state => state.snippets);

  const [searchText, setSearchText] = useState("")
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([])

  useEffect(() => {
    const searchTextLower = searchText.toLowerCase();
    const filtered = snippets.filter(s => s.title.toLowerCase().includes(searchTextLower))
    setFilteredSnippets(filtered)
  }, [searchText, snippets])

  return (
    <div className={styles.wrapper}>
      <header>
        <input value={searchText} placeholder={"Busca por palavras chaves"} onChange={e => setSearchText(e.currentTarget.value )} />
        <Link className={styles.button} to="/snippets-form">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M15 7.5C15 7.58648 14.9656 7.66943 14.9045 7.73058C14.8433 7.79173 14.7604 7.82609 14.6739 7.82609H7.82609V14.6739C7.82609 14.7604 7.79173 14.8433 7.73058 14.9045C7.66943 14.9656 7.58648 15 7.5 15C7.41352 15 7.33057 14.9656 7.26942 14.9045C7.20827 14.8433 7.17391 14.7604 7.17391 14.6739V7.82609H0.326087C0.239603 7.82609 0.156662 7.79173 0.0955087 7.73058C0.0343556 7.66943 0 7.58648 0 7.5C0 7.41352 0.0343556 7.33057 0.0955087 7.26942C0.156662 7.20827 0.239603 7.17391 0.326087 7.17391H7.17391V0.326087C7.17391 0.239603 7.20827 0.156662 7.26942 0.0955087C7.33057 0.0343556 7.41352 0 7.5 0C7.58648 0 7.66943 0.0343556 7.73058 0.0955087C7.79173 0.156662 7.82609 0.239603 7.82609 0.326087V7.17391H14.6739C14.7604 7.17391 14.8433 7.20827 14.9045 7.26942C14.9656 7.33057 15 7.41352 15 7.5Z"
              fill="white"/>
          </svg>
        </Link>
      </header>

      { (snippets.length == 0) ? <EmptyMessage /> : <List snippets={filteredSnippets} /> }
    </div>
  )
}

function List({ snippets }: { snippets: Snippet[] }) {
  if(snippets.length == 0)
    return <NotFoundMessage />

  return (
    <div className={styles.list}>
      <h2>Snippets</h2>
      { snippets?.map(snippet => <Card key={snippet.id} snippet={snippet} />) }
    </div>
  )
}

function Card({ snippet }: { snippet: Snippet }) {
  const removeSnippet = useSnippetsStore(state => state.removeSnippet);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const removeSnippetClick = (id: string) => {
    removeSnippet(id)
    showToast("Snippet removido com sucesso", MessageType.Success)
  }

  const copySnippetClick = (snippet: Snippet) => {
    navigator.clipboard.writeText(snippet.content).then(() => showToast("Snippet Copied", MessageType.Success))
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

function EmptyMessage() {
  return (
    <div className={styles.empty}>
      <p>
        Seu espaço para cards está vazio! 😊<br/>
        Crie seu primeiro card agora e torne seu dia a dia mais simples.
      </p>
    </div>
  )
}

function NotFoundMessage() {
  return (
    <div className={styles.empty}>
      <p>
        Ops! Parece que não encontramos nenhum card aqui... 😅
      </p>
    </div>
  )
}