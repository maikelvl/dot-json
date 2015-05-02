# dot-json
---
Easily edit a json file from the CLI or NodeJS.

### Install global
```bash
npm install -g dot-json
```
or local
```bash
npm install --save dot-json
```
### Use from the CLI
```bash
dot-json myfile.json user.name
```
```
Usage:
  dot-json <file> <key-path>             Get a value from a json file by key-path
  dot-json <file> <key-path> <value>     Assign a value at a key-path
  dot-json <file> <key-path> --delete    Delete a key by key-path

Options:
  -d --delete     Delete the key-path
  -h --help       Show this message with options
  -v --version    Print the version number
```


### Use it in NodeJS
```javascript
var dot_json = require('dot_json');

var file = dot_json.file('myfile.json')
file.set('user.name', 'john');
file.set('user.email', 'john@example.com');

var value = dot_json.file('myfile.json').get('user.name');

console.log(value);

file.delete('user.name');
```

[npmjs.org/package/dot-json](https://npmjs.org/package/dot-json)

