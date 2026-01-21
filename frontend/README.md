# Flora Bella - Frontend

Sistema de gestão para floricultura desenvolvido em React.js com design moderno e responsivo.

## 🌸 Sobre o Projeto

O Flora Bella é uma aplicação web completa para gestão de floricultura, permitindo o controle de clientes, produtos e vendas com uma interface moderna e intuitiva.

## 🛠 Tecnologias

- **React 19.1.0** - Biblioteca JavaScript para interfaces
- **React Router DOM 7.6.2** - Roteamento SPA
- **Vite 7.0.0** - Build tool e dev server
- **ESLint** - Linting e qualidade de código
- **CSS3** - Estilização moderna com gradientes e animações

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header/         # Cabeçalho da aplicação
│   ├── Footer/         # Rodapé
│   ├── Hero/           # Seção hero da homepage
│   ├── Services/       # Seção de serviços
│   ├── Icons/          # Ícones SVG personalizados
│   ├── Toast/          # Sistema de notificações
│   └── ProtectedRoute/ # Proteção de rotas
├── contexts/           # Contextos React
│   └── AuthContext.jsx # Contexto de autenticação
├── layouts/            # Layouts da aplicação
│   └── DefaultLayout.jsx
├── pages/              # Páginas da aplicação
│   ├── auth/          # Páginas de autenticação
│   ├── home/          # Página inicial
│   ├── cliente/       # Gestão de clientes
│   ├── produto/       # Gestão de produtos
│   ├── venda/         # Gestão de vendas
│   └── errors/        # Páginas de erro
├── services/          # Serviços e APIs
│   ├── api.js         # Cliente HTTP
│   └── authService.js # Serviços de autenticação
├── styles/            # Estilos globais
├── utils/             # Utilitários
└── App.jsx            # Componente principal
```

## ⚙️ Instalação e Configuração

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Backend da Flora Bella rodando na porta 3000

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - O frontend está configurado para conectar com o backend em `http://localhost:3000`
   - Certifique-se de que o backend esteja rodando

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   - Abra [http://localhost:5173](http://localhost:5173) no navegador

## 🚀 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build de produção
npm run lint     # Executa linting do código
```

## 🎨 Funcionalidades

### 🔐 Autenticação
- Login seguro com JWT
- Proteção de rotas privadas
- Gerenciamento de sessão
- Interface de login moderna

### 👥 Gestão de Clientes
- Listagem de clientes
- Cadastro e edição
- Validação de dados
- Interface responsiva

### 🌸 Gestão de Produtos
- Catálogo de produtos
- Controle de estoque
- Preços e descrições
- Indicadores visuais de estoque

### 💰 Gestão de Vendas
- Registro de vendas
- Seleção de clientes e produtos
- Diferentes formas de pagamento
- Histórico de vendas

### 🏠 Homepage
- Design atrativo com hero section
- Apresentação dos serviços
- Animações suaves
- Call-to-actions

## 🎯 Características Técnicas

### Design System
- **Cores principais**: Verde (#2d5016, #52b788)
- **Tipografia**: Sans-serif moderna
- **Componentes**: Reutilizáveis e modulares
- **Responsividade**: Mobile-first

### Arquitetura
- **Context API**: Gerenciamento de estado global
- **Custom Hooks**: Lógica reutilizável
- **Protected Routes**: Segurança de rotas
- **Error Boundaries**: Tratamento de erros

### UX/UI
- **Toast Notifications**: Feedback visual
- **Loading States**: Estados de carregamento
- **Form Validation**: Validação em tempo real
- **Smooth Animations**: Transições suaves

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:
- 📱 **Mobile**: 320px - 768px
- 📟 **Tablet**: 768px - 1024px  
- 💻 **Desktop**: 1024px+

## 🔒 Segurança

- **JWT Authentication**: Tokens seguros
- **Protected Routes**: Rotas protegidas
- **Input Sanitization**: Sanitização de dados
- **Secure Messages**: Mensagens genéricas de erro

## 🌐 API Integration

O frontend consome a API REST do backend:
- **Base URL**: `http://localhost:3000/api`
- **Authentication**: Bearer Token
- **Error Handling**: Tratamento centralizado
- **Request Interceptors**: Interceptação automática

## 📊 Páginas Principais

### 🏠 Homepage (`/home`)
- Hero section com call-to-action
- Seção de serviços
- Design atrativo e moderno

### 👥 Clientes (`/clientes`)
- Listagem com tabela responsiva
- Formulários de cadastro/edição
- Validação de CPF e email

### 🌸 Produtos (`/produtos`)
- Catálogo visual
- Controle de estoque
- Indicadores de baixo estoque

### 💰 Vendas (`/vendas`)
- Registro de vendas
- Seleção de produtos
- Cálculo automático de totais

## 🎨 Componentes Destacados

### Header
- Navegação responsiva
- Menu hamburger mobile
- Informações do usuário logado

### Toast System
- Notificações não-intrusivas
- Diferentes tipos (success, error, warning)
- Auto-dismiss configurável

### Modern Icons
- Ícones SVG personalizados
- Consistência visual
- Otimizados para performance

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Configurações de Deploy
- **Dist folder**: `dist/`
- **SPA Routing**: Configurar fallback para `index.html`
- **Environment**: Configurar URL da API de produção

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
