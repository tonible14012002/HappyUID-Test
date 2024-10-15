export const preloadImage = async (url: string) => {
  return new Promise((r) => {
    const newImgEl = document.createElement('img')
    newImgEl.addEventListener('load', async () => {
      r(true)
    })
    newImgEl.setAttribute('src', url) // Loads the image first before switching.
  })
}
