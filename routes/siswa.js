const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { resolveInclude } = require('ejs');
const { route } = require('./users');

//daftar siswa
router.get('/', (req, res) => {
    db.query('SELECT * FROM siswa', (err, result) => {
       if (err) throw err; 
       res.render('siswa/index', { siswa: result });
    });
});

//haaman tambah siswa
router.post('/create', (req, res) => {
    const { nama, kelas } = req.body;
    db.query('INSERT INTO siswa (nama, kelas) VALUES (?, ?)', [nama, kelas], (err) => {
        if (err) throw err;
        res.redirect('/siswa');
    });
});

//halaman edit siswa
router.get('/edit/:id', (req, res) => {
    db.query('SELECT * FROM siswa WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('siswa/edit', {siswa: results[0] });
    });
});

//proses update siswa
router.get('/edit/:id', (req, res) => {
    const { nama, kelas } = req.body;
    db.query('UPDATE siswa SET nama = ?, kelas = ? WHERE id = ?', [nama, kelas, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/siswa');
    });
});

//proses hapus siswa
router.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM siswa WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err; 
        res.redirect('/siswa');
    });
});

module.exports = router;
