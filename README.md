# react-native-ot-shield

Simple Request Crash / Method manager

## Installation

Use the yarn manager [yarn](https://yarnpkg.com/en/docs/install#windows-stable) to install react-native-ot-shield.

```bash
yarn add react-native-ot-shield
```
## Configuration

You must create one configuration file

```json
{
    "remote":"https://myremote.dev",
    "actions": [
        "isExampleToSimpleAction"
        {
            "name":"isExampleToComplexeAction",
            "actions": [
                "subAction",
                "anotherSubAction"
            ]
        }
    ]
}
```
*shield.setup.json*

## Import

```javascript

import Shield from 'react-native-ot-shield'

```

## Prepare


```javascript

Shield.load(require('myconfig.json'))

```

## Usage

Simple action :

```javascript

let result = await Shield.isExampleToSimpleAction({nameP:dataP}) // Return JSON
// This action send object {nameP:dataP, action: isExampleToSimpleAction} in post to request https://myremote.dev/isExampleToSimpleAction

```

Complexe action :

```javascript

let result = await Shield.isExampleToComplexeAction.subAction({nameP:dataP}) // Return JSON
// This action send object {nameP:dataP, action: subAction} in post to request https://myremote.dev/isExampleToComplexeAction

```


[MIT](https://choosealicense.com/licenses/mit/)