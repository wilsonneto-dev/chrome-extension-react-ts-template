import SnippetsCollection from "./snippets-collection.ts";

export default interface ISnippetsCollectionRepository {
  save(collection : SnippetsCollection): void
  get(key: string): SnippetsCollection
}