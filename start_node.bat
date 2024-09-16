@echo off
setlocal enabledelayedexpansion

:: Проверка наличия файлов скриптов  

if not exist ".\TestLogJs\log.js" (
    echo Файл log.js не найден в .\TestLogJs
    pause
    exit /b 1
)

:: Переход в директорию с скриптами
cd /d ".\TestLogJs"

:: Запуск скриптов
call node log.js

echo Скрипты успешно запущены.
pause > nul
