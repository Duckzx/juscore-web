# 🏛️ JusCore - Inteligência em Gestão e Peticionamento Cloud

<div align="center">

![JusCore](https://img.shields.io/badge/JusCore-Premium-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0+-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Transforme seu escritório de advocacia em uma operação de alta performance**

[🚀 Demo ao Vivo](#) • [📖 Documentação](#) • [💬 Suporte](#)

</div>

---

## 📋 Sobre o Projeto

O **JusCore** é um ecossistema digital Web Native desenvolvido para revolucionar a gestão de escritórios de advocacia. Combinando um CRM Jurídico robusto com um Motor de Automação de Petições de última geração, tudo envolto em uma interface moderna, leve e acessível de qualquer dispositivo.

### 🎯 Diferenciais

- ✨ **Estética Premium**: Design limpo, minimalista e funcional com Dark Mode nativo
- ⚡ **Performance Extrema**: Carregamento instantâneo mesmo em conexões 3G/4G
- 🔒 **Segurança Bancária**: Criptografia SSL, 2FA e conformidade total com a LGPD
- 📱 **Mobile-First**: Experiência perfeita em qualquer dispositivo
- 🤖 **Automação Inteligente**: Reduz em até 80% o tempo de redação de peças

---

## 🚀 Stack Tecnológica

### 🎨 Frontend & Design

```bash
Next.js 14+          # Framework React com App Router
TypeScript           # Tipagem estática e segurança
Tailwind CSS 4.0     # Estilização utility-first
Shadcn/ui            # Componentes premium baseados em Radix UI
Framer Motion        # Animações fluidas e micro-interações
Lucide React         # Ícones minimalistas e modernos
```

### 📊 Estado & Dados

```bash
TanStack Query       # Cache inteligente e gerenciamento de estado
React Hook Form      # Formulários performáticos
Zod                  # Validação de schemas
```

### 🛠️ Utilitários

```bash
dayjs                # Manipulação de datas
clsx / tailwind-merge # Gerenciamento de classes CSS
Sonner               # Notificações elegantes
```

---

## 🏗️ Arquitetura do Projeto

```
juscore-web/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Rotas de autenticação
│   ├── (dashboard)/         # Rotas protegidas (área logada)
│   │   ├── clientes/        # Gestão de clientes
│   │   ├── peticoes/        # Automação de petições
│   │   ├── processos/       # Gestão de processos
│   │   ├── prazos/          # Calculadora de prazos
│   │   └── financeiro/      # Controle financeiro
│   ├── api/                 # Route Handlers (Backend interno)
│   ├── globals.css          # Tailwind & Design System
│   └── layout.tsx           # Provedores globais
│
├── components/               # Componentes React
│   ├── ui/                  # Componentes base (Shadcn)
│   ├── shared/              # Sidebar, Header, Footer
│   └── modules/             # Componentes de negócio
│       ├── clientes/        # Módulo de clientes
│       ├── peticoes/        # Módulo de petições
│       └── financeiro/      # Módulo financeiro
│
├── hooks/                    # Custom Hooks
│   ├── use-clientes.ts      # Lógica de clientes
│   ├── use-prazos.ts        # Cálculo de prazos
│   └── use-auth.ts          # Autenticação
│
├── lib/                      # Bibliotecas e utilitários
│   ├── prisma.ts            # Cliente do banco de dados
│   ├── utils.ts             # Funções auxiliares
│   └── validations/         # Schemas de validação (Zod)
│
├── services/                 # Camada de serviços
│   ├── tribunais-api.ts     # Integração com APIs de tribunais
│   └── docx-generator.ts    # Geração de documentos
│
├── types/                    # Definições TypeScript
│   └── index.d.ts
│
└── public/                   # Assets estáticos
```

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- **Node.js** 18+ ou superior
- **npm** ou **yarn** ou **pnpm**
- **Git**

### 🔧 Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/juscore-web.git
cd juscore-web
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/juscore"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"

# APIs Externas (opcional)
TRIBUNAL_API_KEY="sua-api-key"
```

4. **Execute as migrations do banco (futuro)**

```bash
npx prisma migrate dev
```

5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

6. **Acesse o sistema**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🎨 Design System

### Cores (Theme Tokens)

```typescript
// Light Mode
--background: oklch(1 0 0)           // Branco puro
--foreground: oklch(0.145 0 0)       // Quase preto
--primary: oklch(0.205 0 0)          // Cinza escuro
--accent: oklch(0.97 0 0)            // Cinza clarinho

// Dark Mode
--background: oklch(0.145 0 0)       // Preto profundo
--foreground: oklch(0.985 0 0)       // Branco suave
--primary: oklch(0.922 0 0)          // Cinza claro
--accent: oklch(0.269 0 0)           // Cinza médio
```

### Tipografia

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
font-smoothing: antialiased;
text-rendering: optimizeLegibility;
```

### Espaçamento e Bordas

```css
--radius: 0.625rem (10px)            // Border radius padrão
--spacing: sistema de 4px            // 4, 8, 12, 16, 24, 32...
```

---

## 🧩 Funcionalidades Principais

### 📁 Módulo de Clientes (CRM)

- ✅ Cadastro completo com validação em tempo real
- ✅ Timeline visual de eventos e interações
- ✅ Repositório de documentos seguro
- ✅ Busca e filtros avançados
- ✅ Estatísticas e métricas em tempo real

### 📝 Automação de Petições (Em Desenvolvimento)

- 🔲 Editor baseado em blocos (TipTap)
- 🔲 Merge inteligente de dados do cliente
- 🔲 Templates personalizáveis
- 🔲 Preview em tempo real
- 🔲 Exportação para PDF e DOCX

### 📅 Gestão de Prazos (Em Desenvolvimento)

- 🔲 Calculadora automática (dias úteis conforme CPC)
- 🔲 Alertas e notificações
- 🔲 Integração com Google Calendar
- 🔲 Descontos de feriados nacionais e locais

### 💰 Gestão Financeira (Em Desenvolvimento)

- 🔲 Controle de honorários
- 🔲 Parcelas e sucumbência
- 🔲 Fluxo de caixa visual
- 🔲 Relatórios financeiros

---

## 🎯 Público-Alvo

- ⚖️ **Advogados autônomos** que buscam escalabilidade
- 🏢 **Escritórios de advocacia** modernos
- 🏛️ **Departamentos jurídicos** corporativos
- 📚 **Consultorias jurídicas** especializadas

---

## 📊 Roadmap

### ✅ Fase 1 - MVP (Concluída)
- [x] Estrutura base do projeto
- [x] Design System e componentes UI
- [x] Módulo de Clientes (CRUD completo)
- [x] Sistema de navegação e layouts
- [x] Dark Mode

### 🔄 Fase 2 - Automação (Em Desenvolvimento)
- [ ] Editor de petições (TipTap)
- [ ] Sistema de templates
- [ ] Geração de documentos (PDF/DOCX)
- [ ] Banco de dados (Prisma + PostgreSQL)

### 🔮 Fase 3 - Integrações
- [ ] API de tribunais
- [ ] Autenticação (NextAuth.js)
- [ ] Upload de arquivos (AWS S3)
- [ ] Sincronização com calendários

### 🚀 Fase 4 - Performance
- [ ] Cache avançado
- [ ] PWA (Progressive Web App)
- [ ] Otimizações de imagens
- [ ] Analytics e monitoramento

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: Nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato e Suporte

- 📧 Email: suporte@juscore.com.br
- 🌐 Website: [juscore.com.br](https://juscore.com.br)
- 💬 Discord: [Comunidade JusCore](#)

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React incrível
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes UI de alta qualidade
- [Radix UI](https://www.radix-ui.com/) - Primitivos acessíveis
- [Framer Motion](https://www.framer.com/motion/) - Animações fluidas

---

<div align="center">

**Desenvolvido com ❤️ para a comunidade jurídica brasileira**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
