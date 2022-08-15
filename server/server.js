require('./config/mongoose.config');
require('dotenv').config();
let fs = require('fs');
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
app.use(express.static('public')); //to access the files in public folder
app.use(fileUpload());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

require('./routes/product.routes')(app);
require('./routes/user.routes')(app);

app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    const myFile = req.files.image;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error occured" });
        }
        return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
});

app.delete('/delete/:name', (req, res) => {
        console.log(req.params.name);
        fs.unlinkSync(`${__dirname}/public/${req.params.name}`);
        return res.status(200).send('Successfully! Image has been Deleted');
    }
);



app.listen(PORT, () => console.log(`Server is up on ${PORT}`));