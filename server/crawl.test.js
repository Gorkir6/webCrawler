const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL remueve el protocolo.', () => {
    const input = 'https://google.com'
    const output = normalizeURL(input)
    const expected = 'google.com'
    expect(output).toEqual(expected)
})
test('normalizeURL remueve el ultimo slash si es que lo tiene', () => {
    const input = 'https://google.com'
    const output = normalizeURL(input)
    const expected = 'google.com'
    expect(output).toEqual(expected)
})
test('normalizeURL a minusculas', () => {
    const input = 'https://Google.com'
    const output = normalizeURL(input)
    const expected = 'google.com'
    expect(output).toEqual(expected)
})
test('normalizeURL con path', () => {
    const input = 'https://google.com/path/path'
    const output = normalizeURL(input)
    const expected = 'google.com/path/path'
    expect(output).toEqual(expected)
})

test('getURLsFromHTML para url absolutas',()=>{
    const input = `
    <html>
        <body>
            <a href="https://google.com">
                google
            </a>
        </body>
    </html>
    `
    // `` deja hacer strings en mas de una linea
    const inputBaseUrl = 'https://google.com'
    const output = getURLsFromHTML(input,inputBaseUrl)
    const expected = ["https://google.com/"]
    expect(output).toEqual(expected)
})

test('getURLsFromHTML para url relativas',()=>{
    const input = `
    <html>
        <body>
            <a href="/path/">
                google
            </a>
        </body>
    </html>
    `
    // `` deja hacer strings en mas de una linea
    const inputBaseUrl = 'https://google.com'
    const output = getURLsFromHTML(input,inputBaseUrl)
    const expected = ["https://google.com/path/"]
    expect(output).toEqual(expected)
})
test('getURLsFromHTML ambos tipos de url',()=>{
    const input = `
    <html>
        <body>
            <a href="/path/">
                google
            </a>
            <a href="https://google.com">
                google2
            </a>
        </body>
    </html>
    `
    // `` deja hacer strings en mas de una linea
    const inputBaseUrl = 'https://google.com'
    const output = getURLsFromHTML(input,inputBaseUrl)
    const expected = ["https://google.com/path/",'https://google.com/']
    expect(output).toEqual(expected)
})
test('getURLsFromHTML url invalida',()=>{
    const input = `
    <html>
        <body>
            <a href="invalida">
                google
            </a>
        </body>
    </html>
    `
    // `` deja hacer strings en mas de una linea
    const inputBaseUrl = 'https://google.com'
    const output = getURLsFromHTML(input,inputBaseUrl)
    const expected = []
    expect(output).toEqual(expected)
})