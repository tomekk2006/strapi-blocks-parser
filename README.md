# blocks-renderer
Parses a Strapi Blocks json into a HTML string

## Installation
```
npm install strapi-blocks-renderer
```
## Functions
```javascript
renderBlocks(blocks)
```

Description: Parses Blocks Rich Text into a HTML string.

|Parameter|Type |
|---------|-----|
|blocks   |Array|

```javascript
encodeHtml(string)
```

Description: Converts HTML characters into [Character Entities](https://www.w3schools.com/html/html_entities.asp)

|Parameter|Type  |
|---------|------|
|string   |string|
## Simple Usage
```javascript
import {renderBlocks} from 'strapi-blocks-renderer'
const content = [
    {type: "heading", level: 1, children: [{type: "text", text: "Welcome User"}]},
    {type: "paragraph", children: [{type: "text", italic: true, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}]}
]
console.log(renderBlocks(content))
// output:  <h1>Welcome User</h1>
//          <p><i>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</i></p>

```
