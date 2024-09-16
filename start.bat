@echo off
setlocal enabledelayedexpansion

:: Проверка наличия файла index.html
if not exist ".\MaterialUI\index.html" (
    echo Файл index.html не найден в D:\SmtMaks\MaterialUI
    pause
    exit /b 1
)

:: Переход в директорию MaterialUI
cd /d ".\MaterialUI"

:: Запуск Vite для разработки
call npm i
call npm run dev

echo React приложение запущено.
pause > nul
