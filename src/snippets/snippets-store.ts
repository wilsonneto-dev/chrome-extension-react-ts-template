import { create } from 'zustand'
import Snippet from "./models/snippet.ts";

interface SnippetsState {
  snippets: Snippet[]
  addSnippet: (snippet: Snippet) => void
  updateSnippet: (snippet: Snippet) => void
  removeSnippet: (id: string) => void
}

const useSnippetsStore = create<SnippetsState>()((set) => ({
  snippets: [] as Snippet[],

  addSnippet: (snippet: Snippet) =>
    set((state) =>
      ({snippets: [...state.snippets, snippet].sort(sortItemsCompare)})
    ),

  updateSnippet: (snippet: Snippet) =>
    set(state =>
      ({ snippets: [...state.snippets.filter(s => s.id !== snippet.id), snippet].sort(sortItemsCompare) })
    ),

  removeSnippet: (id: string) => set(state =>
    ({ snippets: [...state.snippets.filter(s => s.id !== id)].sort(sortItemsCompare) })
  ),
}))

function sortItemsCompare(a: Snippet, b: Snippet) {
  let titleA = a.title.toUpperCase();
  let titleB = b.title.toUpperCase();

  if (titleA < titleB)
    return -1;

  if (titleA > titleB)
    return 1;

  return 0;
}

export default useSnippetsStore;
