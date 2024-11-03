const express = require('express');
const router = express.Router();
const db = require('../config/db');

//daftar kegiatan
router.get('/', (req, res) => {
    db.query('SELECT * FROM kegiatan', (err, result) => {
        if (err) throw err;
        res.render('kegiatan/index', {kegiatan: result});
    });
});

//halaman tambah kegiatan
router.post('/create', (req,res) => {
    const { nama, deskripsi, lokasi, pembimbing_id } = req.body;
    db.query('INSERT INTO kegiatan (nama, deskripsi, lokasi, pembimbing_id) VALUES (?, ?, ?, ?)', [nama, deskripsi, lokasi, pembimbing_id], (err) => {
        if (err) throw err;
        res.redirect('/kegiatan');
    });
});

//halaman edit kegiatan
router.get('/edit/:id', (req, res) => {
    db.query('SELECT * FROM kegiatan WHERE id = ?', [req.params], (err, result) => {
        if (err) throw err;
        db.query ('SELECT * FROM pembimbing', (err, pembimbing) => {
            if (err) throw err;
            res.render('kegiatan/edit', {kegiatan:results[0], pembimbing});
        });
    });
});

//proses update kegiatan 
router.post('/edit/:id', (req, res) => {
    const {nama, deskripsi, lokasi, pembimbing_id} = req.body;
    db.query('UPDATE kegiatan SET nama = ?, deksripsi = ?, lokasi = ?, pembimbing_id = ?, WHERE id = ?', [nama, deskripsi, lokasi, pembimbing_id, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/kegiatan');
    });
});

//proses hapus kegiatan
router.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM kegiatan WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/kegiatan');
    });
});

module.exports = router;
