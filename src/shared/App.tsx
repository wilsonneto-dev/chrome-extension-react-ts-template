import {ToastProvider} from "../toast/toast-provider.tsx";
import SnippetsList from "../snippets/pages/snippets-list/snippets-list.tsx";

function App() {
    return <ToastProvider>
        <SnippetsList></SnippetsList>
    </ToastProvider>
}

export default App
