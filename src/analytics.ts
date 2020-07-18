import * as $ from 'jquery'

// js construction
// function createAnalytics()

// typescript
function createAnalytics(): object {
  let counter = 0

  // js construction
  // let destroyed

  // typescript
  let destroyed: boolean = false

  // js construction
  // const listener = ()

  // typescript
  const listener = (): number => counter++

  $(document).on('click', listener)

  return {
    destroy() {
      $(document).off('click', listener)
      destroyed = true
    },

    getClicks() {
      if (destroyed) {
        return `Analytics is destroyed. Total clicks = ${counter}`
      }
      return counter
    }
  }
}

// js construction
// window.analytics = createAnalytics()

// typescript
window['analytics'] = createAnalytics()