//Ir no HTML e pegar o botao
//HTML = document (documento)
//Selecionar (querySelector) = é um seletor
//Quem? o botão
//Apelido para botão  - classes(class) = .

//Descobri quem é o botão
let botao = document.querySelector(".botao-gerar");
let endereco = "https://api.groq.com/openai/v1/chat/completions";

//Criei a funão que será chamada quando clicar no botão
async function gerarCodigo() {
  let textoUsuario = document.querySelector(".caixa-texto").value;
  let blocoCodigo = document.querySelector(".bloco-codigo");
  let resultadoCodigo = document.querySelector(".resultado-codigo");

  let resposta = await fetch(endereco, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":
        "Bearer ", //Aqui vai aChave de acesso da API da IA
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate.",
        },
        {
          role: "user",
          content: textoUsuario,  
        },
      ],
    }),
  });

  let dados = await resposta.json();
  let resultado = dados.choices[0].message.content;

  blocoCodigo.textContent = resultado;
  resultadoCodigo.srcdoc = resultado;
}

// Quando clicado chamar o gerarCodigo
botao.addEventListener("click", gerarCodigo);


