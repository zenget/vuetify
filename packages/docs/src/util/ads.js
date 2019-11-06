export function addAd (value, index, children = []) {
  const length = children.length

  if (length < 5) return

  const child = children[index]

  if (!child) return

  const section = child.children.find(c => c.type === 'section')
  const item = { type: 'ad-card', value }

  if (section) section.children.push(item)
  else child.children.push(item)
}

export function addCustomizationAd (children = []) {
  addGettingStartedAd(children)
}

export function addFooterAd (children) {
  if (!children.length) return

  children[children.length - 1].children.push({ type: 'ad-exit' })
}

export function addHeadingAndAd (children) {
  children.splice(0, 0, {
    type: 'section',
    children: [
      { type: 'heading', lang: 'heading' },
      { type: 'base-text', lang: 'headingText' },
      { type: 'ad-entry' },
    ],
  })
}

export function addGettingStartedAd (children = []) {
  const index = Math.ceil(children.length / 2 - 1)

  addAd('community', index, children)
}

export function addContentAd (namespace, children = []) {
  switch (namespace) {
    case 'getting-started': return addGettingStartedAd(children)
    case 'customization': return addCustomizationAd(children)
  }
}
