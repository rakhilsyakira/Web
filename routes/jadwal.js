const express = require ('express');
const router = express.Router();
const db = require('../config/db');

//daftar jadwal
router.get('/', (req, res) => {
    db.query('SELECT * FROM jadwal', (err, result) => {
        if (err) throw err;
        res.render('jadwal/index', { jadwal: result });
    });
});

//halaman tambah jadwal
router.post('/create', (req, res) => {
    const { kegiatan_id, tanggal, waktu } = req.body;
    db.query('INSERT INTO jadwal (kegiatan_id, tanggal, waktu) VALUES (?, ?, ?)', [kegiatan_id, tanggal, waktu], (err) => {
        if (err) throw err;
        res.redirect('/jadwal');
    });
});

//halaman edit jadwal
router.get('/edit/:id', (req, res) => {
    db.query('SELECT * FROM jadwal WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        db.query('SELECT * FROM kegiatan', (err, kegiatan) => {
            if (err) throw err;
            res.render('jadwal/edit', {jadwal: results[0], kegiatan });
        });
    });
});

//proses update jadwal
router.post('/edit/:id', (req, res) => {
    const { kegiatan_id, tanggal, waktu } = req.body;
    db.query('UPDATE jadwal SET kegiatan_id = ?, tanggal = ?, waktu = ? WHERE id = ?', [kegiatan_id, tanggal, waktu, req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/jadwal');
    });
});

//proses hapus jadwal
router.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM jadwal WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/jadwal');
    });
}); 

module.exports = router;
