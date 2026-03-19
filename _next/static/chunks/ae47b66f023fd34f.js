(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,69035,e=>{"use strict";var a=e.i(43476),o=e.i(71645),t=e.i(48425),s="horizontal",r=["horizontal","vertical"],i=o.forwardRef((e,o)=>{var i;let{decorative:n,orientation:l=s,...d}=e,c=(i=l,r.includes(i))?l:s;return(0,a.jsx)(t.Primitive.div,{"data-orientation":c,...n?{role:"none"}:{"aria-orientation":"vertical"===c?c:void 0,role:"separator"},...d,ref:o})});i.displayName="Separator",e.s(["Root",()=>i,"Separator",()=>i],86392);var n=e.i(86392),n=n,l=e.i(47163);function d({className:e,orientation:o="horizontal",decorative:t=!0,...s}){return(0,a.jsx)(n.Root,{"data-slot":"separator",decorative:t,orientation:o,className:(0,l.cn)("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",e),...s})}e.s(["Separator",()=>d],69035)},64659,e=>{"use strict";var a=e.i(31171);e.s(["ChevronDown",()=>a.default])},86536,e=>{"use strict";let a=(0,e.i(75254).default)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);e.s(["Eye",()=>a],86536)},56909,e=>{"use strict";let a=(0,e.i(75254).default)("save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);e.s(["Save",()=>a],56909)},67585,(e,a,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"BailoutToCSR",{enumerable:!0,get:function(){return s}});let t=e.r(32061);function s({reason:e,children:a}){if("u"<typeof window)throw Object.defineProperty(new t.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return a}},9885,(e,a,o)=>{"use strict";function t(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"encodeURIPath",{enumerable:!0,get:function(){return t}})},52157,(e,a,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"PreloadChunks",{enumerable:!0,get:function(){return l}});let t=e.r(43476),s=e.r(74080),r=e.r(63599),i=e.r(9885),n=e.r(43369);function l({moduleIds:e}){if("u">typeof window)return null;let a=r.workAsyncStorage.getStore();if(void 0===a)return null;let o=[];if(a.reactLoadableManifest&&e){let t=a.reactLoadableManifest;for(let a of e){if(!t[a])continue;let e=t[a].files;o.push(...e)}}if(0===o.length)return null;let l=(0,n.getDeploymentIdQueryOrEmptyString)();return(0,t.jsx)(t.Fragment,{children:o.map(e=>{let o=`${a.assetPrefix}/_next/${(0,i.encodeURIPath)(e)}${l}`;return e.endsWith(".css")?(0,t.jsx)("link",{precedence:"dynamic",href:o,rel:"stylesheet",as:"style",nonce:a.nonce},e):((0,s.preload)(o,{as:"script",fetchPriority:"low",nonce:a.nonce}),null)})})}},69093,(e,a,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"default",{enumerable:!0,get:function(){return d}});let t=e.r(43476),s=e.r(71645),r=e.r(67585),i=e.r(52157);function n(e){return{default:e&&"default"in e?e.default:e}}let l={loader:()=>Promise.resolve(n(()=>null)),loading:null,ssr:!0},d=function(e){let a={...l,...e},o=(0,s.lazy)(()=>a.loader().then(n)),d=a.loading;function c(e){let n=d?(0,t.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,l=!a.ssr||!!a.loading,c=l?s.Suspense:s.Fragment,u=a.ssr?(0,t.jsxs)(t.Fragment,{children:["u"<typeof window?(0,t.jsx)(i.PreloadChunks,{moduleIds:a.modules}):null,(0,t.jsx)(o,{...e})]}):(0,t.jsx)(r.BailoutToCSR,{reason:"next/dynamic",children:(0,t.jsx)(o,{...e})});return(0,t.jsx)(c,{...l?{fallback:n}:{},children:u})}return c.displayName="LoadableComponent",c}},70703,(e,a,o)=>{"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"default",{enumerable:!0,get:function(){return s}});let t=e.r(55682)._(e.r(69093));function s(e,a){let o={};"function"==typeof e&&(o.loader=e);let s={...o,...a};return(0,t.default)({...s,modules:s.loadableGenerated?.modules})}("function"==typeof o.default||"object"==typeof o.default&&null!==o.default)&&void 0===o.default.__esModule&&(Object.defineProperty(o.default,"__esModule",{value:!0}),Object.assign(o.default,o),a.exports=o.default)},15596,e=>{"use strict";let a=[{id:"1",titulo:"Petição Inicial - Ação de Cobrança",clienteId:"1",cliente:"Maria Oliveira Santos",processo:"1234567-89.2024.8.26.0100",tipo:"inicial",status:"finalizada",dataProtocolo:"2024-02-20",numeroProtocolo:"PROT-2024-000891",updatedAt:"2024-02-20T14:30:00",createdAt:"2024-02-01T09:00:00",conteudo:`<h1>EXCELENT\xcdSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA 1\xaa VARA C\xcdVEL DA COMARCA DE S\xc3O PAULO/SP</h1>

<p><strong>MARIA OLIVEIRA SANTOS</strong>, brasileira, casada, professora, portadora do RG n.\xba 12.345.678-9 e CPF n.\xba 123.456.789-00, residente e domiciliada na Rua das Flores, 123, Centro, S\xe3o Paulo/SP, vem respeitosamente \xe0 presen\xe7a de Vossa Excel\xeancia, por interm\xe9dio de seu advogado que esta subscreve, com escrit\xf3rio profissional na Av. Paulista, 1.000, S\xe3o Paulo/SP, propor a presente</p>

<h2>A\xc7\xc3O DE COBRAN\xc7A</h2>

<p>em face de <strong>EMPRESA DEVEDORA LTDA.</strong>, pessoa jur\xeddica de direito privado, inscrita no CNPJ sob n.\xba 00.000.000/0001-00, com sede na Av. Principal, 500, S\xe3o Paulo/SP, pelos fatos e fundamentos a seguir expostos.</p>

<h2>I – DOS FATOS</h2>

<p>A requerente firmou contrato de presta\xe7\xe3o de servi\xe7os com a requerida em 01/01/2023, no valor total de R$ 150.000,00 (cento e cinquenta mil reais), a ser pago em parcelas mensais.</p>

<p>Ocorre que, n\xe3o obstante a regular presta\xe7\xe3o dos servi\xe7os pela requerente, a requerida deixou de honrar as obriga\xe7\xf5es financeiras pactuadas, acumulando d\xe9bito no montante ora cobrado.</p>

<h2>II – DO DIREITO</h2>

<p>O inadimplemento contratual gera para o credor o direito de exigir o cumprimento da obriga\xe7\xe3o, conforme preceitua o art. 389 do C\xf3digo Civil.</p>

<h2>III – DOS PEDIDOS</h2>

<p>Diante do exposto, requer a Vossa Excel\xeancia:</p>

<ol>
  <li>A cita\xe7\xe3o da requerida para, querendo, contestar a presente a\xe7\xe3o;</li>
  <li>A proced\xeancia total dos pedidos, condenando-se a requerida ao pagamento do valor de R$ 150.000,00 (cento e cinquenta mil reais);</li>
  <li>A condena\xe7\xe3o da requerida ao pagamento das custas processuais e honor\xe1rios advocat\xedcios.</li>
</ol>

<p>D\xe1-se \xe0 causa o valor de R$ 150.000,00 (cento e cinquenta mil reais).</p>

<p>Nestes termos, pede deferimento.</p>

<p>S\xe3o Paulo, 20 de fevereiro de 2024.</p>`},{id:"2",titulo:"Contestação - Ação Trabalhista",clienteId:"2",cliente:"João Carlos Silva",processo:"9876543-21.2024.5.02.0001",tipo:"contestacao",status:"revisao",dataProtocolo:null,numeroProtocolo:null,updatedAt:"2024-02-19T10:15:00",createdAt:"2024-02-10T08:00:00",conteudo:`<h1>EXCELENT\xcdSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DO TRABALHO DA 3\xaa VARA DO TRABALHO DE S\xc3O PAULO/SP</h1>

<p><strong>JO\xc3O CARLOS SILVA</strong>, por seu advogado infra-assinado, nos autos da Reclama\xe7\xe3o Trabalhista acima referenciada, vem apresentar sua</p>

<h2>CONTESTA\xc7\xc3O</h2>

<p>pelos motivos de fato e de direito a seguir expostos, requerendo ao final a total improced\xeancia dos pedidos formulados pelo reclamante.</p>

<h2>I – PRELIMINAR – IN\xc9PCIA DA INICIAL</h2>

<p>A peti\xe7\xe3o inicial apresenta grave v\xedcio formal, pois o reclamante deixou de precisar o per\xedodo de trabalho alegado, tornando imposs\xedvel a defesa adequada do reclamado.</p>

<h2>II – DO M\xc9RITO</h2>

<p>No m\xe9rito, todos os pedidos merecem ser julgados improcedentes, conforme demonstrado a seguir.</p>`},{id:"3",titulo:"Recurso de Apelação",clienteId:"3",cliente:"Ana Paula Costa",processo:"5555555-55.2023.8.26.0200",tipo:"recurso",status:"rascunho",dataProtocolo:null,numeroProtocolo:null,updatedAt:"2024-02-18T16:45:00",createdAt:"2024-02-15T14:00:00",conteudo:`<h2>RECURSO DE APELA\xc7\xc3O</h2>

<p><strong>ANA PAULA COSTA</strong>, j\xe1 qualificada nos autos, por interm\xe9dio de seu advogado, vem interpor o presente</p>

<h2>RECURSO DE APELA\xc7\xc3O</h2>

<p>em face da r. senten\xe7a prolatada nos autos em ep\xedgrafe, que julgou improcedente o pedido da apelante, pelas raz\xf5es que passa a expor.</p>

<h2>I – DA TEMPESTIVIDADE</h2>

<p>O presente recurso \xe9 tempestivo, pois interposto dentro do prazo legal de 15 (quinze) dias \xfateis previsto no art. 1.003, \xa75\xba do CPC.</p>`},{id:"4",titulo:"Manifestação sobre Documentos",clienteId:"4",cliente:"Pedro Henrique Almeida",processo:"7777777-77.2024.8.26.0300",tipo:"manifestacao",status:"protocolada",dataProtocolo:"2024-02-15",numeroProtocolo:"PROT-2024-001234",updatedAt:"2024-02-15T09:20:00",createdAt:"2024-02-12T11:00:00",conteudo:`<h2>MANIFESTA\xc7\xc3O</h2>

<p><strong>PEDRO HENRIQUE ALMEIDA</strong>, por seu advogado, vem \xe0 presen\xe7a de Vossa Excel\xeancia apresentar sua manifesta\xe7\xe3o acerca dos documentos juntados pela parte contr\xe1ria, requerendo seja dado o fiel cumprimento ao disposto no art. 437 do CPC.</p>

<h2>DOS DOCUMENTOS APRESENTADOS</h2>

<p>Analisando os documentos trazidos pela parte adversa, verifica-se que os mesmos n\xe3o s\xe3o suficientes para sustentar as alega\xe7\xf5es formuladas, conforme demonstrado a seguir.</p>`}];function o(e){return a.find(a=>a.id===e)}let t=[{id:"t1",nome:"Petição Inicial Cível",tipo:"inicial",conteudo:`<h1>EXCELENT\xcdSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DE DIREITO DA ___ VARA C\xcdVEL DA COMARCA DE ___</h1>

<p><strong>{{nome_cliente}}</strong>, brasileiro(a), portador(a) do CPF n.\xba {{cpf}}, residente em {{endereco}}, por interm\xe9dio de seu advogado, vem propor a presente</p>

<h2>A\xc7\xc3O ___</h2>

<p>em face de <strong>___</strong>, pelos fatos e fundamentos a seguir expostos.</p>

<h2>I – DOS FATOS</h2>

<p>Descreva os fatos aqui...</p>

<h2>II – DO DIREITO</h2>

<p>Fundamente o pedido...</p>

<h2>III – DOS PEDIDOS</h2>

<ol>
  <li>A cita\xe7\xe3o do r\xe9u;</li>
  <li>A proced\xeancia dos pedidos;</li>
  <li>A condena\xe7\xe3o em custas e honor\xe1rios.</li>
</ol>

<p>D\xe1-se \xe0 causa o valor de R$ ___.</p>

<p>Nestes termos, pede deferimento.</p>

<p>___, ___ de ___ de ___.</p>`},{id:"t2",nome:"Contestação Trabalhista",tipo:"contestacao",conteudo:`<h1>EXCELENT\xcdSSIMO(A) SENHOR(A) DOUTOR(A) JUIZ(A) DO TRABALHO DA ___ VARA DO TRABALHO</h1>

<p><strong>{{nome_cliente}}</strong>, j\xe1 qualificado(a) nos autos, vem apresentar sua</p>

<h2>CONTESTA\xc7\xc3O</h2>

<p>requerendo a total improced\xeancia dos pedidos.</p>

<h2>I – PRELIMINAR</h2>

<p>Descreva eventuais preliminares...</p>

<h2>II – DO M\xc9RITO</h2>

<p>Rebata os pedidos do reclamante...</p>

<h2>III – DOS PEDIDOS</h2>

<p>Requer a total improced\xeancia dos pedidos formulados, com condena\xe7\xe3o do reclamante em honor\xe1rios advocat\xedcios.</p>`},{id:"t3",nome:"Recurso de Apelação",tipo:"recurso",conteudo:`<h2>RECURSO DE APELA\xc7\xc3O</h2>

<p><strong>{{nome_cliente}}</strong>, por seu advogado, vem interpor o presente</p>

<h2>RECURSO DE APELA\xc7\xc3O</h2>

<p>em face da r. senten\xe7a de fls. ___.</p>

<h2>I – DA TEMPESTIVIDADE</h2>

<p>O presente recurso \xe9 tempestivo, interposto dentro do prazo legal.</p>

<h2>II – DO CABIMENTO</h2>

<p>O recurso \xe9 cab\xedvel nos termos do art. 1.009 do CPC.</p>

<h2>III – DAS RAZ\xd5ES</h2>

<p>Exponha as raz\xf5es do recurso...</p>

<h2>IV – DO PEDIDO</h2>

<p>Requer o provimento do recurso para reformar a senten\xe7a.</p>`},{id:"t4",nome:"Manifestação Genérica",tipo:"manifestacao",conteudo:`<h2>MANIFESTA\xc7\xc3O</h2>

<p><strong>{{nome_cliente}}</strong>, por seu advogado, vem \xe0 presen\xe7a de Vossa Excel\xeancia apresentar sua</p>

<h2>MANIFESTA\xc7\xc3O</h2>

<p>acerca de ___.</p>

<h2>DOS FATOS</h2>

<p>Descreva os fatos...</p>

<h2>DO PEDIDO</h2>

<p>Requer o recebimento e processamento da presente manifesta\xe7\xe3o.</p>

<p>Nestes termos, pede deferimento.</p>`}];e.s(["getPeticaoById",()=>o,"mockPeticoes",0,a,"statusConfig",0,{rascunho:{label:"Rascunho",className:"bg-gray-500/10 text-gray-600 border-gray-200",badgeClass:"bg-gray-500"},revisao:{label:"Em Revisão",className:"bg-amber-500/10 text-amber-600 border-amber-200",badgeClass:"bg-amber-500"},finalizada:{label:"Finalizada",className:"bg-blue-500/10 text-blue-600 border-blue-200",badgeClass:"bg-blue-500"},protocolada:{label:"Protocolada",className:"bg-green-500/10 text-green-600 border-green-200",badgeClass:"bg-green-500"}},"templates",0,t,"tipoConfig",0,{inicial:"Inicial",contestacao:"Contestação",replica:"Réplica",manifestacao:"Manifestação",recurso:"Recurso",outro:"Outro"},"variaveis",0,[{nome:"{{nome_cliente}}",descricao:"Nome completo do cliente"},{nome:"{{cpf}}",descricao:"CPF do cliente"},{nome:"{{rg}}",descricao:"RG do cliente"},{nome:"{{endereco}}",descricao:"Endereço completo"},{nome:"{{numero_processo}}",descricao:"Número do processo"},{nome:"{{data_hoje}}",descricao:"Data atual por extenso"},{nome:"{{oab}}",descricao:"Número OAB do advogado"},{nome:"{{nome_advogado}}",descricao:"Nome do advogado"}]])},71689,e=>{"use strict";let a=(0,e.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",()=>a],71689)},14764,e=>{"use strict";let a=(0,e.i(75254).default)("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);e.s(["Send",()=>a],14764)},74886,e=>{"use strict";let a=(0,e.i(75254).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",()=>a],74886)},93109,e=>{"use strict";var a=e.i(43476),o=e.i(71645),t=e.i(70703),s=e.i(18566),r=e.i(46932),i=e.i(71689),n=e.i(56909),l=e.i(14764),d=e.i(86536),c=e.i(78583),u=e.i(74886),p=e.i(78745),p=p,x=e.i(64659),m=e.i(46349),m=m,h=e.i(31278),f=e.i(67881),g=e.i(23750),v=e.i(10708),j=e.i(70065),b=e.i(62870),A=e.i(94179),C=e.i(69035),O=e.i(71428),y=e.i(46696),N=e.i(15596);let S=(0,t.default)(()=>e.A(12478).then(e=>e.PeticaoEditor),{loadableGenerated:{modules:[65559]},ssr:!1,loading:()=>(0,a.jsx)(O.Skeleton,{className:"h-[500px] w-full rounded-lg"})});function I(){return(0,a.jsx)(o.Suspense,{fallback:(0,a.jsx)("div",{className:"flex justify-center p-12",children:(0,a.jsx)(h.Loader2,{className:"w-8 h-8 animate-spin text-muted-foreground"})}),children:(0,a.jsx)(E,{})})}function E(){let e=(0,s.useSearchParams)(),t=(0,s.useRouter)(),h=e.get("id")||"",O=(0,N.getPeticaoById)(h),[I,E]=(0,o.useState)(O?.titulo??""),[P,D]=(0,o.useState)(O?.tipo??""),[R,T]=(0,o.useState)(O?.clienteId??""),[_,w]=(0,o.useState)(O?.processo??""),[k,M]=(0,o.useState)(O?.conteudo??""),[L,q]=(0,o.useState)(!1),[z,V]=(0,o.useState)(null),[F,U]=(0,o.useState)(!0),[B,H]=(0,o.useState)(!0);if(!O)return(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center py-24 gap-4",children:[(0,a.jsx)(c.FileText,{className:"w-12 h-12 text-muted-foreground/30"}),(0,a.jsx)("h2",{className:"text-xl font-semibold",children:"Petição não encontrada"}),(0,a.jsxs)(f.Button,{variant:"outline",onClick:()=>t.push("/peticoes"),className:"gap-2",children:[(0,a.jsx)(i.ArrowLeft,{className:"w-4 h-4"}),"Voltar"]})]});let $=N.statusConfig[O.status],J=async e=>{I.trim()?(q(!0),await new Promise(e=>setTimeout(e,1200)),q(!1),y.toast.success(`Peti\xe7\xe3o salva como ${{rascunho:"rascunho",revisao:"em revisão",finalizada:"finalizada"}[e]}!`),setTimeout(()=>t.push(`/peticoes/detalhes?id=${h}`),800)):y.toast.error("O título é obrigatório.")};return(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)(r.motion.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"flex items-center justify-between gap-4",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)(f.Button,{variant:"ghost",size:"icon",onClick:()=>t.back(),children:(0,a.jsx)(i.ArrowLeft,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold tracking-tight",children:"Editar Petição"}),(0,a.jsx)(A.Badge,{variant:"outline",className:`text-xs ${$.className}`,children:$.label})]}),(0,a.jsx)("p",{className:"text-sm text-muted-foreground",children:O.cliente})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsxs)(f.Button,{variant:"outline",className:"gap-2",onClick:()=>t.push(`/peticoes/detalhes?id=${h}`),children:[(0,a.jsx)(d.Eye,{className:"w-4 h-4"}),"Visualizar"]}),(0,a.jsxs)(f.Button,{variant:"outline",onClick:()=>J("rascunho"),disabled:L,className:"gap-2",children:[(0,a.jsx)(n.Save,{className:"w-4 h-4"}),"Salvar Rascunho"]}),(0,a.jsxs)(f.Button,{onClick:()=>J("finalizada"),disabled:L||!I,className:"gap-2",children:[(0,a.jsx)(l.Send,{className:"w-4 h-4"}),L?"Salvando...":"Finalizar"]})]})]}),(0,a.jsxs)("div",{className:"grid gap-6 lg:grid-cols-3",children:[(0,a.jsxs)("div",{className:"lg:col-span-2 space-y-4",children:[(0,a.jsx)(r.motion.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{delay:.05},children:(0,a.jsxs)(j.Card,{children:[(0,a.jsx)(j.CardHeader,{children:(0,a.jsx)(j.CardTitle,{className:"text-base",children:"Informações da Petição"})}),(0,a.jsxs)(j.CardContent,{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(v.Label,{htmlFor:"titulo",children:"Título *"}),(0,a.jsx)(g.Input,{id:"titulo",value:I,onChange:e=>E(e.target.value),placeholder:"Ex: Petição Inicial - Ação de Cobrança"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(v.Label,{children:"Tipo *"}),(0,a.jsxs)(b.Select,{value:P,onValueChange:D,children:[(0,a.jsx)(b.SelectTrigger,{children:(0,a.jsx)(b.SelectValue,{placeholder:"Selecione o tipo"})}),(0,a.jsx)(b.SelectContent,{children:Object.entries(N.tipoConfig).map(([e,o])=>(0,a.jsx)(b.SelectItem,{value:e,children:o},e))})]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(v.Label,{children:"Cliente"}),(0,a.jsxs)(b.Select,{value:R,onValueChange:T,children:[(0,a.jsx)(b.SelectTrigger,{children:(0,a.jsx)(b.SelectValue,{placeholder:"Selecione o cliente"})}),(0,a.jsxs)(b.SelectContent,{children:[(0,a.jsx)(b.SelectItem,{value:"1",children:"Maria Oliveira Santos"}),(0,a.jsx)(b.SelectItem,{value:"2",children:"João Carlos Silva"}),(0,a.jsx)(b.SelectItem,{value:"3",children:"Ana Paula Costa"}),(0,a.jsx)(b.SelectItem,{value:"4",children:"Pedro Henrique Almeida"}),(0,a.jsx)(b.SelectItem,{value:"5",children:"Juliana Ferreira Santos"})]})]})]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(v.Label,{htmlFor:"processo",children:"Número do Processo"}),(0,a.jsx)(g.Input,{id:"processo",value:_,onChange:e=>w(e.target.value),placeholder:"0000000-00.0000.0.00.0000",className:"font-mono"})]})]})]})}),(0,a.jsx)(r.motion.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{delay:.1},children:(0,a.jsxs)(j.Card,{children:[(0,a.jsxs)(j.CardHeader,{children:[(0,a.jsx)(j.CardTitle,{className:"text-base",children:"Conteúdo da Petição"}),(0,a.jsxs)(j.CardDescription,{children:["Use a barra de ferramentas para formatar o texto. Variáveis como"," ",(0,a.jsx)("code",{className:"text-xs bg-muted px-1 py-0.5 rounded",children:"{{nome_cliente}}"})," ","serão substituídas automaticamente."]})]}),(0,a.jsx)(j.CardContent,{className:"p-0",children:(0,a.jsx)(S,{content:k,onChange:M,placeholder:"Excelentíssimo(a) Senhor(a) Doutor(a) Juiz(a)..."})})]})})]}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsx)(r.motion.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},transition:{delay:.1},children:(0,a.jsxs)(j.Card,{children:[(0,a.jsxs)(j.CardHeader,{className:"cursor-pointer select-none",onClick:()=>U(!F),children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)(j.CardTitle,{className:"text-sm flex items-center gap-2",children:[(0,a.jsx)(c.FileText,{className:"w-4 h-4 text-purple-500"}),"Templates"]}),F?(0,a.jsx)(x.ChevronDown,{className:"w-4 h-4 text-muted-foreground"}):(0,a.jsx)(m.default,{className:"w-4 h-4 text-muted-foreground"})]}),(0,a.jsx)(j.CardDescription,{children:"Clique para aplicar um modelo"})]}),F&&(0,a.jsx)(j.CardContent,{className:"space-y-2 pt-0",children:N.templates.map(e=>(0,a.jsxs)("button",{onClick:()=>{M(e.conteudo),y.toast.success("Template aplicado!",{description:"O conteúdo do editor foi substituído pelo template."})},className:"w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border text-sm text-left hover:bg-muted/60 hover:border-primary/40 transition-all group",children:[(0,a.jsx)(c.FileText,{className:"w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-500 shrink-0 transition-colors"}),(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsx)("p",{className:"font-medium truncate",children:e.nome}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground",children:N.tipoConfig[e.tipo]})]})]},e.id))})]})}),(0,a.jsx)(r.motion.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},transition:{delay:.15},children:(0,a.jsxs)(j.Card,{children:[(0,a.jsxs)(j.CardHeader,{className:"cursor-pointer select-none",onClick:()=>H(!B),children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)(j.CardTitle,{className:"text-sm flex items-center gap-2",children:[(0,a.jsx)("span",{className:"text-amber-500 font-mono text-base",children:"{}"}),"Variáveis"]}),B?(0,a.jsx)(x.ChevronDown,{className:"w-4 h-4 text-muted-foreground"}):(0,a.jsx)(m.default,{className:"w-4 h-4 text-muted-foreground"})]}),(0,a.jsx)(j.CardDescription,{children:"Clique para copiar e inserir no texto"})]}),B&&(0,a.jsx)(j.CardContent,{className:"space-y-1.5 pt-0",children:N.variaveis.map(e=>(0,a.jsxs)("div",{className:"flex items-center justify-between gap-2 px-2 py-1.5 rounded-md bg-muted/50 hover:bg-muted transition-colors",children:[(0,a.jsxs)("div",{className:"min-w-0",children:[(0,a.jsx)("code",{className:"text-xs font-mono text-amber-600 dark:text-amber-400",children:e.nome}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground truncate",children:e.descricao})]}),(0,a.jsx)("button",{onClick:()=>{var a;return a=e.nome,void navigator.clipboard.writeText(a).then(()=>{V(a),y.toast.success(`Vari\xe1vel ${a} copiada!`),setTimeout(()=>V(null),2e3)})},className:"shrink-0 w-7 h-7 flex items-center justify-center rounded hover:bg-background transition-colors",title:"Copiar variável",children:z===e.nome?(0,a.jsx)(p.default,{className:"w-3.5 h-3.5 text-green-500"}):(0,a.jsx)(u.Copy,{className:"w-3.5 h-3.5 text-muted-foreground"})})]},e.nome))})]})}),(0,a.jsx)(r.motion.div,{initial:{opacity:0,x:10},animate:{opacity:1,x:0},transition:{delay:.2},children:(0,a.jsxs)(j.Card,{children:[(0,a.jsx)(j.CardHeader,{children:(0,a.jsx)(j.CardTitle,{className:"text-sm",children:"Alterar Status"})}),(0,a.jsxs)(j.CardContent,{className:"space-y-2",children:[["rascunho","revisao","finalizada"].map(e=>{let o=N.statusConfig[e],t=O.status===e;return(0,a.jsxs)("button",{onClick:()=>!t&&J(e),disabled:t||L,className:`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${t?`${o.className} border-current font-medium cursor-default`:"border-border hover:bg-muted/60 text-muted-foreground hover:text-foreground"}`,children:[(0,a.jsx)("span",{className:`w-2 h-2 rounded-full ${"rascunho"===e?"bg-gray-400":"revisao"===e?"bg-amber-400":"bg-blue-400"}`}),o.label,t&&(0,a.jsx)("span",{className:"ml-auto text-xs opacity-60",children:"atual"})]},e)}),(0,a.jsx)(C.Separator,{}),(0,a.jsxs)("button",{onClick:()=>J("finalizada"),disabled:L,className:"w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-green-300 bg-green-50 dark:bg-green-950/20 dark:border-green-800 text-green-700 dark:text-green-400 text-sm hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors font-medium",children:[(0,a.jsx)(l.Send,{className:"w-3.5 h-3.5"}),"Finalizar e salvar"]})]})]})})]})]})]})}e.s(["default",()=>I,"dynamic",0,"force-dynamic"],93109)},12478,e=>{e.v(a=>Promise.all(["static/chunks/bd59e4bad19ae464.js","static/chunks/5929fa7b1086516d.js"].map(a=>e.l(a))).then(()=>a(65559)))}]);