function aplicarMascara(valor) {
    valor = valor.replace(/\D/g, '');
  
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
      valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    }
  
    return valor;
  }
  
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    let digito1 = (resto >= 10) ? 0 : resto;
  
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    let digito2 = (resto >= 10) ? 0 : resto;
  
    return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
  }
  
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  
    let t = cnpj.length - 2,
        d = cnpj.substring(t),
        d1 = parseInt(d.charAt(0)),
        d2 = parseInt(d.charAt(1)),
        calc = x => {
          let n = cnpj.substring(0, x),
              y = x - 7,
              s = 0;
          for (let i = x; i >= 1; i--) {
            s += n.charAt(x - i) * y--;
            if (y < 2) y = 9;
          }
          let r = 11 - s % 11;
          return r > 9 ? 0 : r;
        };
    return calc(t) === d1 && calc(t + 1) === d2;
  }
  
  const input = document.getElementById("documento");
  const mensagem = document.getElementById("mensagem");
  const botao = document.getElementById("btn-consultar");
  
  input.addEventListener("input", function () {
    this.value = aplicarMascara(this.value);
    this.classList.remove("valido", "erro");
  
    if (this.value.length > 18) {
      this.classList.add("erro");
    }
  });
  
  botao.addEventListener("click", function () {
    const valor = input.value.replace(/\D/g, '');
    let valido = false;
    let tipo = "";
  
    if (valor.length === 11) {
      valido = validarCPF(valor);
      tipo = "CPF";
    } else if (valor.length === 14) {
      valido = validarCNPJ(valor);
      tipo = "CNPJ";
    } else {
      mensagem.textContent = "Número de dígitos inválido.";
      mensagem.className = "erro-texto";
      input.classList.add("erro");
      input.classList.remove("valido");
      return;
    }
  
    if (valido) {
      mensagem.textContent = tipo + " válido!";
      mensagem.className = "valido-texto";
      input.classList.remove("erro");
      input.classList.add("valido");
    } else {
      mensagem.textContent = tipo + " inválido.";
      mensagem.className = "erro-texto";
      input.classList.add("erro");
      input.classList.remove("valido");
    }
  });
  