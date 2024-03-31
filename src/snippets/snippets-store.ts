import { create } from 'zustand'
import Snippet from "./models/snippet.ts";
import LocalStorageSnippetsCollectionRepository from "./persistence/local-storage-snippets-collection-repository.ts";

interface SnippetsState {
  snippets: Snippet[],
  key: string,
  addSnippet: (snippet: Snippet) => void
  updateSnippet: (snippet: Snippet) => void
  removeSnippet: (id: string) => void
}

const _respository = new LocalStorageSnippetsCollectionRepository()
const defaultKey = "general-snippets"

const useSnippetsStore = create<SnippetsState>()((set) => {
  const storedCollection = _respository.get("general-snippets");

  return ({
    snippets: storedCollection.getSnippets(),
    key: defaultKey,

    addSnippet: (snippet: Snippet) =>
      set((state) => {
          const collection = _respository.get(state.key)
          collection.add(snippet)
          _respository.save(collection)
          return {...state, snippets: collection.getSnippets()}
        }
      ),

    updateSnippet: (snippet: Snippet) =>
      set(state => {
          const collection = _respository.get(state.key)
          collection.update(snippet)
          _respository.save(collection)
          return {...state, snippets: collection.getSnippets()}
        }
      ),

    removeSnippet: (id: string) => set(state => {
        const collection = _respository.get(state.key)
        collection.remove(id)
        _respository.save(collection)
        return {...state, snippets: collection.getSnippets()}
      }
    ),
  })
})


export default useSnippetsStore;
