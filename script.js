const produtos = [
  {id:1,nome:"Vaso Aurora",categoria:"vasos",categoriaNome:"Vasos",preco:79.90,descricao:"Vaso orgânico em tom terracota.",imagem:"https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80"},
  {id:2,nome:"Caneca Terra",categoria:"utilitarios",categoriaNome:"Utilitários",preco:45.00,descricao:"Caneca artesanal com acabamento natural.",imagem:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80"},
  {id:3,nome:"Prato Orgânico",categoria:"utilitarios",categoriaNome:"Utilitários",preco:58.00,descricao:"Prato decorativo com bordas irregulares.",imagem:"https://images.unsplash.com/photo-1612196808214-b7e1d6145a8c?auto=format&fit=crop&w=700&q=80"},
  {id:4,nome:"Mini Vaso Botânico",categoria:"vasos",categoriaNome:"Vasos",preco:32.90,descricao:"Pequeno vaso para plantinhas e mudas.",imagem:"https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80"},
  {id:5,nome:"Porta-incenso Serena",categoria:"decoracao",categoriaNome:"Decoração",preco:28.00,descricao:"Um detalhe delicado para seu cantinho.",imagem:"https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80"},
  {id:6,nome:"Escultura Sol",categoria:"decoracao",categoriaNome:"Decoração",preco:64.90,descricao:"Peça escultural inspirada nas formas da natureza.",imagem:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80"},
  {id:7,nome:"Tigela Raiz",categoria:"utilitarios",categoriaNome:"Utilitários",preco:39.90,descricao:"Tigela artesanal para servir ou decorar.",imagem:"https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=700&q=80"},
  {id:8,nome:"Vaso Horizonte",categoria:"vasos",categoriaNome:"Vasos",preco:89.90,descricao:"Vaso marcante para compor ambientes.",imagem:"https://images.unsplash.com/photo-1576020799627-aeac74d5802a?auto=format&fit=crop&w=700&q=80"}
];
let carrinho = [];
const dinheiro = valor => valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const lista = document.getElementById("lista-produtos");

function mostrarProdutos(categoria="todos"){
  const filtrados = categoria==="todos" ? produtos : produtos.filter(p=>p.categoria===categoria);
  lista.innerHTML = filtrados.map(p=>`
    <article class="produto">
      <div class="produto-imagem"><img src="${p.imagem}" alt="${p.nome}" loading="lazy" onerror="this.src='https://placehold.co/600x600/f0e8dc/344b3d?text=Artesanato'"></div>
      <div class="produto-info">
        <span class="produto-categoria">${p.categoriaNome}</span>
        <h3>${p.nome}</h3>
        <p class="produto-descricao">${p.descricao}</p>
        <div class="produto-rodape"><span class="preco">${dinheiro(p.preco)}</span><button class="adicionar" data-id="${p.id}">+ Adicionar</button></div>
      </div>
    </article>`).join("");
}
function atualizarCarrinho(){
  document.getElementById("contador").textContent=carrinho.reduce((s,i)=>s+i.quantidade,0);
  document.getElementById("total").textContent=dinheiro(carrinho.reduce((s,i)=>s+i.preco*i.quantidade,0));
  const area=document.getElementById("itens-carrinho");
  if(!carrinho.length){area.innerHTML='<p class="vazio">Seu carrinho está vazio. Que tal escolher uma peça artesanal?</p>';return;}
  area.innerHTML=carrinho.map(i=>`<div class="item-carrinho"><div><strong>${i.nome}</strong><small>${i.quantidade} × ${dinheiro(i.preco)}</small></div><div><strong>${dinheiro(i.preco*i.quantidade)}</strong><br><button data-remover="${i.id}">Remover</button></div></div>`).join("");
}
lista.addEventListener("click",e=>{const btn=e.target.closest("[data-id]");if(!btn)return;const p=produtos.find(p=>p.id===Number(btn.dataset.id));const item=carrinho.find(i=>i.id===p.id);item?item.quantidade++:carrinho.push({...p,quantidade:1});atualizarCarrinho();btn.textContent="Adicionado ✓";setTimeout(()=>btn.textContent="+ Adicionar",1000);});
document.querySelectorAll(".filtro").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filtro").forEach(b=>b.classList.remove("ativo"));btn.classList.add("ativo");mostrarProdutos(btn.dataset.categoria);}));
document.getElementById("itens-carrinho").addEventListener("click",e=>{const btn=e.target.closest("[data-remover]");if(!btn)return;carrinho=carrinho.filter(i=>i.id!==Number(btn.dataset.remover));atualizarCarrinho();});
const modal=document.getElementById("modal-carrinho");
document.getElementById("abrir-carrinho").addEventListener("click",()=>{modal.classList.add("aberto");modal.setAttribute("aria-hidden","false");});
function fecharModal(){modal.classList.remove("aberto");modal.setAttribute("aria-hidden","true");}
document.getElementById("fechar-carrinho").addEventListener("click",fecharModal);
modal.addEventListener("click",e=>{if(e.target===modal)fecharModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")fecharModal();});
document.getElementById("finalizar").addEventListener("click",()=>{
  if(!carrinho.length){alert("Adicione pelo menos um produto ao carrinho.");return;}
  const resumo=carrinho.map(i=>`${i.quantidade}x ${i.nome} — ${dinheiro(i.preco*i.quantidade)}`).join("\n");
  const mensagem=`Olá! Gostaria de fazer este pedido:\n\n${resumo}\n\nTotal: ${dinheiro(carrinho.reduce((s,i)=>s+i.preco*i.quantidade,0))}`;
  // Troque 5500000000000 pelo número real da loja, incluindo código do país e DDD.
  const numero="5500000000000";
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`,"_blank","noopener");
});
document.getElementById("ano").textContent=new Date().getFullYear();
mostrarProdutos();atualizarCarrinho();
