const CLASSE_X = 'x'
const CLASSE_O = 'o'


const elementoQuadro = document.querySelectorAll('[data-quadro]')
const tabuleiro = document.getElementById('tabuleiro')
const mensagemVitoria = document.getElementById('mensagemVencedor')
const mensagemVitoria = document.querySelector('[mensagem-vencedor]')
let vezO
const possibilidades_de_vencer = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//iniciando o jogo
ComecaJogo()


function ComecaJogo(){
    //vezO = false

    // um quadro só pode ser clicado uma unica vez
    elementoQuadro.forEach(quadro =>{
        quadro.addEventListener('click',foiClicado, {once:true}) 
    })
    CriaHover()
}

function foiClicado(e){
const celula = e.target
const jogadorAtual = vezO ? CLASSE_O : CLASSE_X // revezamento de jogadores

    //mostrar simbolo
    MostraSimbolo(celula,jogadorAtual)

    //checar vitoria
    if(ChecaVitoria(jogadorAtual)){
      // FimDeJogo(false)
    }
    //checar empate

    //muda jogador
    TrocaJogador()

    //mostra a posição do jogador a ser jogada
    CriaHover()
}

function  MostraSimbolo(celula,jogadorAtual){
    celula.classList.add(jogadorAtual) // adiciona a div , o conteudo do jogador atual
}

function TrocaJogador(){
    vezO = !vezO
    
}

function CriaHover(){
    //remove qualquer que tenha sido o jogador anterior
    tabuleiro.classList.remove(CLASSE_O)
    tabuleiro.classList.remove(CLASSE_X)

    //aplica a classe ao tabuleiro, pare ter o hover aplicado
    if(vezO){
        tabuleiro.classList.add(CLASSE_O)
    }else{
        tabuleiro.classList.add(CLASSE_X)
    }
}

function ChecaVitoria(jogadorAtual){
    return possibilidades_de_vencer.some(combinacoes => {
        return combinacoes.every( index =>{
            return elementoQuadro[index].classList.contains(jogadorAtual) 
            //retorna se das 3 quadros selecionado das combinações, são do mesmo jogador
        })
    })
}

// function FimDeJogo(empate){
//     if(empate){

//     }else{
//         mensagemVitoria.innerText = `${vezO ? ' O ' : ' X '}Ganhou!`
//     }
//     mensagemVitoria.classList.add('show')
// }