const express = require('express');
const router = express.Router();
const db = require('../config/db');

//daftar pembimbing 
router.get('/', (req, res) => {
    db.query('SELECT * FROM pembimbing', (err, result) => {
        if (err) throw err; 
        res.render('pembimbing/index', { pembimbing: result});
    });
});

//halaman tambah pembimbing 
router.post ('/create', (req, res) => {
    const { nama, kontak } = req.body;
    db.query('INSERT INTO pembimbing (nama, kontak) VALUES (?, ?)', [nama, kontak], (err) => {
        if (err) throw err;
        res.redirect('/pembimbing');
    });
});

//halaman edit pembimbing 
router.get('/edit/:id', (req, res) => {
    db.query('SELECT * FROM pembimbing WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('pembimbing/edit', { pembimbing: results[0] });
    });
});

//proses update pembimbing 
router.post('/edit/:id', (req, res) => {
    const { nama, kontak } = req.body;
    db.query('UPDATE pembimbing SET nama = ?, kontak = ? WHERE id = ?', [nama, kontak, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/pembimbing');
    });
});

//proses hapus pembimbing
router.get ('/delete/:id', (req, res) => {
    db.query('DELETE FROM pembimbing WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/pembimbing');
    });
});

module.exports = router;
