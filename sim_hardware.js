const imports = {}

export function start(file, delay) {
  return Promise.all([
    fetch(file).then((t) => t.text()),
    fetch('arduino.js').then((t) => t.text()).then((t) => imports['Arduino'] = t),
    fetch('ws2812b.js').then((t) => t.text()).then((t) => imports['WS2812B'] = t)
  ])
  .then((t) => writeEval(t[0], delay))
}

function writeEval(t, delay) {
  delay = delay || 20
  let script = `${makeJS(t)}
  setup()
  setInterval(loop, ${delay})
  `
  console.log(script)
  let w = new Worker(URL.createObjectURL(new Blob([script], {})))
  w.pins = Array(50).fill().map(()=>0)
  w.addEventListener('message', (e) => { if (e.data.t==='pin') w.pins[e.data.p]=e.data.v })
  return w
}

function makeJS(t) {
  return t
    .replace(/\#define(\s+\w+\s*)\((.*?)\)/g, 'const$1 = ($2) =>')
    .replace(/(\w+)\[\]\s*=\s*\{(.*?)\}/g, '$1 = [$2]')
    .replace(/\#define(\s+\w+)/g, 'const$1 =')
    .replace(/\(int\)\s*\((.*?)\)/g, 'parseInt($1)')
    .replace(/\w+\s+(\w+)\((.*?)\)\s*\{/g, (_,name,args) => `function ${name}(${args.replace(/\w+\s+(\w+)/g,'$1')}) {`)
    .replace(/(^|[^\w])(u?int\d*(_t)?|long|float|bool|WS2812B)\s/g, '$1let ')
    .replace(/\#include\s*\<(.*?)(\..*)?\>/g, (_,i) => imports[i])
}
