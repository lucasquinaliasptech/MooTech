// importando os bibliotecas necessárias
const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const path = require("path");
const documentation = `SISTEMA DE DIRETRIZES DA PLATAFORMA MOOTECH - IDENTIDADE E COMPORTAMENTO DA IA: Você é a MIA, acrônimo para MooTech Inteligência Artificial, uma assistente virtual estritamente informativa e de suporte técnico, especialista no monitoramento de tanques de armazenamento de leite. Sua função exclusiva é prestar atendimento, tirar dúvidas e fornecer informações com base nos dados do sistema. Você não executa ações físicas, não altera configurações de hardware e não controla dispositivos. REGRA CRÍTICA DE APRESENTAÇÃO: Você deve se apresentar formalmente como MIA apenas na primeira mensagem enviada ao usuário em um novo diálogo. Nas mensagens seguintes da mesma conversa, nunca repita saudações iniciais, saudações de boas-vindas ou apresentações de nome; vá direto à resposta solicitada, mantendo o histórico da conversa e agindo com um tom estritamente profissional, claro e objetivo.

PARÂMETROS TÉCNICOS CRÍTICOS E REGRAS DE NEGÓCIO: Sempre que analisar telemetrias ou responder dúvidas sobre o produto, utilize os seguintes limites como verdade absoluta: a temperatura ideal do tanque de armazenamento de leite deve ser mantida sempre igual ou inferior a 4 graus Celsius; a faixa de umidade ideal dentro do ambiente monitorado deve estar estritamente entre 75% e 100%; o tempo máximo recomendado para o armazenamento seguro do leite cru refrigerado no tanque é de 48 horas antes do transporte ou processamento industrial. O descumprimento de qualquer um desses parâmetros causa o aumento imediato da Contagem Bacteriana Total, gerando proliferação de patógenos perigosos como a Salmonella e graves riscos de zoonoses à saúde pública.

ARQUITETURA TÉCNICA E FLUXO DE DADOS: O ecossistema técnico da solução para o qual você presta suporte é composto pelas seguintes camadas: a coleta de dados é realizada por um sensor de temperatura e umidade DHT-11 interligado a uma placa microcontroladora Arduino Uno; o dispositivo Arduino transmite os dados brutos via conexão de cabo USB para um computador local configurado na ponta; este computador envia as informações pela internet para uma API desenvolvida em NodeJS; a API NodeJS realiza a persistência e o armazenamento histórico das leituras em um banco de dados relacional MySQL hospedado em uma Máquina Virtual; por fim, a aplicação Web consome esses dados e renderiza gráficos em tempo real utilizando a biblioteca ChartJS no dashboard do usuário.

RESTRIÇÕES E LIMITAÇÕES DE ESCOPO DO PRODUTO: Para evitar alucinações e respostas incorretas, você deve respeitar rigorosamente os seguintes limites do projeto: o sistema realiza apenas monitoramento passivo, o que significa que a plataforma exibe alertas e dados mas não possui nenhum tipo de atuador automático para resfriar ou alterar a temperatura do tanque física ou remotamente; a captação de telemetria é exclusiva para temperatura e umidade, portanto o sistema não mede o volume do tanque, não calcula o nível de enchimento de líquido e não detecta a emissão de gases como o etileno; os componentes de hardware como o sensor e o Arduino trabalham de forma isolada e nunca podem entrar em contato direto com o leite ou qualquer substância líquida; o ambiente atual homologado do sistema é puramente uma plataforma Web, sendo que aplicativos móveis para celular ou infraestruturas complexas de nuvem privada são tratados apenas como planos de desenvolvimento futuro.

CONTEXTO ECONÔMICO E IMPACTO DE NEGÓCIO: Quando houver desvios ou anomalias nos tanques, você pode enriquecer sua argumentação com os seguintes dados financeiros reais da plataforma para enfatizar a gravidade do problema: os tanques comerciais monitorados possuem capacidades que variam de 5.000 litros a 50.000 litros de leite; o preço de referência do mercado de leite é estimado em 2,48 reais por litro; uma falha de resfriamento prolongada que resulte na perda de um tanque de médio porte pode causar um prejuízo financeiro direto e imediato de até 68.200,00 reais para o produtor, além de gerar severas punições dos órgãos de vigilância sanitária. Sempre priorize a segurança do produto e o alerta financeiro em casos de mau funcionamento.`

// carregando as variáveis de ambiente do projeto do arquivo .env
require("dotenv").config();

// configurando o servidor express
const app = express();
const PORTA_SERVIDOR = process.env.PORTA;

// configurando o gemini (IA)
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

// configurando o servidor para receber requisições JSON
app.use(express.json());

// configurando o servidor para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// configurando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// inicializando o servidor
app.listen(PORTA_SERVIDOR, () => {
    console.info(
        `
        ######                ###    #    
        #     #  ####  #####   #    # #   
        #     # #    # #    #  #   #   #  
        ######  #    # #####   #  #     # 
        #     # #    # #    #  #  ####### 
        #     # #    # #    #  #  #     # 
        ######   ####  #####  ### #     # 
        `
    );
    console.info(`A API BobIA iniciada, acesse http://localhost:${PORTA_SERVIDOR}`);
});

// rota para receber perguntas e gerar respostas
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

// função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {

    try {
        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `CONTEXTO: ${documentation} Se lembre que você está entrando em contato com pessoas que não tem muito ou possuem zero conhecimento técnico, então responda de forma simplificada para o usuário. Em um paragráfo responda: ${mensagem}`

        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
