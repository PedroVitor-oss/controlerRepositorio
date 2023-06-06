import readline from 'readline';
import clipboardy from 'clipboardy';
import simpleGit from 'simple-git';
const repositis = ['https://github.com/PedroVitor-oss/main_sdl','https://github.com/PedroVitor-oss/hbs-project']
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  let checkOption;
  let path;
  let nameProject;

  await console.log(`
O que vai ser feito?
1 - Criar novo jogo
2 - Criar novo site
    `);

  checkOption = await askQuestion("Selecione uma opção: ");
  path = await askQuestion("O local onde será salvo: ");
  nameProject = await askQuestion("O nome do projeto: ");

  // Verifica se a resposta é 'Ctrl+V' e, em caso afirmativo, usa o conteúdo da área de transferência
  if (checkOption === 'Ctrl+V') {
    const clipboardContent = clipboardy.readSync();
    checkOption = clipboardContent.trim();
  }

  const git = simpleGit();
  await git.clone(repositis[Number(checkOption) - 1], path + nameProject);
  console.log(`Criado um novo projeto do repositório ${repositis[Number(checkOption) - 1]} na pasta ${path} com o nome ${nameProject}`);

  rl.close();
}

main().catch((error) => {
  console.error('Erro:', error);
});
