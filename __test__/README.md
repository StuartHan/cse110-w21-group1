# How to test

## In terminal, main dir
- `npm run test`
- `npm run test-coverage`

- `npm run test -- ./__test__/<filename>` : to test a single test file (single unit)

## With vscode task
- `run task` -> `npm: test`
- `run task` -> `npm: test-coverage`

# testing progress

### function not done testing
- loadActive (fix localStorage)
- updateTable (half done)
- changeMode (add more expect stmt to each test)
- countDown (questionable)
- autoSwitchMode (not working)
- runCounter (not working)

### Done testing, all working good
- timeToSec
- secToTime
- fillColor
- drainColor
- incrementCoin
- setShopItems
- setActive
- turnLight
- turnDark
- darkenchosen
- saveTimeSettings

### function not started yet
- SwitchToChinese (current)
- SwitchToEnglish
- chooseSoundEffect
- showStats