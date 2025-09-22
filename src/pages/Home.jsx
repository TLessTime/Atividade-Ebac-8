import React, { useState, useEffect } from 'react'
import ProdutoCard from '../components/ProdutoCard'


export default function Home() {
const [produtos, setProdutos] = useState([])
const [loading, setLoading] = useState(true)


const [formData, setFormData] = useState({
nome: '',
preco: '',
descricao: '',
imagem: ''
})


useEffect(() => {
setTimeout(() => {
setProdutos([
{ id: 1, nome: 'Notebook', preco: 3500, descricao: 'Notebook gamer', imagem: 'https://via.placeholder.com/150' },
{ id: 2, nome: 'Smartphone', preco: 2000, descricao: 'Celular Android', imagem: 'https://via.placeholder.com/150' }
])
setLoading(false)
}, 1500)
}, [])


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
}
