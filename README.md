# dot-json
[![Build Status](https://travis-ci.org/maikelvl/dot-json.svg?branch=master)](https://travis-ci.org/maikelvl/dot-json)
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

### Quick tip for editing package.json
Add to .bash_profile:
```bash
alias package="dot-json package.json"
```
Use it like this:
```bash
package name "my-package"
```

### Use it in NodeJS
#### Initialization
```javascript
var DotJson = require('dot_json');
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

## License
Copyright (c) 2015 Maikel Vlasman

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.