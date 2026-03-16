// Dados mock centralizados para petições
// Compartilhado entre list, detail e edit pages

export const mockPeticoes = [
  {
    id: "1",
    titulo: "Petição Inicial - Ação de Cobrança",
    clienteId: "1",
    cliente: "Maria Oliveira Santos",
    processo: "1234567-89.2024.8.26.0100",
    tipo: "inicial",
    status: "finalizada",
    dataProtocolo: "2024-02-20",
    numeroProtocolo: "PROT-2024-000891",
    updatedAt: "2024-02-20T14:30:00",
    createdAt: "2024-02-01T09:00:00",
    conteudo: `<h1>EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA 1ª VARA CÍVEL DA COMARCA DE SÃO PAULO/SP</h1>

<p><strong>MARIA OLIVEIRA SANTOS</strong>, brasileira, casada, professora, portadora do RG n.º 12.345.678-9 e CPF n.º 123.456.789-00, residente e domiciliada na Rua das Flores, 123, Centro, São Paulo/SP, vem respeitosamente à presença de Vossa Excelência, por intermédio de seu advogado que esta subscreve, com escritório profissional na Av. Paulista, 1.000, São Paulo/SP, propor a presente</p>

<h2>AÇÃO DE COBRANÇA</h2>

<p>em face de <strong>EMPRESA DEVEDORA LTDA.</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob n.º 00.000.000/0001-00, com sede na Av. Principal, 500, São Paulo/SP, pelos fatos e fundamentos a seguir expostos.</p>

<h2>I – DOS FATOS</h2>

<p>A requerente firmou contrato de prestação de serviços com a requerida em 01/01/2023, no valor total de R$ 150.000,00 (cento e cinquenta mil reais), a ser pago em parcelas mensais.</p>

<p>Ocorre que, não obstante a regular prestação dos serviços pela requerente, a requerida deixou de honrar as obrigações financeiras pactuadas, acumulando débito no montante ora cobrado.</p>

<h2>II – DO DIREITO</h2>

<p>O inadimplemento contratual gera para o credor o direito de exigir o cumprimento da obrigação, conforme preceitua o art. 389 do Código Civil.</p>

<h2>III – DOS PEDIDOS</h2>

<p>Diante do exposto, requer a Vossa Excelência:</p>

<ol>
  <li>A citação da requerida para, querendo, contestar a presente ação;</li>
  <li>A procedência total dos pedidos, condenando-se a requerida ao pagamento do valor de R$ 150.000,00 (cento e cinquenta mil reais);</li>
  <li>A condenação da requerida ao pagamento das custas processuais e honorários advocatícios.</li>
</ol>

<p>Dá-se à causa o valor de R$ 150.000,00 (cento e cinquenta mil reais).</p>

<p>Nestes termos, pede deferimento.</p>

<p>São Paulo, 20 de fevereiro de 2024.</p>`,
  },
  {
    id: "2",
    titulo: "Contestação - Ação Trabalhista",
    clienteId: "2",
    cliente: "João Carlos Silva",
    processo: "9876543-21.2024.5.02.0001",
    tipo: "contestacao",
    status: "revisao",
    dataProtocolo: null,
    numeroProtocolo: null,
    updatedAt: "2024-02-19T10:15:00",
    createdAt: "2024-02-10T08:00:00",
    conteudo: `<h1>EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DO TRABALHO DA 3ª VARA DO TRABALHO DE SÃO PAULO/SP</h1>

<p><strong>JOÃO CARLOS SILVA</strong>, por seu advogado infra-assinado, nos autos da Reclamação Trabalhista acima referenciada, vem apresentar sua</p>

<h2>CONTESTAÇÃO</h2>

<p>pelos motivos de fato e de direito a seguir expostos, requerendo ao final a total improcedência dos pedidos formulados pelo reclamante.</p>

<h2>I – PRELIMINAR – INÉPCIA DA INICIAL</h2>

<p>A petição inicial apresenta grave vício formal, pois o reclamante deixou de precisar o período de trabalho alegado, tornando impossível a defesa adequada do reclamado.</p>

<h2>II – DO MÉRITO</h2>

<p>No mérito, todos os pedidos merecem ser julgados improcedentes, conforme demonstrado a seguir.</p>`,
  },
  {
    id: "3",
    titulo: "Recurso de Apelação",
    clienteId: "3",
    cliente: "Ana Paula Costa",
    processo: "5555555-55.2023.8.26.0200",
    tipo: "recurso",
    status: "rascunho",
    dataProtocolo: null,
    numeroProtocolo: null,
    updatedAt: "2024-02-18T16:45:00",
    createdAt: "2024-02-15T14:00:00",
    conteudo: `<h2>RECURSO DE APELAÇÃO</h2>

<p><strong>ANA PAULA COSTA</strong>, já qualificada nos autos, por intermédio de seu advogado, vem interpor o presente</p>

<h2>RECURSO DE APELAÇÃO</h2>

<p>em face da r. sentença prolatada nos autos em epígrafe, que julgou improcedente o pedido da apelante, pelas razões que passa a expor.</p>

<h2>I – DA TEMPESTIVIDADE</h2>

<p>O presente recurso é tempestivo, pois interposto dentro do prazo legal de 15 (quinze) dias úteis previsto no art. 1.003, §5º do CPC.</p>`,
  },
  {
    id: "4",
    titulo: "Manifestação sobre Documentos",
    clienteId: "4",
    cliente: "Pedro Henrique Almeida",
    processo: "7777777-77.2024.8.26.0300",
    tipo: "manifestacao",
    status: "protocolada",
    dataProtocolo: "2024-02-15",
    numeroProtocolo: "PROT-2024-001234",
    updatedAt: "2024-02-15T09:20:00",
    createdAt: "2024-02-12T11:00:00",
    conteudo: `<h2>MANIFESTAÇÃO</h2>

<p><strong>PEDRO HENRIQUE ALMEIDA</strong>, por seu advogado, vem à presença de Vossa Excelência apresentar sua manifestação acerca dos documentos juntados pela parte contrária, requerendo seja dado o fiel cumprimento ao disposto no art. 437 do CPC.</p>

<h2>DOS DOCUMENTOS APRESENTADOS</h2>

<p>Analisando os documentos trazidos pela parte adversa, verifica-se que os mesmos não são suficientes para sustentar as alegações formuladas, conforme demonstrado a seguir.</p>`,
  },
];

