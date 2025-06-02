URI podajemy w pliku `.env`

# ENDPOINTS
## 1. Dodaj autora

Metoda: POST

URL: `http://localhost:3001/api/authors`
### Body (JSON):
```
{
  "firstName": "J.R.R.",
  "lastName": "Tolkien"
}
```
## 2. Pobierz wszystkich autorów
Metoda: GET

URL: `http://localhost:3001/api/authors`

## 3. Zaktualizuj autora
Metoda: PUT

URL: `http://localhost:3001/api/authors/{id}`
### Body (JSON):
```
{
  "firstName": "John Ronald Reuel",
  "lastName": "Tolkien"
}
```
## 4. Dodaj książkę
Metoda: POST

URL: `http://localhost:3001/api/books`
### Body (JSON):
```
{
  "title": "The Lord of the Rings",
  "year": 1954,
  "authorId": "ID"
}
```
## 5. Pobierz wszystkie książki
Metoda: GET

URL: `http://localhost:3001/api/books`

## 6. Usuń książkę
Metoda: DELETE

URL: `http://localhost:3001/api/books/{id}`
