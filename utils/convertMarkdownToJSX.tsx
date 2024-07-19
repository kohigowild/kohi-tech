export const convertMarkdownToJSX = (text: string) => {
  const boldPattern = /\*\*(.*?)\*\*/g
  const italicPattern = /_(.*?)_/g
  const codePattern = /`(.*?)`/g

  const jsxText = text
    .replace(boldPattern, (_, p1) => `<strong class="font-bold">${p1}</strong>`)
    .replace(italicPattern, (_, p1) => `<em class="italic">${p1}</em>`)
    .replace(
      codePattern,
      (_, p1) =>
        `<span class="bg-gray-200 text-sm text-red-400 px-2 py-1 rounded-sm">${p1}</span>`
    )

  const createMarkup = () => ({ __html: jsxText })

  return <span dangerouslySetInnerHTML={createMarkup()} />
}
