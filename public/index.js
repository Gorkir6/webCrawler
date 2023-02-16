

const form = document.querySelector('form')
const url = document.querySelector('#urlId')
const container = document.querySelector('.container')
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const urlInput = url.value;
    console.log('enviando')
    try {
      const response = await fetch('http://127.0.0.1:4005/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: urlInput })
      });
      const data = await response.json();
      showResults(data)
    } catch (error) {
      console.log(error);
    }
  });

function showResults(data){

  for(const i of Object.entries(data)){
     const newDiv = document.createElement('div')
     newDiv.textContent = `${i}`
     container.append(newDiv)
  }
}