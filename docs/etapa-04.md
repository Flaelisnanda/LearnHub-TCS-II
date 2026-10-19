# Etapa 4 — Persistência local de dados

## Mecanismo e justificativa

O LearnHub usa `@react-native-async-storage/async-storage` 2.2.0, instalado com `npx expo install` para compatibilidade com o Expo SDK 57 do projeto. AsyncStorage oferece armazenamento persistente assíncrono por chave e valor em Android, iOS e web. Na web, o adaptador utiliza localStorage da origem atual.

Os registros são pequenos, sem relacionamentos complexos ou consultas que justifiquem um banco SQL. Um documento JSON reúne matrícula, conclusões e plano, permitindo salvar a alteração completa em uma operação. Não são armazenadas senhas, dados de pagamento ou informações sensíveis; o armazenamento não é criptografado. Referências: [Expo: armazenamento de dados](https://docs.expo.dev/develop/user-interface/store-data/) e [AsyncStorage](https://react-native-async-storage.github.io/async-storage/).

## Estrutura e arquivos

Chave: `@learnhub/learning-v1`. Exemplo de valor JSON:

```json
{
  "version": 1,
  "enrolled": [1, 2],
  "completed": { "1": [0, 2] },
  "planId": 2
}
```

`enrolled` contém os IDs numéricos dos cursos matriculados. `completed` associa o ID do curso aos índices dos módulos concluídos, iniciando em zero. `planId` é o ID de um plano ou `null`. A porcentagem é calculada a partir dos módulos, sem armazenar valores redundantes. `version` identifica o formato; versões incompatíveis são recusadas, sem apagar o registro.

- `src/learningRepository.js`: leitura com `getItem`, validação e gravação JSON com `setItem`.
- `src/useLearningStorage.js`: recuperação inicial, estado compartilhado e controle das gravações.
- `App.js`: ações nas telas e apresentação dos dados recuperados.
- `tests/persistence.test.mjs`: testes do repositório com armazenamento em arquivo temporário.

O catálogo de cursos, trilhas e planos permanece estático em `src/mockData.js`. Busca e categoria são filtros temporários.

## Operações e telas

| Operação | Ação | Efeito persistido |
| --- | --- | --- |
| Criar e armazenar | Curso → Matricular-se (demo) | Adiciona ID em `enrolled` e grava o documento |
| Recuperar | Inicialização do aplicativo | Lê, valida e restaura matrícula, módulos e plano antes de liberar as telas |
| Atualizar | Curso → Concluir | Acrescenta índice do módulo; Progresso recalcula a porcentagem |
| Atualizar | Planos → Escolher plano (demo) | Salva ou substitui `planId`; indica o plano escolhido |
| Remover | Progresso → Remover matrícula e progresso | Remove o curso de `enrolled` e exclui suas conclusões de `completed`, preservando outros cursos e o plano |
| Apresentar | Curso, Progresso e Planos | Exibe matrícula, módulos concluídos, porcentagens e plano recuperado |

A remoção de registros é implementada pela exclusão dos campos correspondentes no documento e gravação do resultado. Não é necessário apagar a chave inteira: outros registros precisam permanecer disponíveis. Uma nova matrícula no curso removido começa com 0%.

## Consistência e falhas

A tela inicial aguarda a leitura: um estado vazio não sobrescreve dados existentes. Cada alteração só atualiza o estado e apresenta confirmação depois da gravação bem-sucedida. Os botões ficam temporariamente desabilitados durante a gravação; uma trava também impede operações concorrentes. O documento é validado para impedir cursos desconhecidos, duplicatas, planos inexistentes e índices inválidos ou conclusões sem matrícula.

Falha de leitura ou JSON inválido mantém o aplicativo na tela de recuperação com a ação Tentar carregar novamente; os dados originais não são apagados. Uma falha ao salvar mantém o estado anterior e apresenta uma mensagem para repetir a ação.

## Execução e teste

Na pasta do projeto, com Node.js e npm compatíveis com Expo SDK 57:

```bash
npm install
npm test
npm run web
```

Para dispositivo, execute `npm start -- --go --lan` e abra em um cliente Expo compatível com SDK 57 na mesma rede. Para verificar a compilação web:

```bash
npx expo export --platform web --output-dir dist
```

## Procedimento de verificação após encerrar e reabrir

1. Abra um curso e escolha Matricular-se (demo). Matricule-se em um segundo curso.
2. No primeiro curso, conclua um módulo. Confira 25% em Progresso. Aguarde a indicação Dados salvos neste dispositivo.
3. Em Planos, selecione Anual e aguarde a confirmação.
4. Na web, feche a aba e reabra o mesmo endereço, incluindo a porta. No celular, encerre o aplicativo/cliente Expo pelo seletor de aplicativos e abra novamente o mesmo projeto. Apenas navegar entre telas não verifica a persistência após encerrar.
5. Confira as duas matrículas, o módulo concluído, o progresso de 25% e o plano Anual selecionado.
6. Conclua outro módulo e altere o plano. Encerre e reabra novamente: confira 50% e o novo plano.
7. Em Progresso, remova a matrícula e o progresso do primeiro curso. Encerre e reabra: o curso removido deve continuar ausente e o segundo deve permanecer. Confira também que o plano foi preservado.
8. Matricule-se novamente no primeiro curso: seu progresso deve ser 0%, sem recuperar módulos removidos.

Usar outro dispositivo, navegador, perfil ou porta não compartilha os dados. Limpar dados do aplicativo/navegador ou desinstalar pode apagá-los. Não há sincronização ou backup em servidor.

## Evidências e limites da validação

Validação realizada: os três testes automatizados passaram e `npx expo export --platform web --output-dir dist` concluiu com sucesso. Os testes criam um registro, reabrem instâncias do repositório usando o mesmo arquivo, recuperam os dados, atualizam módulos e plano, removem uma matrícula e verificam a preservação dos demais dados. Também verificam a rejeição de registros inválidos e a propagação de falhas de armazenamento.

O adaptador em arquivo testa o contrato do repositório; não substitui executar o roteiro acima no AsyncStorage de um navegador ou dispositivo. A compilação web verifica os imports e o empacotamento. O teste manual de encerramento/reabertura no celular deve ser realizado antes da entrega; não é declarado como executado automaticamente.

## Entrega

Repositório: https://github.com/Flaelisnanda/LearnHub-TCS-II

Depois de validar e registrar os arquivos em um commit, crie a tag apenas se ela ainda não existir. Publique o commit e a tag:

```bash
git tag etapa-04
git push origin HEAD
git push origin etapa-04
```

A tag deve identificar o commit da implementação completa desta etapa. A documentação da Etapa 3 descreve o comportamento histórico anterior; o roteiro desta etapa substitui a expectativa de reinicialização dos dados daquela entrega.
