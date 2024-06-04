document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const form = document.getElementById('velaForm');
    const velasDiv = document.querySelector('.velas');

    addButton.addEventListener('click', () => {
        form.style.display = 'block';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('name').value;
        const cidade = document.getElementById('town').value;
        const intencao = document.getElementById('intencao').value;
        const ocultarIntencao = document.getElementById('ocultarIntencao').checked;
        const dataAcendimento = new Date().toISOString();
        const vela = {
            nome,
            cidade,
            intencao,
            ocultarIntencao,
            dataAcendimento,
            dias: 0
        };

        salvarVela(vela);
        adicionarVelaNaPagina(vela);
        form.reset();
        form.style.display = 'none';
    });

    function salvarVela(vela) {
        let velas = JSON.parse(localStorage.getItem('velas')) || [];
        velas.push(vela);
        localStorage.setItem('velas', JSON.stringify(velas));
    }

    function carregarVelas() {
        const velas = JSON.parse(localStorage.getItem('velas')) || [];
        velasDiv.innerHTML = ''; // Limpa as velas antes de recarregar
        velas.forEach(vela => {
            atualizarDiasVela(vela);
            adicionarVelaNaPagina(vela);
        });
    }

    function atualizarDiasVela(vela) {
        const hoje = new Date();
        const dataAcendimento = new Date(vela.dataAcendimento);
        const diffTime = Math.abs(hoje - dataAcendimento);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        vela.dias = diffDays - 1;

        if (vela.dias >= 9) {
            removerVela(vela);
        } else {
            salvarVela(vela);
        }
    }

    function removerVela(vela) {
        let velas = JSON.parse(localStorage.getItem('velas')) || [];
        velas = velas.filter(v => v.dataAcendimento !== vela.dataAcendimento);
        localStorage.setItem('velas', JSON.stringify(velas));
        carregarVelas(); // Recarrega as velas após a remoção
    }

    function adicionarVelaNaPagina(vela) {
        const velaItem = document.createElement('div');
        velaItem.className = 'vela-item';
        
        const img = document.createElement('img');
        img.src = 'img/vela_acesa.gif';
        img.alt = 'Vela Acesa';
        
        const pNomeCidade = document.createElement('p');
        pNomeCidade.textContent = `${vela.nome} - ${vela.cidade}`;
        
        const pIntencao = document.createElement('p');
        pIntencao.textContent = vela.intencao;
        if (vela.ocultarIntencao) {
            pIntencao.style.display = 'none';
        }
        const pData = document.createElement('p');
        const dataAcendimento = new Date(vela.dataAcendimento);
        const dataFormatada = `${dataAcendimento.getDate().toString().padStart(2, '0')}/${(dataAcendimento.getMonth() + 1).toString().padStart(2, '0')}/${dataAcendimento.getFullYear()}`;
        pData.textContent = `Data: ${dataFormatada} - Dia: ${vela.dias}`;

        /*const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.className = 'remover-button';
        removerButton.addEventListener('click', () => {
            removerVela(vela);
        });*/

        velaItem.appendChild(img);
        velaItem.appendChild(pNomeCidade);
        velaItem.appendChild(pIntencao);
        velaItem.appendChild(pData);
        /*velaItem.appendChild(removerButton);*/

        velasDiv.appendChild(velaItem);
    }

    carregarVelas();
    setInterval(carregarVelas, 86400000); // Atualiza as velas a cada 24 horas
});