import styles from './styles.module.scss'
import {useEffect, useState} from "react"
import Snippet from "../../models/snippet.ts"
import { useToast } from '../../../toast/toast-provider.tsx';

export default function SnippetsList() {
  const [snippets, setSnippets] = useState<Snippet[]>([
    new Snippet("Test de cards 1", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj kdfsui iou ioio j b yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Test de cards 1", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Another one", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Test de cards 1", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj kdfsui iou ioio j b yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Test de cards 1", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Another one",  "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Test de cards 1", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj kdfsui iou ioio j b yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Test de cards 1", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Another one", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj"),
    new Snippet("Opa, testing", "kdfsui iou ioio j b hjkghkggty yt yt yt ghhbhb kjhnbhjk kl;kj ghhbhb kjhnbhjk kl;kj kdfsui iou ioio j b yt ghhbhb kjhnbhjk kl;kj")
  ])

  const [searchText, setSearchText] = useState("")
  const [filteredSnippets, setFilteredSnippets] = useState([])
  const { showToast } = useToast();

  useEffect(() => {
    const searchTextLower = searchText.toLowerCase();
    const filtered = snippets.filter(s => s.title.toLowerCase().includes(searchTextLower))
    setFilteredSnippets(filtered)
  }, [searchText, snippets])

  return (
    <div className={styles.wrapper}>
      <header>
        <input value={searchText} placeholder={"Busca por palavras chaves"} onChange={e => setSearchText(e.currentTarget.value )} />
        <button onClick={e => { e.preventDefault(); showToast('This is a success message!', 'success') }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M15 7.5C15 7.58648 14.9656 7.66943 14.9045 7.73058C14.8433 7.79173 14.7604 7.82609 14.6739 7.82609H7.82609V14.6739C7.82609 14.7604 7.79173 14.8433 7.73058 14.9045C7.66943 14.9656 7.58648 15 7.5 15C7.41352 15 7.33057 14.9656 7.26942 14.9045C7.20827 14.8433 7.17391 14.7604 7.17391 14.6739V7.82609H0.326087C0.239603 7.82609 0.156662 7.79173 0.0955087 7.73058C0.0343556 7.66943 0 7.58648 0 7.5C0 7.41352 0.0343556 7.33057 0.0955087 7.26942C0.156662 7.20827 0.239603 7.17391 0.326087 7.17391H7.17391V0.326087C7.17391 0.239603 7.20827 0.156662 7.26942 0.0955087C7.33057 0.0343556 7.41352 0 7.5 0C7.58648 0 7.66943 0.0343556 7.73058 0.0955087C7.79173 0.156662 7.82609 0.239603 7.82609 0.326087V7.17391H14.6739C14.7604 7.17391 14.8433 7.20827 14.9045 7.26942C14.9656 7.33057 15 7.41352 15 7.5Z"
              fill="white"/>
          </svg>
        </button>
      </header>

      { (snippets.length == 0) ? <EmptyMessage /> : <List snippets={filteredSnippets} /> }
    </div>
  )
}

function List({ snippets, searchText }: { snippets: Snippet[] }) {
  if(snippets.length == 0)
    return <NotFoundMessage />

  return (<div className={styles.list}>
    <h2>Snippets</h2>

    { snippets?.map(snippet => <Card key={snippet.id} snippet={snippet}></Card>) }
  </div>)
}

function Card({ snippet }: { snippet: Snippet }) {
  return <div className={styles.card}>
    <h3>{snippet.title}</h3>
    <p>{snippet.content}</p>
    <div className={styles.actionLayer}>
      <button className={styles.actionButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path
            d="M15.6522 0H4.52174C4.42949 0 4.34102 0.0320652 4.27579 0.0891415C4.21056 0.146218 4.17391 0.22363 4.17391 0.304348V3.65217H0.347826C0.255577 3.65217 0.167106 3.68424 0.101876 3.74131C0.0366459 3.79839 0 3.8758 0 3.95652V13.6957C0 13.7764 0.0366459 13.8538 0.101876 13.9109C0.167106 13.9679 0.255577 14 0.347826 14H11.4783C11.5705 14 11.659 13.9679 11.7242 13.9109C11.7894 13.8538 11.8261 13.7764 11.8261 13.6957V10.3478H15.6522C15.7444 10.3478 15.8329 10.3158 15.8981 10.2587C15.9634 10.2016 16 10.1242 16 10.0435V0.304348C16 0.22363 15.9634 0.146218 15.8981 0.0891415C15.8329 0.0320652 15.7444 0 15.6522 0ZM11.1304 13.3913H0.695652V4.26087H11.1304V13.3913ZM15.3043 9.73913H11.8261V3.95652C11.8261 3.8758 11.7894 3.79839 11.7242 3.74131C11.659 3.68424 11.5705 3.65217 11.4783 3.65217H4.86957V0.608696H15.3043V9.73913Z"
            fill="white"/>
        </svg>
      </button>
      <button className={styles.actionButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M14.7251 3.76676L11.2338 0.275711C11.1467 0.18832 11.0432 0.11898 10.9293 0.0716675C10.8153 0.0243547 10.6932 0 10.5698 0C10.4464 0 10.3242 0.0243547 10.2103 0.0716675C10.0963 0.11898 9.99286 0.18832 9.90576 0.275711L0.27499 9.90911C0.187566 9.99581 0.118238 10.099 0.0710323 10.2127C0.0238264 10.3265 -0.000317204 10.4484 3.14658e-06 10.5715V14.0626C3.14658e-06 14.3112 0.0987702 14.5496 0.274577 14.7254C0.450383 14.9012 0.688829 15 0.937457 15H4.42869C4.67712 15 4.91539 14.9014 5.09116 14.7258L14.7243 5.09241C14.8117 5.00532 14.881 4.90184 14.9283 4.7879C14.9756 4.67395 15 4.55179 15 4.42842C15 4.30504 14.9756 4.18288 14.9283 4.06893C14.881 3.95499 14.8117 3.85151 14.7243 3.76442L14.7251 3.76676ZM0.754653 10.313L7.81212 3.2551L9.55734 5.00101L2.49988 12.0581L0.754653 10.313ZM0.624972 14.0626V11.0676L2.2788 12.7213L3.93262 14.3751H0.937457C0.854581 14.3751 0.775099 14.3421 0.716497 14.2835C0.657895 14.2249 0.624972 14.1455 0.624972 14.0626ZM4.68727 14.2454L2.94205 12.5003L9.99951 5.44238L11.7447 7.18829L4.68727 14.2454ZM14.2829 4.65027L12.1869 6.74615L8.25428 2.81374L10.3495 0.717854C10.3785 0.688802 10.413 0.665754 10.4509 0.65003C10.4888 0.634305 10.5295 0.626211 10.5706 0.626211C10.6116 0.626211 10.6523 0.634305 10.6902 0.65003C10.7282 0.665754 10.7626 0.688802 10.7917 0.717854L14.2829 4.20813C14.3119 4.23714 14.335 4.27161 14.3507 4.30954C14.3664 4.34747 14.3745 4.38813 14.3745 4.4292C14.3745 4.47026 14.3664 4.51092 14.3507 4.54885C14.335 4.58679 14.3119 4.62125 14.2829 4.65027Z"
            fill="white"/>
        </svg>
      </button>
      <button className={styles.actionButton}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path
            d="M13.6957 2.4H10.3478V1.5C10.3478 1.10218 10.1875 0.720644 9.90212 0.43934C9.61674 0.158035 9.22968 0 8.82609 0H5.17391C4.77032 0 4.38326 0.158035 4.09788 0.43934C3.8125 0.720644 3.65217 1.10218 3.65217 1.5V2.4H0.304348C0.22363 2.4 0.146218 2.43161 0.0891415 2.48787C0.0320652 2.54413 0 2.62043 0 2.7C0 2.77956 0.0320652 2.85587 0.0891415 2.91213C0.146218 2.96839 0.22363 3 0.304348 3H1.21739V14.1C1.21739 14.3387 1.31359 14.5676 1.48482 14.7364C1.65604 14.9052 1.88828 15 2.13043 15H11.8696C12.1117 15 12.344 14.9052 12.5152 14.7364C12.6864 14.5676 12.7826 14.3387 12.7826 14.1V3H13.6957C13.7764 3 13.8538 2.96839 13.9109 2.91213C13.9679 2.85587 14 2.77956 14 2.7C14 2.62043 13.9679 2.54413 13.9109 2.48787C13.8538 2.43161 13.7764 2.4 13.6957 2.4ZM4.26087 1.5C4.26087 1.26131 4.35706 1.03239 4.52829 0.863604C4.69952 0.694821 4.93176 0.6 5.17391 0.6H8.82609C9.06824 0.6 9.30048 0.694821 9.47171 0.863604C9.64293 1.03239 9.73913 1.26131 9.73913 1.5V2.4H4.26087V1.5ZM12.1739 14.1C12.1739 14.1796 12.1418 14.2559 12.0848 14.3121C12.0277 14.3684 11.9503 14.4 11.8696 14.4H2.13043C2.04972 14.4 1.9723 14.3684 1.91523 14.3121C1.85815 14.2559 1.82609 14.1796 1.82609 14.1V3H12.1739V14.1ZM5.47826 6.3V11.1C5.47826 11.1796 5.4462 11.2559 5.38912 11.3121C5.33204 11.3684 5.25463 11.4 5.17391 11.4C5.09319 11.4 5.01578 11.3684 4.95871 11.3121C4.90163 11.2559 4.86957 11.1796 4.86957 11.1V6.3C4.86957 6.22044 4.90163 6.14413 4.95871 6.08787C5.01578 6.03161 5.09319 6 5.17391 6C5.25463 6 5.33204 6.03161 5.38912 6.08787C5.4462 6.14413 5.47826 6.22044 5.47826 6.3ZM9.13043 6.3V11.1C9.13043 11.1796 9.09837 11.2559 9.04129 11.3121C8.98422 11.3684 8.90681 11.4 8.82609 11.4C8.74537 11.4 8.66796 11.3684 8.61088 11.3121C8.5538 11.2559 8.52174 11.1796 8.52174 11.1V6.3C8.52174 6.22044 8.5538 6.14413 8.61088 6.08787C8.66796 6.03161 8.74537 6 8.82609 6C8.90681 6 8.98422 6.03161 9.04129 6.08787C9.09837 6.14413 9.13043 6.22044 9.13043 6.3Z"
            fill="white"/>
        </svg>
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