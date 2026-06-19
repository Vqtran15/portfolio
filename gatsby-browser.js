import "./src/styles/global.css"

export const onClientEntry = () => {
  if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
  }
}

export const onRouteUpdate = () => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    window.scrollTo(0, 0)
  }
}
