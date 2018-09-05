const VBAT=1, PC13=2, PC14=3, PC15=4, PA0=10, PA1=11, PA2=12, PA3=13, PA4=14, PA5=15, PA6=16, PA7=17
const PB0=18, PB1=19, PB10=21, PB11=22, PB12=23, PB13=24, PB14=25, PB15=26, NRST=7
const PA8=29, PA9=30, PA10=31, PA11=32, PA12=33, PA15=38, PB3=39, PB4=40, PB5=41, PB6=42, PB7=43, PB8=45, PB9=46

const OUTPUT=0, INPUT=1, INPUT_ANALOG=2, INPUT_PULLDOWN=3, INPUT_PULLUP=4
const LOW=0, HIGH=1
let startMillis = new Date().getTime();
function pinMode() {}
function digitalRead() { return 0 }
function digitalWrite(pin, value) { postMessage({t:'pin', p:pin, v:value}) }
function analogRead() { return 0 }
function analogWrite(pin, value) { postMessage({t:'pin', p:pin, v:value}) }
function delay(t) { }
function millis() { return new Date().getTime() - startMillis; }
function constrain(x,a,b) { return Math.max(a,Math.min(b,x)) }
const sqrt = Math.sqrt
const min = Math.min
const max = Math.max
const abs = Math.abs
const sin = Math.sin
const map = (x,a,b,c,d) => Math.floor(c + (x-a)*(d-c)/(b-a))

let serialData = [];
const Serial = {
  available: () => serialData.length>0,
  begin: () => {},
  print: (t) => console.log(t),
  println: (t) => console.log(t),
  read: () => {
    if (serialData.length<1) return -1;
    return serialData.shift()
  }
}
addEventListener("message", (e)=>{if (e.data.t==="serial") serialData = serialData.concat(e.data.d)})