export type MockPeticao = typeof mockPeticoes[number];

export function getPeticaoById(id: string): MockPeticao | undefined {
  return mockPeticoes.find((p) => p.id === id);
}

export const statusConfig = {
  rascunho: {
    label: "Rascunho",
    className: "bg-gray-500/10 text-gray-600 border-gray-200",
    badgeClass: "bg-gray-500",
  },
  revisao: {
    label: "Em Revisão",
    className: "bg-amber-500/10 text-amber-600 border-amber-200",
    badgeClass: "bg-amber-500",
  },
  finalizada: {
    label: "Finalizada",
    className: "bg-blue-500/10 text-blue-600 border-blue-200",
    badgeClass: "bg-blue-500",
  },
  protocolada: {
    label: "Protocolada",
    className: "bg-green-500/10 text-green-600 border-green-200",
    badgeClass: "bg-green-500",
  },
} as const;

export const tipoConfig: Record<string, string> = {
  inicial: "Inicial",
  contestacao: "Contestação",
  replica: "Réplica",
  manifestacao: "Manifestação",
  recurso: "Recurso",
  outro: "Outro",
};

export const templates = [
  {
    id: "t1",
    nome: "Petição Inicial Cível",
    tipo: "inicial",
    conteudo: `<h1>EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA ___ VARA CÍVEL DA COMARCA DE ___</h1>

<p><strong>{{nome_cliente}}</strong>, brasileiro(a), portador(a) do CPF n.º {{cpf}}, residente em {{endereco}}, por intermédio de seu advogado, vem propor a presente</p>

<h2>AÇÃO ___</h2>

<p>em face de <strong>___</strong>, pelos fatos e fundamentos a seguir expostos.</p>

<h2>I – DOS FATOS</h2>

<p>Descreva os fatos aqui...</p>

<h2>II – DO DIREITO</h2>

<p>Fundamente o pedido...</p>

<h2>III – DOS PEDIDOS</h2>

<ol>
  <li>A citação do réu;</li>
  <li>A procedência dos pedidos;</li>
  <li>A condenação em custas e honorários.</li>
</ol>

<p>Dá-se à causa o valor de R$ ___.</p>

<p>Nestes termos, pede deferimento.</p>

<p>___, ___ de ___ de ___.</p>`,
  },
  {
    id: "t2",
    nome: "Contestação Trabalhista",
    tipo: "contestacao",
    conteudo: `<h1>EXCELENTÍSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DO TRABALHO DA ___ VARA DO TRABALHO</h1>

<p><strong>{{nome_cliente}}</strong>, já qualificado(a) nos autos, vem apresentar sua</p>

<h2>CONTESTAÇÃO</h2>

<p>requerendo a total improcedência dos pedidos.</p>

<h2>I – PRELIMINAR</h2>

<p>Descreva eventuais preliminares...</p>

<h2>II – DO MÉRITO</h2>

<p>Rebata os pedidos do reclamante...</p>

<h2>III – DOS PEDIDOS</h2>

<p>Requer a total improcedência dos pedidos formulados, com condenação do reclamante em honorários advocatícios.</p>`,
  },
  {
    id: "t3",
    nome: "Recurso de Apelação",
    tipo: "recurso",
    conteudo: `<h2>RECURSO DE APELAÇÃO</h2>

<p><strong>{{nome_cliente}}</strong>, por seu advogado, vem interpor o presente</p>

<h2>RECURSO DE APELAÇÃO</h2>

<p>em face da r. sentença de fls. ___.</p>

<h2>I – DA TEMPESTIVIDADE</h2>

<p>O presente recurso é tempestivo, interposto dentro do prazo legal.</p>

<h2>II – DO CABIMENTO</h2>

<p>O recurso é cabível nos termos do art. 1.009 do CPC.</p>

<h2>III – DAS RAZÕES</h2>

<p>Exponha as razões do recurso...</p>

<h2>IV – DO PEDIDO</h2>

<p>Requer o provimento do recurso para reformar a sentença.</p>`,
  },
  {
    id: "t4",
    nome: "Manifestação Genérica",
    tipo: "manifestacao",
    conteudo: `<h2>MANIFESTAÇÃO</h2>

<p><strong>{{nome_cliente}}</strong>, por seu advogado, vem à presença de Vossa Excelência apresentar sua</p>

<h2>MANIFESTAÇÃO</h2>

<p>acerca de ___.</p>

<h2>DOS FATOS</h2>

<p>Descreva os fatos...</p>

<h2>DO PEDIDO</h2>

<p>Requer o recebimento e processamento da presente manifestação.</p>

<p>Nestes termos, pede deferimento.</p>`,
  },
];

export const variaveis = [
  { nome: "{{nome_cliente}}", descricao: "Nome completo do cliente" },
  { nome: "{{cpf}}", descricao: "CPF do cliente" },
  { nome: "{{rg}}", descricao: "RG do cliente" },
  { nome: "{{endereco}}", descricao: "Endereço completo" },
  { nome: "{{numero_processo}}", descricao: "Número do processo" },
  { nome: "{{data_hoje}}", descricao: "Data atual por extenso" },
  { nome: "{{oab}}", descricao: "Número OAB do advogado" },
  { nome: "{{nome_advogado}}", descricao: "Nome do advogado" },
];
