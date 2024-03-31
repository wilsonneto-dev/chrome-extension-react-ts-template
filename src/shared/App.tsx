import { ToastProvider } from "../toast/toast-provider.tsx"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import snippetsRouter from "../snippets/snippets-router.tsx"
import "../i18n.ts"

const router = createBrowserRouter([
  ...snippetsRouter
]);

console.log(location.href)

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
