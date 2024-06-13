const express = require("express");
const pool = require("../db");

const router = express.Router();

// uso em maquina local: 
//   - `localhost:3000/gateway/get-available-books`
router.get("/get-available-books", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM book");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// uso em maquina local: 
//   - `localhost:3000/gateway/remove-book/<numero-do-livro>`
router.delete("/remove-book/:id", async (req, res) => {
  try {
    const id = req.params.id
    const { rowCount } = await pool.query("DELETE FROM book WHERE id = $1", [id])

    // retorna:
    //  0 se nenhum linha tiver sido deletada
    //  1 se for bem sucecida a remocao
    //  esta API suporta apenas uma remocao por vez
    res.json(rowCount)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

router.post("/update-book", async (req, res) => {
  try {
    // fiquei sem tempo para esta API
    // documentacao offline: C:/Program%20Files/PostgreSQL/16/doc/postgresql/html/sql-update.html
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// insere um livro com dados fornecidos em json em key:value no body da requisicao
// exemplo:
// {"name":"nome","subtitle":"subtitulo","authors":"autor","thematic_area":"area tematica","editor":"editora","pages":"300"}
// em caso de ferramentas de linha de comando, inicializar o Header HTTP
// Content-Type: application/json
router.post("/insert-book", async (req, res) => {
  try {
    const { name, subtitle, authors, thematic_area, editor, pages } = req.body;
    const newBook = await pool.query(
      "INSERT INTO book (name, subtitle, authors, thematic_area, editor, pages)" +
      "VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, subtitle, authors, thematic_area, editor, pages]
    );

    // retorna um JSON com a linha inserida
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
