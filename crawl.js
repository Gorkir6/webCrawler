const {JSDOM} = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){//Funcion recursiva para recorrer toda la pagina
    

    const baseURlObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURlObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizeCurrentURL = normalizeURL(currentURL)
    if(pages[normalizeCurrentURL]>0){
        pages[normalizeCurrentURL]++
        return pages 
    }

    pages[normalizeCurrentURL]=1
    console.log(`Current page ${currentURL}`)

    try{
       const resp = await fetch(currentURL)
       if(resp.status >399){
        console.log(`error in fetch with status code: ${resp.status}`)
        return pages
       }

       const contentType = resp.headers.get('content-type')
       if(!contentType.includes('text/html')){
        console.log(`Non html response, content type: ${contentType}`)
        return pages
       }

       const htmlBody = await resp.text()

       const nextURLs = getURLsFromHTML(htmlBody, baseURL)

       for(const nextURL of nextURLs){
        pages = await crawlPage(baseURL,nextURL,pages)

       }

    }catch(err){
        console.log('Error in fetch')
    }
    return pages
}


function getURLsFromHTML(htmlBody, baseURL){
    const urls =[]
    const dom = new JSDOM(htmlBody)
    const anchorTags = dom.window.document.querySelectorAll('a')
    for(const anchor of anchorTags){
        var actualURl = ''
        if(anchor.href.slice(0,1)==='/'){//Esto significa que es relativa
            actualURl = `${baseURL}${anchor.href}`
        }else{
            //Es absoluta
            actualURl = anchor.href
        }
        try{
            const checkURL = new URL(actualURl)
            urls.push(actualURl)
        }catch(err){
            console.log(err)
        }
        
    }
    return urls
}


function normalizeURL(urlString){
    //Funcion para transformar cualquier tipo de url en una base, o sea de https://google.com a google.com
    const url = new URL(urlString)//Transformar en un objeto url
    const basicPath = url.hostname+url.pathname
    if(basicPath.length > 0 && basicPath.slice(-1) === '/'){//Revisa el ultimo caracter
        return basicPath.slice(0,-1)//Devuelve todo menos el ultimo caracter
    }
    return basicPath
}
//--save developer es para poner la dependencia como dependencia de developer


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}