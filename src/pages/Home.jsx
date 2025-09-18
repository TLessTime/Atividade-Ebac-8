```jsx


function handleChange(e) {
setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
}


function handleSubmit(e) {
e.preventDefault()
if (!formData.nome || !formData.preco || !formData.descricao) return
setProdutos(prev => [
{ id: Date.now(), ...formData, preco: Number(formData.preco) },
...prev
])
setFormData({ nome: '', preco: '', descricao: '', imagem: '' })
}


return (
<div className="container">
<h1>Catálogo de Produtos</h1>


<form className="form" onSubmit={handleSubmit}>
<input
name="nome"
placeholder="Nome do produto"
value={formData.nome}
onChange={handleChange}
required
/>
<input
name="preco"
type="number"
placeholder="Preço"
value={formData.preco}
onChange={handleChange}
required
/>
<input
name="imagem"
placeholder="URL da imagem (opcional)"
value={formData.imagem}
onChange={handleChange}
/>
<textarea
name="descricao"
placeholder="Descrição"
value={formData.descricao}
onChange={handleChange}
required
/>
<button type="submit">Adicionar Produto</button>
</form>


{loading ? (
<p>Carregando produtos...</p>
) : (
<div className="produtos-grid">
{produtos.map(p => (
<ProdutoCard key={p.id} {...p} />
))}
</div>
)}
</div>
)
}
```
