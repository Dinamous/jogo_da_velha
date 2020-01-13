const CLASSE_X = 'x'
const CLASSE_O = 'o'


const elementoQuadro = document.querySelectorAll('[data-quadro]')
const tabuleiro = document.getElementById('tabuleiro')
const divVitoria = document.getElementById('MensagemVitoria')
const mensagemVitoria = document.querySelector('[ mensagem-de-vitoria]')
const botao = document.getElementById('botaoRestart')

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

botao.addEventListener('click',ComecaJogo)

function ComecaJogo(){
    vezO = false

    // um quadro só pode ser clicado uma unica vez
    elementoQuadro.forEach(quadro =>{
        //removendo classes toda vez q reiniciar
        quadro.classList.remove(CLASSE_O) 
        quadro.classList.remove(CLASSE_X)
        quadro.removeEventListener('click',foiClicado)
        quadro.addEventListener('click',foiClicado, {once:true}) 
    })
    CriaHover()

    divVitoria.classList.remove('show')
}

function foiClicado(e){
const celula = e.target
const jogadorAtual = vezO ? CLASSE_O : CLASSE_X // revezamento de jogadores

    //mostrar simbolo
    MostraSimbolo(celula,jogadorAtual)

    //checar vitoria
    if(ChecaVitoria(jogadorAtual)){
        FimDeJogo(false)

    //checar empate
    }else if(Empatou()){
        FimDeJogo(true)
    }else{

        //muda jogador
        TrocaJogador()

        //mostra a posição do jogador a ser jogada
        CriaHover()
    }

}

function  MostraSimbolo(celula,jogadorAtual){
    celula.classList.add(jogadorAtual) // adiciona a div , o conteudo do jogador atual
}

function TrocaJogador(){
    vezO = !vezO //invertedo o jogador
    
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

function FimDeJogo(empate){
    if(empate){
        mensagemVitoria.innerText = 'Empate!'
    }else{
        mensagemVitoria.innerText = `${vezO ? ' O ' : ' X '}Ganhou!` // dependendo do ultimo jogado
    }
    divVitoria.classList.add('show')
}

function Empatou(){
    return [...elementoQuadro].every(celula =>{ // se todas as celulas possuem uma classe, destruturando o elementoquadro em um array pra checar todas as células
        return celula.classList.contains(CLASSE_X) || celula.classList.contains(CLASSE_O)
    })
}
