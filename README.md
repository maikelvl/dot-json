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
dot-json myfile.json user.name "John Doe"
dot-json myfile.json user.email "john@example.com"
```
myfile.json now looks like
```json
{
    "user": {
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

```bash
dot-json myfile.json user.name
John Doe
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
var dot_json = require('dot-json');

var myfile = dot_json.file('myfile.json');
myfile.set('user.name', 'John Doe');
myfile.set('user.email', 'john@example.com');
```
myfile.json now looks like
```json
{
    "user": {
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

```javascript
var value = myfile.get('user.name');
// value = 'John Doe'
console.log(value);

myfile.delete('user.name');
```
myfile.json now looks like
```json
{
    "user": {
        "email": "john@example.com"
    }
}
```

[npmjs.org/package/dot-json](https://npmjs.org/package/dot-json)

