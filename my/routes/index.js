let express = require("express");
let router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./tmp" });
const fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET paramètre 101 et Query Level */
router.get("/forms-:numero(\\d+)", function(req, res, next) {
  console.log(req.params.numero);
  console.log(req.query.level);
});

/* POST affiche le contenu de la requête en console */
router.post("/forms-101", (req, res) => {
  console.log(req.body.username); // retourne Bob
});

/* GET COUCOU PUG*/
router.get("/coucou-pug", function(req, res, next) {
  res.render("coucou", { sayHello: "Hello Buddy!" });
});

/* Middleware */
// router.use(
//   "/superMiddleware",
//   (req, res, next) => {
//     console.log("Hello Middleware");
//     next();
//   },
//   (req, res, next) => {
//     res.send("Hello WORLD");
//     next();
//   }
// );

/* SESSIONS */

router.get("/session-in", (req, res, next) => {
  req.session.song = "Turlulalalu";
  res.send("bomba");
});
router.get("/session-out", (req, res, next) => {
  res.send(req.session.song);
});

/* UPLOADS */

router.get("/monupload", (req, res) => {
  res.render("upload");
});

router.post(
  "/uploaddufichier",
  upload.array("monFichier"),
  (req, res, next) => {
    // console.log(req.files);

    req.files.forEach(element => {
      fs.rename(
      element.path,
        "public/images/" + element.originalname,
        err => {
          if (err) {
            console.log(err);
            res.send("problème durant le déplacement");
          } else {
            res.send("Fichier uploadé avec succès");
          }
        });
    });
  }
);

module.exports = router;
