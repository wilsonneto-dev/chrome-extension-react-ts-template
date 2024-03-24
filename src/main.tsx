import React from 'react'
import ReactDOM from 'react-dom/client'
import './shared/theme/theme.scss'
import SnippetsList from "./snippets/pages/snippets-list/snippets-list.tsx";
import App from "./shared/App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
