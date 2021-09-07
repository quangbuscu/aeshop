class NewsController {
    getNews(req, res) {
        res.render('news')
    }

    addNews(req, res) {
        res.render('addnews')
    }

    addNewsFinally(req, res) {
        try {
            upload(req, res, function(err) {
                if (err) {
                    res.render('upload');
                }
            })
        } catch (err) {
            console.log(err)
        } finally {
            var fileName = req.files.map(function(item, index) {
                return `uploads/` + item.filename;
            })
            var data = req.body;
            data.srcImg = fileName;
            res.send(data);
        }
    }
}

module.exports = NewsController;