module.exports = function(multer,fs){
    return multer.diskStorage({
            filename: function (req, file, cb) {
                cb(null, Date.now() + '_' + file.originalname);
            },
            destination: function (req, file, cb) {
                fs.access('upload', async err => {
                    if (err) {
                        await fs.mkdirSync('upload', err => {
                            console.log(err);
                        })
                    }
                });
                console.log('eeee',req.body);
                /*fs.access(req.body.user, async err => {
                    if (err) {
                        await fs.mkdirSync('/upload/'+req.body.user, err => {
                            console.log(err);
                        })
                    }
                });*/
                if (req.originalUrl === '/uploadAvatar') {
                    fs.access('upload/avatar', async err => {
                        if (err) {
                            await fs.mkdirSync('upload/avatar', err => {
                                console.log(err);
                            })
                        }
                        cb(null, 'upload/avatar/');
                    });
                } else if (req.originalUrl === '/uploadPost') {
                    fs.access('upload/post', async err => {
                        if (err) {
                            await fs.mkdirSync('upload/post', err => {
                                console.log(err);
                            })
                        }
                        cb(null, 'upload/post/');
                    });
                }
            }
        }
    );
};