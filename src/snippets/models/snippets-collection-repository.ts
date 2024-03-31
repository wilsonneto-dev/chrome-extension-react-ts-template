import SnippetsCollection from "./snippets-collection.ts";

export default interface ISnippetsCollectionRepository {
  save(collection : SnippetsCollection)
  get(key: string)
}