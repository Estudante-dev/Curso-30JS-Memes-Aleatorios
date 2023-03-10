let imgMemes = [
    "img/meme01.jpg",
    "img/meme02.jpg",
    "img/meme03.jpg",
    "img/meme04.jpg",
    "img/meme05.jpg",
]

let posicaoAtualImg
let posicaoAnteriorImg

function gerarMeme(){

    // Seleciona uma posição aleatória no array
    let posicaoAleatoria = Math.floor(Math.random() * imgMemes.length);

    // Se a posição selecionada for a mesma da imagem anterior, seleciona a próxima posição no array
    if(posicaoAleatoria === posicaoAnteriorImg){
        posicaoAleatoria = (posicaoAleatoria + 1) < imgMemes.length ? posicaoAleatoria + 1 : 0;

    }

    // Salva a posição atual como posição anterior para a próxima chamada da função

    posicaoAnteriorImg = posicaoAleatoria;

    // Seleciona a imagem na posição aleatória e exibe na tela

    
    let img = imgMemes[posicaoAleatoria];
    document.querySelector('#imgMeme').src = img;

    console.log(posicaoAleatoria);

}

async function compartilharMeme(){
    let imgMeme = document.querySelector('#imgMeme');
    let resImg = await fetch(imgMeme.src);
    let contentType = resImg.headers.get("content-type");
    let extesionFile = contentType.split("/")?.[1] || "jpg";
    let blob = await resImg.blob();
    let binaryFile = new File([blob], `meme.${extesionFile}`, { type: contentType});

    window.navigator.share({
        title: 'Memes de Programação',
        text: 'Olha que engraçado esse meme!',
        url: window.location.href,
        files: Array(binaryFile)
    })
    .then(()=> console.log('Compartilhado com sucesso!'))
    .catch((error) => console.error('Erro ao compartilhar:', error))
}
