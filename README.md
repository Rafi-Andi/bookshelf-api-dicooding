# 📚 Bookshelf API - Dokumentasi

## 📡 Endpoint & Respons Lengkap

### 1. Tambah Buku
- **URL:** `/books`
- **Metode:** `POST`
- **Autentikasi:** Tidak diperlukan

#### Request
```json
{
  "name": "Harry Potter and the Philosopher's Stone",
  "year": 1997,
  "author": "J.K. Rowling",
  "summary": "Harry Potter discovers he is a wizard and goes to Hogwarts School of Witchcraft and Wizardry.",
  "publisher": "Bloomsbury",
  "pageCount": 223,
  "readPage": 100,
  "reading": true
}
```

#### Respons Sukses (201)
```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "[generated-id]"
  }
}
```

#### Respons Gagal - Tanpa Nama Buku (400)
```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

#### Respons Gagal - ReadPage Lebih Besar dari PageCount (400)
```json
{
  "status": "fail",
  "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

### 2. Dapatkan Semua Buku
- **URL:** `/books`
- **Metode:** `GET`
- **Autentikasi:** Tidak diperlukan
- **Query Parameters:**
  - `name`: Filter buku berdasarkan nama (case-insensitive, partial match)
  - `reading`: Filter berdasarkan status membaca ('1': sedang dibaca, '0': tidak sedang dibaca)
  - `finished`: Filter berdasarkan status selesai ('1': selesai, '0': belum selesai)

#### Respons Sukses (200)
```json
{
  "status": "success",
  "data": {
    "books": [
      {
        "id": "book-123",
        "name": "Harry Potter and the Philosopher's Stone",
        "publisher": "Bloomsbury"
      },
      {
        "id": "book-456",
        "name": "The Lord of the Rings",
        "publisher": "Allen & Unwin"
      }
    ]
  }
}
```

### 3. Dapatkan Buku berdasarkan ID
- **URL:** `/books/{bookId}`
- **Metode:** `GET`
- **Autentikasi:** Tidak diperlukan

#### Respons Sukses (200)
```json
{
  "status": "success",
  "data": {
    "book": {
      "id": "book-123",
      "name": "Harry Potter and the Philosopher's Stone",
      "year": 1997,
      "author": "J.K. Rowling",
      "summary": "Harry Potter discovers he is a wizard and goes to Hogwarts School of Witchcraft and Wizardry.",
      "publisher": "Bloomsbury",
      "pageCount": 223,
      "readPage": 100,
      "finished": false,
      "reading": true,
      "insertedAt": "2023-08-01T12:34:56.789Z",
      "updatedAt": "2023-08-01T12:34:56.789Z"
    }
  }
}
```

#### Respons Gagal - Buku Tidak Ditemukan (404)
```json
{
  "status": "fail",
  "message": "Buku tidak ditemukan"
}
```

### 4. Perbarui Buku
- **URL:** `/books/{bookId}`
- **Metode:** `PUT`
- **Autentikasi:** Tidak diperlukan

#### Request
```json
{
  "name": "Harry Potter and the Chamber of Secrets",
  "year": 1998,
  "author": "J.K. Rowling",
  "summary": "Updated summary for the second book",
  "publisher": "Bloomsbury",
  "pageCount": 251,
  "readPage": 200,
  "reading": false
}
```

#### Respons Sukses (200)
```json
{
  "status": "success",
  "message": "Buku berhasil diperbarui"
}
```

#### Respons Gagal - Tanpa Nama Buku (400)
```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. Mohon isi nama buku"
}
```

#### Respons Gagal - ReadPage Lebih Besar dari PageCount (400)
```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
}
```

#### Respons Gagal - ID Tidak Ditemukan (404)
```json
{
  "status": "fail",
  "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```

### 5. Hapus Buku
- **URL:** `/books/{bookId}`
- **Metode:** `DELETE`
- **Autentikasi:** Tidak diperlukan

#### Respons Sukses (200)
```json
{
  "status": "success",
  "message": "Buku berhasil dihapus"
}
```

#### Respons Gagal - ID Tidak Ditemukan (404)
```json
{
  "status": "fail",
  "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```

## 📊 Struktur Data

### Objek Buku

| Field | Tipe | Deskripsi |
|-------|------|-------------|
| id | string | Pengidentifikasi unik (dibuat otomatis) |
| name | string | Judul buku |
| year | number | Tahun terbit |
| author | string | Penulis buku |
| summary | string | Ringkasan singkat dari buku |
| publisher | string | Nama penerbit |
| pageCount | number | Jumlah total halaman |
| readPage | number | Jumlah halaman yang telah dibaca |
| finished | boolean | Status selesai (dihitung otomatis: pageCount === readPage) |
| reading | boolean | Status membaca (true: sedang dibaca, false: tidak sedang dibaca) |
| insertedAt | string | Timestamp ISO kapan buku ditambahkan |
| updatedAt | string | Timestamp ISO terakhir diperbarui |

## ⚠️ Catatan Penting
- API ini tidak memerlukan autentikasi untuk setiap endpoint.
- Semua respons error akan menyertakan pesan yang informatif untuk membantu penyelesaian masalah.
- Field `finished` dihitung secara otomatis berdasarkan nilai dari `pageCount` dan `readPage`.
