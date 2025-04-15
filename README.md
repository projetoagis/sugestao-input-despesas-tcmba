O sistema de consulta de despesas do TCM-BA apresenta um ponto frágil na usabilidade do campo de entrada de CPF ou CNPJ.

**O que acontece?**

Embora exista uma mensagem indicando que os documentos devem ser digitados sem pontuações, o sistema:

**1** - Não realiza nenhum tratamento automático para remover pontos, traços ou barras.

**2** - Depende totalmente da atenção do usuário ao digitar corretamente os números, o que é propenso a erros humanos.

![image](https://github.com/user-attachments/assets/60a8b7d3-ff93-4912-aaf6-2ba66843c2bf)


**Por que isso é problemático?**

O cidadão pode colar o CPF/CNPJ de uma fonte externa (PDF, planilha, email etc.) já com pontuação ou errado(dependendo da digitalização do PDF por ex- PP-ETCM) e obter
um resultado nulo, mesmo existindo processos de pagamento para aquele CPF/CNPJ se fosse inserido corretamente.

Pequenos deslizes ao apagar os separadores — como digitar um dígito errado ou apagar um a mais — resultam em falhas silenciosas.

O sistema não emite nenhuma sugestão ou correção automática, levando o usuário a acreditar que a pessoa ou empresa não existe nos registros, o que compromete a transparência da informação pública.

**O que poderia ser feito?**

**Bastaria implementar um simples tratamento no código:**

**1. Limitação da quantidade de caracteres**
O campo de entrada (input) limita o usuário a 18 caracteres com pontuação.

Isso evita que o usuário digite um número fora do padrão esperado (CPF: 11 dígitos, CNPJ: 14 dígitos).

**2. Aplicação automática de máscara**
Conforme o usuário digita, o sistema aplica dinamicamente a máscara:

000.000.000-00 para CPF

00.000.000/0000-00 para CNPJ

Isso facilita a visualização do que está sendo digitado e melhora a usabilidade.

**3. Validação de CPF**
**Após a digitação, o sistema:**

Remove todos os caracteres não numéricos.

Aplica o algoritmo oficial de validação de CPF com cálculo dos dois dígitos verificadores.

Exibe mensagem clara se o CPF é válido ou inválido.

**4. Validação de CNPJ**
Para entradas com 14 dígitos numéricos:

O código remove pontuações e aplica o algoritmo de validação de CNPJ.

Calcula os dois dígitos verificadores com multiplicadores decrescentes e pesos reiniciados de 9 a 2.

Também exibe mensagem indicando se o CNPJ é válido ou inválido.

**5. Feedback visual ao usuário**

Se o número for válido, o campo é destacado em verde.

Se for inválido, o campo fica em vermelho.

Abaixo do campo, uma mensagem textual reforça o status da validação.
