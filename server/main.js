const {crawlPage} = require('./crawl.js')
//Utiliza el node process para agarrar lo escrito en la linea de comandos.

async function main(url){
    // if(process.argv.length !=3 ){
    //      console.log('No valido')
    //      process.exit(1)
    // }
    try{
        const urll = new URL(url)
    }catch(err){
        console.log(err)
    }
    
    // const url = process.argv[2]

    console.log(`Starting crawl ${url}`)
    const result = await crawlPage(url,url,{})
    // for(const page of Object.entries(result)){
    //     console.log(page)
    // }
    return result
    //Tranformar los resultados.

}

module.exports = {
    main,
}
//main()