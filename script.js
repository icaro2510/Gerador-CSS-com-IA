const botao = document.querySelector(".botao-gerar");
const endereco = "https://api.groq.com/openai/v1/chat/completions";

async function gerarCodigo() {
  const textoUsuario = document.querySelector(".caixa-texto").value.trim();
  const blocoCodigo = document.querySelector(".bloco-codigo");
  const resultadoCodigo = document.querySelector(".resultado-codigo");

  if (!textoUsuario) {
    blocoCodigo.textContent = "Digite uma descrição para gerar o código.";
    return;
  }

  botao.disabled = true;
  botao.textContent = "Gerando código...";

  try {
    const resposta = await fetch(endereco, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer MINHA CHAVE AQUI ",
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

    if (!resposta.ok) {
      throw new Error("Não foi possível obter uma resposta da API.");
    }

    const dados = await resposta.json();
    const resultado = dados.choices[0].message.content;

    blocoCodigo.textContent = resultado;
    resultadoCodigo.srcdoc = resultado;
  } catch (erro) {
    blocoCodigo.textContent =
      "Ocorreu um erro ao gerar o código. Tente novamente.";
    console.error(erro);
  } finally {
    botao.disabled = false;
    botao.textContent = "Gerar código ⚡";
  }
}

botao.addEventListener("click", gerarCodigo);
