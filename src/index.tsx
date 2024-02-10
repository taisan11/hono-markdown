import fs from 'node:fs'
import { Hono } from 'hono'
import MarkdownIt from 'markdown-it'
import { renderer } from './renderer'

const app = new Hono()

const md = MarkdownIt({
  html: true,
  linkify: true
})

export const readFileSync = (path: string): string => {
  const markdownStr = fs.readFileSync(path, { encoding: 'utf-8' })

  return markdownStr
}

app.get('*', renderer)

app.get('/', (c) => {
  const markdownStr = readFileSync('./docs/top.md')
  const result = md.render(markdownStr);
  // biome-ignore lint/security/noDangerouslySetInnerHtml: It's by markdown-it
return  c.render(<div class="doc" dangerouslySetInnerHTML={{__html: result}} />)
})

export default app
