const {crawlPage} = require('./crawl.js')
process.argv //Utiliza el node process para agarrar lo escrito en la linea de comandos.

async function main(){
    if(process.argv.length !=3 ){
        console.log('No valido')
        process.exit(1)
    }
    const url = process.argv[2]

    console.log(`Starting crawl ${url}`)
    const result = await crawlPage(url,url,{})
    for(const page of Object.entries(result)){
        console.log(page)
    }
    //Tranformar los resultados.

}
main()