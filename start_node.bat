@echo off
setlocal enabledelayedexpansion

:: Проверка наличия файлов скриптов  
if not exist "D:\SmtMaks\TestLogJs\Error.js" (
    echo Файл log1.js не найден в D:\SmtMaks\TestLogJs
    pause
    exit /b 1
)

if not exist "D:\SmtMaks\TestLogJs\Operate.js" (
    echo Файл Operate.js не найден в D:\SmtMaks\TestLogJs
    pause
    exit /b 1
)

:: Переход в директорию с скриптами
cd /d "D:\SmtMaks\TestLogJs"

:: Запуск скриптов
call node Error.js
call node Operate.js

echo Скрипты успешно запущены.
pause > nul
