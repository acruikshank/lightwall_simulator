# lightwall simulation

Simulates a large LED wall driven by some stm32 controllers. Why would I need such a thing? You probably don't. Sorry.

## Using

``` bash
yarn install  # to get regl and gl-mat4

# gl-mat4 needs to be converted to es6 modules
mkdir deps
cp -r node_modules/gl-mat4 deps
yarn global add cjs-to-es6 # if necessary
cjs-to-es6 deps/gl-mat4

# link your stm32 light controller sketch (has to all be one file with lots of other restrictions).
ln -s [path to project]/src/main.cpp

yarn global add http-server # if necessary
http-server
```
Then load http://localhost:8080/sim.html

**WARNING**: Uses vast quantities of CPU. I need to simplify the webworker communication.
