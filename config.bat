@echo off
set MEL_ROUTE=http://localhost:8082
set MEL_ROM_BROWSE=D:\jeux_retro\rom

echo VUE_APP_ROUTE_BACKEND=%MEL_ROUTE% > frontend\.env.development
echo VUE_APP_ROM_BROWSE=%MEL_ROM_BROWSE% > frontend\.env