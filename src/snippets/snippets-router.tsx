import SnippetsList from "./pages/snippets-list/snippets-list.tsx";
import { RouteObject } from "react-router-dom";
import {SnippetsForm} from "./pages/snippets-form/snippets-form.tsx";

export default [
  {
    path: "/",
    element: <SnippetsList />
  },
  {
    path: "/snippets-form",
    element: <SnippetsForm />
  },
  {
    path: "/snippets-form/:id",
    element: <SnippetsForm />
  },
] as RouteObject[]

