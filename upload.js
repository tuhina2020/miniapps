const AWS = require("aws-sdk");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const S3_SITEMAPS_BUCKET = "sharechat-content-mumbai";
const fs = require("fs");
const path = require("path");
const async = require("async");

const app = process.argv.slice(2)[0];

const FOLDER_LOOKUP = {
  miniapp: "miniapp",
  astro: "miniapp/astrology",
  singleapp: "miniapp/singleapp",
  champion: "leaderboard/youtuber",
	"diwali": "miniapp/diwali",
	indiannewyear: "web-post-html-files/indiannewyear",
	easter: "web-post-html-files/easter"
};

const getContentType = filename => {
  const TYPE = {
    "application/gzip": new RegExp(/\.gz/),
		"text/html": new RegExp(/\.html/),
		"text/css": new RegExp(/\.css/),
    "application/javascript": new RegExp(/\.js/),
    "image/svg+xml": new RegExp(/\.svg/)
  };
  const keys = Object.keys(TYPE);

  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const regex = TYPE[key];
    if (regex.test(filename)) return key;
  }
  return "text/html";
};

function s3Upload(uploadParams, callback) {
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      return callback(err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
      return callback();
    }
  });
}

function uploadDistFolder() {
  const distFolderPath = path.join(__dirname, "./dist");
  fs.readdir(distFolderPath, (err, files) => {
    if (!files || files.length === 0) {
      console.log(
        `provided folder '${distFolderPath}' is empty or does not exist.`
      );
      console.log("Make sure your project was compiled!");
      return;
    }

    // for each file in the directory
    const iterator = (fileName, next) => {
      // get the full path of the file
      const filePath = path.join(distFolderPath, fileName);

      // ignore if directory
      if (fs.lstatSync(filePath).isDirectory()) {
        return next();
      }

      // read file contents
      const stream = fs.createReadStream(filePath);
      const ContentType = getContentType(fileName);
      const uploadParams = {
        Bucket: S3_SITEMAPS_BUCKET,
        Key: `${FOLDER_LOOKUP[app]}/${fileName}`,
        Body: stream,
        ContentType,
        ACL: "public-read"
      };
      console.log(
        `UPLOADING : ${FOLDER_LOOKUP[app]}/${fileName}   ${ContentType}`
      );
      // return next();
      return s3Upload(uploadParams, next);
    };

    async.each(files, iterator, err => console.log("Uploaded to s3 ", err));
  });
}

uploadDistFolder();
