const investimentoHistorico = {
    id: 0,
    idInvestimento: 0,
    titulo: '',
    Descricao : '',
    valorInvestido: 0,
    dataDevolucao: '',
    taxa: 0,
    lucro: 0,
    idFilho: 0,
    status: '',
}
const investimentoAdm = {
    id: 1,
    titulo: '',
    descricao : '',
    valorDoRendimentoAtual :0,
    dataDevolucao: '',
    taxaDesistencia: 0,
}
const Rotas = {
//---------------------------------DB investimentoHistorico--------------------------------------------    
    investimentoHistorico: [
        {
            url: '/investimentoHistorico',
            method: 'GET',
            descricao: "retornar todos os investimentos anteriores",
        },
        {
            url: '/investimentoHistorico/:id',
            method: 'GET',
            descricao: "retornar um unico investimentos",
        },
        {
            url: '/investimentoHistorico',
            method: 'POST',
            descricao: "criar um novo investimento",
        },
        {
            url: '/investimentoHistorico',
            method: 'PUT',
            descricao: "atualiza o investimento",
        },
    ],
    investimentoAtual: [
        {
            url: '/investimentoAtual',
            method: 'GET',
            descricao: "retornar todos os investimentos atuais",
        },
    ],
//-----------------------------------DB investimentoAdm-------------------------------------------
    investimentoAdm:  [
        {
            url: '/investimentoAdm',
            method: 'GET',
            descricao: "retornar todos os investimentos  ADM",
        },
        {
            url: '/investimentoAdm',
            method: 'POST',
            descricao: "criar um novo investimento  ADM",
        },
        {
            url: '/investimentoAdm',
            method: 'PUT',
            descricao: "atualiza o investimento  ADM",
        },
        {
            url: '/investimentoAdm',
            method: 'DELETE',
            descricao: "deleta o investimento  ADM",
        },
    ],
}