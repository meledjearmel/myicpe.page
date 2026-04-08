const modules = import.meta.glob('../assets/images/captures/*.png', {
  eager: true,
  import: 'default',
})

/** @type {{ src: string; name: string }[]} */
export const captureScreenshots = Object.entries(modules)
  .map(([path, url]) => ({
    src: url,
    name: path.split('/').pop() ?? 'capture',
  }))
  .sort((a, b) => a.name.localeCompare(b.name))
