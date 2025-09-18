```jsx
import React from 'react'


export default function ProdutoCard({ nome, preco, descricao, imagem }) {
return (
<div className="produto-card">
<img src={imagem || 'https://via.placeholder.com/150'} alt={nome} />
<h2>{nome}</h2>
<p className="preco">R$ {preco.toFixed(2)}</p>
<p>{descricao}</p>
</div>
)
}
```
