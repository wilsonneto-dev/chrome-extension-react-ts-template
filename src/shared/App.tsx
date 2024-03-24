import { ToastProvider } from "../toast/toast-provider.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import snippetsRouter from "../snippets/snippets-router.tsx";

const router = createBrowserRouter([
  ...snippetsRouter
]);

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
