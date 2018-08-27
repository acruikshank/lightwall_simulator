export function mouseWheel(element, cb) {
  element.addEventListener('wheel', (ev) => {
    ev.preventDefault()
    const {deltaX, deltaY, deltaZ} = ev
    if (deltaX || deltaY || deltaZ)
      cb(deltaX||0, deltaY||0, deltaZ||0);
  })
}

export function mouseChange(element, cb) {
  const handle = (ev) => { cb(ev.buttons, ev.clientX, ev.clientY) }
  'enter,leave,down,up,move'.split(',').forEach((t) => element.addEventListener(`mouse${t}`, handle))
}
