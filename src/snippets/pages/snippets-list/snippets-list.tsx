import {useEffect, useState} from "react"
import Snippet from "../../models/snippet.ts"
import useSnippetsStore from "../../snippets-store.ts";
import styles from './styles.module.scss'
import { Link } from "react-router-dom";
import List from "../../components/list/list.tsx";
import {useTranslation} from "react-i18next";

export default function SnippetsList() {
  const { t } = useTranslation();
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
        <input value={searchText} placeholder={t('search placeholder')} onChange={e => setSearchText(e.currentTarget.value )} />
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

function EmptyMessage() {
  const { t } = useTranslation()

  return (
    <div className={styles.empty}>
      <p>
        { t('no snippets') } <br />
        { t('no snippets advice') }
      </p>
    </div>
  )
}