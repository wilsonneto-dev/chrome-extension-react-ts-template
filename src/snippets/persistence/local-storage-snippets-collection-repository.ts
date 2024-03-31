import ISnippetsCollectionRepository from "../models/snippets-collection-repository.ts";
import SnippetsCollection from "../models/snippets-collection.ts";

class LocalStorageSnippetsCollectionRepository implements ISnippetsCollectionRepository {
  get(key: string) {
    const snippets = JSON.parse(localStorage.getItem(key) || "[]");
    return new SnippetsCollection(key, snippets ?? []);
  }

  save(collection: SnippetsCollection) {
    localStorage.setItem(collection.getKey(), JSON.stringify(collection.getSnippets()));
  }
}

export default LocalStorageSnippetsCollectionRepository