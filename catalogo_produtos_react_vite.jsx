# Projeto: Catálogo de Produtos (React + Vite)

Este repositório contém um projeto front-end em React criado com Vite que implementa um catálogo de produtos com:
- componentes reutilizáveis (ProdutoCard, ProdutoForm)
- listagem dinâmica usando state e .map()
- formulário controlado para cadastro de produtos
- simulação de carregamento inicial via useEffect

---

## Estrutura de arquivos

```
catálogo-produtos-vite/
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ assets/
│  │  └─ placeholder.png
│  ├─ components/
│  │  ├─ ProdutoCard.jsx
│  │  └─ ProdutoForm.jsx
│  ├─ pages/
│  │  └─ Catalogo.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ .gitignore
├─ package.json
└─ README.md
```

---

## Como usar (comandos)

1. Criar o projeto com Vite (caso queira recriar localmente):

```bash
npm create vite@latest catalogo-produtos-vite -- --template react
cd catalogo-produtos-vite
npm install
```

2. Substituir/Adicionar os arquivos da pasta `src/` com os conteúdos deste repositório.

3. Rodar em modo de desenvolvimento:

```bash
npm run dev
```

4. Build de produção:

```bash
npm run build
```

---

## Arquivos principais (código)

> Observação: copie cada bloco para o arquivo correspondente em `src/`.

### `src/main.jsx`

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### `src/App.jsx`

```jsx
import React from 'react'
import Catalogo from './pages/Catalogo'

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Catálogo de Produtos</h1>
        <p>Exemplo com React, useState e useEffect (Vite)</p>
      </header>
      <main>
        <Catalogo />
      </main>
    </div>
  )
}
```

### `src/pages/Catalogo.jsx`

```jsx
import React, { useEffect, useState } from 'react'
import ProdutoCard from '../components/ProdutoCard'
import ProdutoForm from '../components/ProdutoForm'
import placeholder from '../assets/placeholder.png'

export default function Catalogo() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)

  // simula fetch de API
  useEffect(() => {
    setCarregando(true)
    const mock = [
      {
        id: 1,
        nome: 'Camiseta Básica',
        preco: 49.9,
        descricao: 'Camiseta 100% algodão, disponível em várias cores.',
        imagem: placeholder,
      },
      {
        id: 2,
        nome: 'Caneca de Cerâmica',
        preco: 29.9,
        descricao: 'Caneca 300ml, própria para micro-ondas e lava-louças.',
        imagem: placeholder,
      },
    ]

    const timeout = setTimeout(() => {
      setProdutos(mock)
      setCarregando(false)
    }, 1200)

    return () => clearTimeout(timeout)
  }, [])

  const adicionarProduto = (novo) => {
    // garante id único simples
    const id = produtos.length ? Math.max(...produtos.map(p => p.id)) + 1 : 1
    setProdutos(prev => [...prev, { ...novo, id }])
  }

  return (
    <section className="catalogo">
      <ProdutoForm onAdd={adicionarProduto} />

      <div className="lista">
        {carregando ? (
          <p className="loading">Carregando...</p>
        ) : produtos.length === 0 ? (
          <p>Sem produtos cadastrados.</p>
        ) : (
          <div className="grid">
            {produtos.map(prod => (
              <ProdutoCard key={prod.id} {...prod} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

### `src/components/ProdutoCard.jsx`

```jsx
import React from 'react'

export default function ProdutoCard({ nome, preco, descricao, imagem }) {
  return (
    <article className="produto-card">
      <img src={imagem} alt={nome} className="produto-img" />
      <div className="produto-body">
        <h3>{nome}</h3>
        <p className="preco">R$ {preco.toFixed(2)}</p>
        <p className="descricao">{descricao}</p>
      </div>
    </article>
  )
}
```

### `src/components/ProdutoForm.jsx`

```jsx
import React, { useState } from 'react'
import placeholder from '../assets/placeholder.png'

export default function ProdutoForm({ onAdd }) {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [descricao, setDescricao] = useState('')
  const [imagem, setImagem] = useState(placeholder)
  const [erro, setErro] = useState(null)

  const reset = () => {
    setNome('')
    setPreco('')
    setDescricao('')
    setImagem(placeholder)
    setErro(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // validação simples
    if (!nome.trim() || !preco || !descricao.trim()) {
      setErro('Preencha todos os campos obrigatórios (nome, preço e descrição).')
      return
    }

    const precoNum = Number(preco)
    if (Number.isNaN(precoNum) || precoNum < 0) {
      setErro('Preço inválido.')
      return
    }

    onAdd({ nome: nome.trim(), preco: precoNum, descricao: descricao.trim(), imagem })
    reset()
  }

  return (
    <form className="produto-form" onSubmit={handleSubmit}>
      <h2>Adicionar Produto</h2>
      {erro && <p className="erro">{erro}</p>}

      <label>
        Nome*:
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>

      <label>
        Preço* (ex: 29.9):
        <input value={preco} onChange={(e) => setPreco(e.target.value)} />
      </label>

      <label>
        Descrição*:
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </label>

      <label>
        URL da imagem (opcional):
        <input
          placeholder="Cole uma URL ou deixe em branco para usar placeholder"
          onChange={(e) => setImagem(e.target.value || placeholder)}
        />
      </label>

      <button type="submit">Adicionar</button>
    </form>
  )
}
```

### `src/index.css`

```css
:root{
  --gap: 16px;
  --card-bg: #fff;
  --muted: #666;
}

body{
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  margin: 0;
  background: #f5f5f7;
  color: #111;
}

.app-header{
  text-align: center;
  padding: 24px 16px;
  background: linear-gradient(90deg,#4b6cb7,#182848);
  color: white;
}

.catalogo{
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 16px 48px;
}

.produto-form{
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  margin-bottom: var(--gap);
}

.produto-form label{ display:block; margin-bottom:8px; }
.produto-form input, .produto-form textarea{ width:100%; padding:8px; margin-top:4px; border-radius:6px; border:1px solid #ddd }
.produto-form button{ margin-top:12px; padding:10px 14px; border-radius:8px; border:none; cursor:pointer }

.grid{
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap:16px;
}

.produto-card{ background:var(--card-bg); border-radius:10px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.06) }
.produto-img{ width:100%; height:150px; object-fit:cover; display:block; }
.produto-body{ padding:12px }
.preco{ font-weight:700 }
.loading{ font-style:italic }
.erro{ color:#b00020 }
```

### `src/assets/placeholder.png`

- Coloque uma imagem de placeholder simples (ou use https://via.placeholder.com/400) como `src/assets/placeholder.png`.

---

## README.md (exemplo)

```md
# Catálogo de Produtos (React + Vite)

Projeto de exemplo para listagem e cadastro de produtos usando React.

## Rodando localmente

1. Instale dependências: `npm install`
2. Rode: `npm run dev`

## Publicação no GitHub

1. Crie um repositório público no GitHub.
2. No seu projeto local:

```bash
git init
git add .
git commit -m "Inicial: catálogo de produtos"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/NOME_REPO.git
git push -u origin main
```

Substitua `SEU_USUARIO` e `NOME_REPO` conforme necessário.

---

## Observações finais

Este projeto atende aos requisitos solicitados: componentes reutilizáveis, formulário controlado, uso de state e useEffect para simular fetch e mensagem de carregando.

Sinta-se à vontade para pedir:
- melhorias no estilo ou responsividade
- adicionar validação mais robusta
- persistência no localStorage ou integração com uma API real
- versão com TypeScript
