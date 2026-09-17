@echo off
echo ===== Task 13: mainpage =====
echo Command: curl http://localhost:3000/api/gifts
echo.
curl.exe -s http://localhost:3000/api/gifts > mainpage_output.txt
type mainpage_output.txt

echo.
echo ===== Task 14: register =====
echo Command: curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d {"username":"testuser","email":"test@example.com","password":"password123"}
echo.
curl.exe -s -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}" > register_output.txt
type register_output.txt

echo.
echo ===== Task 15: login =====
echo Command: curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d {"email":"test@example.com","password":"password123"}
echo.
curl.exe -s -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}" > login_output.txt
type login_output.txt

echo.
echo ===== Task 17: search_item =====
echo Command: curl "http://localhost:3000/api/search?category=Furniture"
echo.
curl.exe -s "http://localhost:3000/api/search?category=Furniture" > search_output.txt
type search_output.txt
