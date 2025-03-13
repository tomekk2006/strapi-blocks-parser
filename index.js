class ParseBlock {
    static heading(block) {
        const childrenElements = parseBlocks(block.children, {join_str:""});
        const htmlString = `<h${block.level}>${childrenElements}</h${block.level}>`;
        return htmlString; // example output: <h1>Hello world!</h1>
    }
    static paragraph(block) {
        const childrenElements = parseBlocks(block.children, {join_str:""});
        const htmlString = `<p>${childrenElements}</p>`;
        return htmlString; // example output: <p>Hello world!</p>
    }
    static text(block, options={}) {
        let encode_text = true;
        if ("encode_text" in options) encode_text = options.encode_text;

        let text;
        if (encode_text) text = encodeHtml(block.text);
        else text = block.text;

        if (block.bold) text = "<b>"+text+"</b>";
        if (block.underline) text = "<u>"+text+"</u>";
        if (block.strikethrough) text = "<s>"+text+"</s>";
        if (block.italic) text = "<i>"+text+"</i>";
        if (block.code) text = "<code>"+text+"</code>";
        return text;
    }
    static link(block) {
        const childrenElements = parseBlocks(block.children, {join_str:""});
        const htmlString = `<a href="${block.url}">${childrenElements}</a>`;
        return htmlString; // example output: <a href="/page">Hello world!</a>
    }
    static list(block, options={}) {
        let indent_size = 4;
        if ("indent_size" in options) indent_size = options.indent_size;
        let join_str = "\n";
        if ("join_str" in options) join_str = options.join_str

        const listItems = new Array();
        block.children.forEach((item) => {
            if (item.type === "list-item") {
                listItems.push(join_str+" ".repeat(indent_size)+"<li>"+parseBlocks(item.children)+"</li>");
            }
        });
        const htmlString = listItems.join("")+join_str;
        if (block.format === "ordered") return "<ol>"+htmlString+"</ol>";
        if (block.format === "unordered") return "<ul>"+htmlString+"</ul>";
    }
    static codeBlock(block) {
        const childrenElements = parseBlocks(block.children, {join_str:""});
        const htmlString = `<pre><code>${childrenElements}</code></pre>`;
        return htmlString; // example output: <pre><code>Hello world!</code></pre>
    }
    static image(block) {
        const htmlString = `<img src="${block.image.url}" alt="${block.image.alternativeText}">`;
        return htmlString; // example output: <img src="image.png" alt="alternative text">Hello world!</img>
    }
    static quote(block) {
        const childrenElements = parseBlocks(block.children, {join_str:""});
        const htmlString = `<blockquote>${childrenElements}</blockquote>`;
        return htmlString; 
    }
}
// options:
//     join_str: string
//     encode_text: boolean
//     indent_size: integer
function parseBlocks(blocks, options={}) {
    let join_str = "\n";
    if ("join_str" in options) join_str = options.join_str;

    const htmlElements = new Array();
    blocks.forEach((block) => {
        switch (block.type) {
            case "heading":
                htmlElements.push(ParseBlock.heading(block));
                break;
            case "paragraph":
                htmlElements.push(ParseBlock.paragraph(block));
                break;
            case "text":
                htmlElements.push(ParseBlock.text(block, options));
                break;
            case "link":
                htmlElements.push(ParseBlock.link(block));
                break;
            case "list":
                htmlElements.push(ParseBlock.list(block, options));
                break;
            case "code":
                htmlElements.push(ParseBlock.codeBlock(block));
                break;
            case "image":
                htmlElements.push(ParseBlock.image(block));
                break;
            case "quote":
                htmlElements.push(ParseBlock.quote(block));
                break;
        }
    });
    const htmlString = htmlElements.join(join_str);
    return htmlString;
}

function encodeHtml(string) {
    // https://www.w3schools.com/html/html_entities.asp
    const entities = {
        "<" :"&lt;",
        ">" :"&gt;",
        "&" :"&amp;",
        "\"":"&quot;",
        "\'":"&apos;"
    }
    let encodedString = "";
    // loop through each character
    for (let i = 0; i < string.length; i++) {
        // if character is found in the entities
        if (string[i] in entities) {
            // append entity to encoded string
            encodedString += entities[string[i]];
        }
        else {
            // otherwise append the character to the encoded string
            encodedString += string[i];
        }
    }
    return encodedString;
}

module.exports = {parseBlocks, encodeHtml};