@echo off
if(%1)==(front) goto front

:back
set NAFILABR_USER=root
set NAFILABR_PASSWORD=aniversarioJorge=25deAbril
cd backend
start python app.py
cd ..
if(%1)==(back) goto fim

:front
cd frontend
start ng serve --open --proxy-config proxy.conf.json
cd ..

:fim