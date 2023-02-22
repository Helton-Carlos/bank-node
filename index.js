import inquirer from "inquirer";
import chalk from "chalk";

import fs from "fs";

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((retorno) => {
      const action = retorno["action"];
      action === "Criar Conta" ? message() : '';
    })
    .catch((err) => {
      console.log(`Erro ${err}`);
    });
}

function message() {
  console.log(chalk.bgGreen.black("Parabéns por escolher nosso banco"));
  console.log(chalk.green("Defina as opções de conta a seguir"));

  buildAccount() 
}

function buildAccount() {
  inquirer
  .prompt([
    {
      name: "nameAction",
      message: "Digite o nome da sua conta:",
    },
  ])
  .then((retorno) => {
    const answer = retorno["nameAction"];
    if(!fs.existsSync('accounts')) fs.mkdirSync('accounts');
    if(fs.existsSync(`accounts/${answer}.json`)){
      console.log(chalk.bgRed.black("Essa conta já existe")) 
      buildAccount() ;
    };

    fs.writeFileSync(`accounts/${answer}.json`,'{ "balance" : 0}', function error(err){console.log(`Erro ${err}`);});
  })
  .catch((err) => {
    console.log(`Erro catch ${err}`);
  });
}
