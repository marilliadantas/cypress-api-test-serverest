# Testes de API com Cypress usando ServeRest

## Introdução
Este projeto tem como objetivo demonstrar o uso do Cypress para realizar testes de API na plataforma ServeRest, uma API REST gratuita que simula uma loja virtual.

Para executar os testes, siga as instruções abaixo.

## Configuração
Clone o repositório para o seu ambiente local:
```bash
git clone https://github.com/seu-usuario/cypress-api-test-serverest.git
```

## Instale as dependências
```bash
npm install
```

## Executando os testes
Para executar os testes, utilize o comando:
```bash
npm test
```

Isso iniciará o Cypress e executará todos os cenários de teste definidos.

## Cenários de Teste
A seguir estão os cenários de teste que foram desenvolvidos para este projeto:

#### Login
| ID | Descrição                                  |
|----|--------------------------------------------|
| 1  | ✔️ Login com sucesso                       |
| 2  | 🔒 Login com credenciais inválidas         |
| 3  | 🔒 Login com e-mail inválido               |
| 4  | 🔒 Login com senha inválida                |
| 5  | 🔒 Login com e-mail em branco              |
| 6  | 🔒 Login com senha em branco               |
| 7  | 🔒 Login com e-mail e senha em branco      |

#### Usuários
| ID | Descrição                                   |
|----|---------------------------------------------|
| 1  | ➕ Cadastrar usuário com sucesso            |
| 2  | ➕ Cadastrar usuário com nome em branco     |
| 3  | ➕ Cadastrar usuário com e-mail inválido    |
| 4  | ➕ Cadastrar usuário com e-mail em branco   |
| 5  | ➕ Cadastrar usuário com senha em branco    |
| 6  | ➕ Cadastrar usuário com administrador em branco |
| 7  | 📋 Listar usuários cadastrados              |
| 8  | 📋 Listar usuário por ID válido             |
| 9  | 📋 Listar usuário por ID inválido           |
| 10 | 🔄 Atualizar usuário                        |
| 11 | 🗑️ Deletar usuário                          |
| 12 | 🗑️ Deletar usuário já excluído              |

#### Produtos
| ID  | Descrição                                   |
|-----|---------------------------------------------|
| 7   | 📋 Listar todos os produtos                 |
| 8   | ➕ Cadastrar produto                        |
| 9   | 🔍 Buscar produto por ID                    |
| 10  | 🔄 Atualizar produto                        |
| 11  | 🗑️ Deletar produto                          |

#### Carrinhos
| ID  | Descrição                                   |
|-----|---------------------------------------------|
| 12  | 📋 Listar carrinhos cadastrados              |
| 13  | ➕ Cadastrar carrinho                        |
| 14  | 🔍 Buscar carrinho por ID                    |
| 15  | 🗑️ Excluir carrinho                          |
| 16  | 🗑️🔄 Excluir carrinho e retornar produtos para estoque |

## Contribuição
Contribuições são bem-vindas! Se você encontrar um problema ou tiver alguma sugestão, por favor, abra uma issue neste repositório. 🚀