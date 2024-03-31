import Snippet from "./snippet.ts";

export default class SnippetsCollection {
  private readonly key: string
  private snippets: Snippet[]

  constructor(key :string, snippets: Snippet[] = []) {
    this.key = key
    this.snippets = snippets
  }

  public add(snippet: Snippet): void {
    this.snippets.push(snippet)
    this.sortSnippets()
  }

  public remove(id: string): void {
    this.snippets = this.snippets.filter(s => s.id !== id)
  }

  public update(snippet: Snippet) {
    this.remove(snippet.id)
    this.add(snippet)
  }

  public getSnippets(): Snippet[] {
    return this.snippets
  }

  public getKey(): string {
    return this.key
  }

  private sortSnippets() {
    this.snippets = this.snippets.sort(this.sortItemsCompare)
  }

  private sortItemsCompare(a: Snippet, b: Snippet) {
    let titleA = a.title.toUpperCase()
    let titleB = b.title.toUpperCase()

    if (titleA < titleB) return -1
    if (titleA > titleB) return 1
    return 0
  }
}
