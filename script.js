
const uploadBotao = document.getElementById("upload-botao");
const inputUpload = document.getElementById("imagem-upload");

uploadBotao.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };
    leitor.onerror = () => {
      reject(`Erro na leitura do arquivi ${arquivo.name}`);
    };
    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];
  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error("Erro na leitura desse arquivo");
    }
  }
});


/* ADicionando TAGS */
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagASerRemovido = evento.target.parentElement;
    listaTags.removeChild(tagASerRemovido);
  }
});
const tagsDisponiveis = [
  "Front-End",
  "Back-End",
  "FullStack",
  "Data-Science",
  "Python",
  "JavaScript",
];
async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}
inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificaTagsDisponiveis(tagTexto);
        if (tagExiste) {
          const tagNova = document.createElement("li");
          tagNova.innerHTML = `<p> ${tagTexto}</p> <img src="./imagens/close-black.svg" alt="close-black" class="remove-tag">`;
          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert("A Tag não foi encontrada");
        }
      } catch (error) {
        console.error("Erro na verificar a existencia da Tag");
        alert("Erro ao verificar a existencia da Tag. Verifique o console");
      }
    }
  }
});

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
  return new Promise((resolve,reject) =>{
    setTimeout(()=>{
      const deuCerto =Math.random() > 0.5;

      if(deuCerto) {
        resolve("Projeto publicado com sucesso.")
      } else {
        reject("Erro ao publicar o projeto")
      }
    }, 2000)
  })
}

const botaoPublicar = document.querySelector(".botao-publicar");

botaoPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();

  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

  console.log(nomeDoProjeto);
  console.log(descricaoDoProjeto);
  console.log(tagsProjeto);

  try{
    const resultado = await  publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) 
    console.log(resultado);
    alert("Deu certo!")
  } catch (error){
    console.log("Deu erro: ",error)
    alert("Deu errado!")
  }
});

const botaoDescartar = document.querySelector(".botao-descartar");
botaoDescartar.addEventListener("click", (evento)=>{
  evento.preventDefault();

  const formulario = document.querySelector("form");
  formulario.reset();

  imagemPrincipal.src = "./imagens/imagem1.svg";
  nomeDaImagem.textContent = "imagem_projeto.png";

  listaTags.innerHTML = "";
})
