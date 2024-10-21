@echo off
:: Cria o diretório de destino se não existir
if not exist "C:\water-level-control" (
    mkdir "C:\water-level-control"
)

:: Copia os arquivos para o diretório de destino
xcopy "C:\Users\todososusuários\Área de Trabalho\eecc\water-level-control\*" "C:\water-level-control\" /E /I /Y

:: Navega para o diretório de destino
cd /d "C:\water-level-control"

:: Verifica se o Node.js está instalado
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js não encontrado. Instalando Node.js...

    :: Instala o fnm (Fast Node Manager)
    winget install Schniz.fnm

    :: Configura o ambiente do fnm
    fnm env --use-on-cd | Out-String | Invoke-Expression

    :: Baixa e instala o Node.js
    fnm use --install-if-missing 20

    :: Verifica a versão do Node.js instalada
    node -v
    if %errorlevel% neq 0 (
        echo Falha na instalação do Node.js.
        pause
        exit /b
    )
)

:: Executa o servidor Node.js
node server.js

:: Verifica se houve erro na execução do servidor
if %errorlevel% neq 0 (
    echo Ocorreu um erro ao iniciar o servidor.
    pause
)
