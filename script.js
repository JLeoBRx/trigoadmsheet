const dados = dadosXP;

  const turmaSelect = document.getElementById("turmaSelect");
  const alunoList = document.getElementById("alunoList");
  const top3List = document.getElementById("top3List");
  const fichaSecao = document.getElementById("ficha");
  const fichaDetalhes = document.getElementById("fichaDetalhes");
  
  function renderizarTurma(turma) {
    const alunos = [...dados[turma]].sort((a, b) => b.pontos - a.pontos);
  
    // Ranking Top 3
    top3List.innerHTML = "";
    alunos.slice(0, 3).forEach(aluno => {
      const li = document.createElement("li");
      li.textContent = `${aluno.nome} - ${aluno.pontos} pts`;
      top3List.appendChild(li);
    });
  
    // Lista de alunos
    alunoList.innerHTML = "";
    alunos.forEach((aluno, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${aluno.nome}`;
      li.onclick = () => mostrarFicha(aluno);
      alunoList.appendChild(li);
    });
  }
  
  function mostrarFicha(aluno) {
    console.log("Abrindo ficha para:", aluno.nome);
    const xpProximoNivel = (aluno.nivel + 1) * 30;
    const percentualXP = Math.min((aluno.pontos / xpProximoNivel) * 100, 100);
  
    fichaDetalhes.innerHTML = `
      <img src="${aluno.avatar}" alt="Avatar de ${aluno.nome}" class="ficha-avatar"/>
      <div class="barra-xp">
        <div class="xp-preenchido" style="width:${percentualXP}%"></div>
      </div>
      <div class="ficha-info">
        <p><strong>🧝 Nome:</strong> ${aluno.nome}</p>
        <p><strong>📚 Escola:</strong> ${aluno.curso}</p>
        <p><strong>🎓 Classe:</strong> ${aluno.classe}</p>
        <p><strong>⬆️ Nível:</strong> ${aluno.nivel}</p>
        <p><strong>✨ Experiência:</strong> ${aluno.pontos} XP</p>
      </div>
    `;
  
    const modal = document.getElementById("fichaModal");
    modal.classList.remove("hidden");
    modal.classList.add("show");
  }
  
  
  
  const opcoes = {
    pets: ["Pet X", "Pet Y", "Pet Z", "Pet W", "Pet Nulo"],
    grimorios: ["Grimório X", "Grimório Y", "Grimório Z", "Grimório Nulo"],
    defesas: ["Defesa Mágica", "Defesa Física", "Defesa Nula"],
    ataques: [
      "Ataque Tirar 10%",
      "Ataque Tirar 25%",
      "Ataque Tirar 50%",
      "Ataque -5",
      "Ataque -10",
      "Ataque -25",
      "Ataque Fracassado",
      "Roubar Pet",
      "Roubar Grimório"
    ]
  };
  
  function girarRoleta(tipo) {
    const resultadoElemento = document.getElementById(`resultado-${tipo}`);
    resultadoElemento.textContent = "🎡 Girando roleta...";
  
    setTimeout(() => {
      const itens = opcoes[tipo];
      const sorteado = itens[Math.floor(Math.random() * itens.length)];
      resultadoElemento.textContent = `🎯 Resultado: ${sorteado}!`;
    }, 2500); // 2.5 segundos de suspense
  }
  

  
  turmaSelect.addEventListener("change", () => {
    renderizarTurma(turmaSelect.value);
  });
  
  renderizarTurma("A");

  window.fecharFicha = function() {
    const modal = document.getElementById("fichaModal");
    modal.classList.remove("show");
    modal.classList.add("hidden");
  };
  
  