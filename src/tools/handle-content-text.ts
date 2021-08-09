import sanitize from 'sanitize-markdown'

import type { MessageEntity } from '~/core/store'
import { normalizeUrl } from '~/tools/normalize-url'

const ENTITY_TYPES = [
  { type: 'messageEntityTextUrl', tag: 'a' },
  { type: 'messageEntityUrl', tag: 'a' },
  { type: 'messageEntityPre', tag: 'pre', md: '```' },
  { type: 'messageEntityCode', tag: 'code', md: '`' },
  { type: 'messageEntityBold', tag: 'b', md: '**' },
  { type: 'messageEntityItalic', tag: 'i', md: '__' },
  { type: 'messageEntityUnderline', tag: 'u', md: '++' },
  { type: 'messageEntityStrike', tag: 's', md: '~~' },
  //{ type: 'messageEntityBlockquote', tag: 'q' },
]

export const parseInputText = (inputText: string) => {
  const div = self.document.createElement('div')
  div.innerHTML = textToHTML(inputText)
  const text = div.innerText.trim().replace(/\u200b+/g, '')
  const entities: MessageEntity[] = []
  let textIndex = 0
  let nesting = 0

  const handleChildNode = (node: ChildNode) => {
    const { textContent } = node
    const { index, entity } = parseChildNode(node, text, textIndex)

    if (entity) {
      textIndex = index
      entities.push(entity)
    } else if (textContent) {
      textIndex += textContent.length
    }

    if (nesting <= 3 && node.hasChildNodes()) {
      nesting += 1
      node.childNodes.forEach(handleChildNode)
    }
  }

  div.childNodes.forEach(childNode => {
    nesting = 1
    handleChildNode(childNode)
  })
  div.remove()

  return {
    text,
    entities
  }
}

const parseChildNode = (
  node: ChildNode,
  text: string,
  textIndex: number
): {
  index: number
  entity?: MessageEntity
} => {
  const { textContent, nodeName } = node
  const type = ENTITY_TYPES.find(({ tag }) => tag === nodeName.toLowerCase())?.type

  if (!type || !textContent) {
    return { index: textIndex }
  }

  const textContentIndex = text.indexOf(textContent, textIndex)
  const index = textContentIndex >= 0 ? textContentIndex : textIndex
  const offset = text.substring(0, index).length
  const length = text.substring(index, index + textContent.length).length

  let url: string|undefined
  if (nodeName.toLowerCase() === 'a') {
    url = (node as HTMLAnchorElement).href
  }

  return {
    index: textIndex,
    entity: { type, offset, length, url }
  }
}

export const normalizeMessageText = (text: string, entities?: MessageEntity[]) => {
  return entities?.length ?
    textToHTML(stringifyEntities(text, entities, { forceUrl: true })) :
    text
}

export const normalizeInputText = (text: string, entities?: MessageEntity[]) => {
  return entities?.length ?
    stringifyEntities(text, entities, { forceUrl: false }) :
    text
}

const stringifyEntities = (text: string, entities: MessageEntity[], { forceUrl = false } = {}) => {
  const flatEntities = entities.flatMap(({ type, offset, length, url }) => {
    const entityType = ENTITY_TYPES.find(entityType => entityType.type === type)

    if (!entityType || (
      entityType.tag === 'a' &&
      !forceUrl &&
      !url
    )) return []

    let startFragment = ''
    let endFragment = ''

    if (entityType.tag === 'a') {
      url = url || text.slice(offset, offset + length)
      startFragment = '['
      endFragment = `](${normalizeUrl(url)})`
    } else {
      startFragment = endFragment = (entityType.md || '')
    }

    return [
      { index: offset, fragment: startFragment, start: true },
      { index: offset + length, fragment: endFragment, end: true },
    ]
  }).sort((a, b) => (a.index === b.index && a.end && b.end) ? -1 : a.index - b.index)

  if (!flatEntities?.length) {
    return text
  }

  const startTextPart = text.slice(0, flatEntities[0].index)
  const lastTextParts = flatEntities.map(({ index, fragment }, partIndex) => {
    const nextEntity = flatEntities[partIndex + 1]
    return `${fragment}${index === nextEntity?.index ? '' : text.slice(index, nextEntity?.index)}`
  })

  return `${startTextPart}${lastTextParts.join('')}`
}

const textToHTML = (text: string) => {
  text = text.replace(/\[([^[]+)\]\(([^)]+)\)/gmi, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  text = text.replace(/^```(.*[\n\r][^]*?^)```/gm, '<pre>$1</pre>')
  text = text.replace(/```([^`]+)```/g, '<pre>$1</pre>')
  text = text.replace(/`([^`\n]+)`/g, '<code>$1</code>')
  text = text.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
  text = text.replace(/__([^_\n]+)__/g, '<i>$1</i>')
  text = text.replace(/\+\+([^+\n]+)\+\+/g, '<u>$1</u>')
  text = text.replace(/~~([^~\n]+)~~/g, '<s>$1</s>')

  return sanitize(text, {
    allowedTags: ['a', 'pre', 'code', 'b', 'i', 'u', 's'],
    allowedAttributes: {
      a: ['href', 'target', 'rel']
    }
  })
}
