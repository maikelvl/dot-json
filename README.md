# dot-json

[![huntr](https://cdn.huntr.dev/huntr_security_badge_mono.svg)](https://huntr.dev)

---

Easily edit a json file from the CLI or NodeJS.

### Install global
```bash
npm install -g dot-json
```
or local
```bash
npm install dot-json
```
### Use from the CLI
```bash
dot-json myfile.json user.name "John Doe"
dot-json myfile.json user.email "john@example.com"
dot-json myfile.json foo..bar baz
dot-json myfile.json address '{"city":"Atlantis"}' --json-value
```
myfile.json now looks like
```json
{
    "user": {
        "name": "John Doe",
        "email": "john@example.com"
    },
    "foo.bar": "baz",
    "address": {
        "city": "Atlantis"
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
  --indent=<n>      Indent with <n> of white space characters [default: auto]
  -d --delete       Delete the key-path
  -j --json-value   Parse the input value as a JSON string (to set whole objects or arrays)
  -h --help         Show this message with options
  -v --version      Print the version number
```

### Quick tip for editing package.json

If you want to change package.json, you can use npm’s [`pkg` command](https://docs.npmjs.com/cli/commands/npm-pkg) instead of `dot-json`:

```bash
npm pkg get scripts.test
npm pkg set name=my-new-package
```

### Use it in NodeJS
#### Initialization
```javascript
var DotJson = require('dot-json');
var myfile = new DotJson('myfile.json');
```

#### Writing
asynchronous
```javascript
myfile.set('user.name', 'John Doe').set('user.email', 'john@example.com').save(function(){
  console.log('saved');
});
```

synchronous
```javascript
myfile.set('user.name', 'John Doe').set('user.email', 'john@example.com').save();
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

#### Reading
asynchronous
```javascript
myfile.get('user.name', function(value){
  // value = 'John Doe'
  console.log(value);
});
```

synchronous
```javascript
var value = myfile.get('user.name');
// value = 'John Doe'
console.log(value);
```

#### Deleting
asynchronous
```javascript
myfile.delete('user.name').save(function(){
  console.log('saved');
});
```

synchronous
```javascript
myfile.delete('user.name').save();
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
