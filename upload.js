const AWS = require("aws-sdk");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const S3_SITEMAPS_BUCKET = "sharechat-content-mumbai";
const fs = require("fs");
const path = require("path");
const async = require("async");

const app = process.argv.slice(2)[0];

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

function uploadRSSFolder() {
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
      const uploadParams = {
        Bucket: S3_SITEMAPS_BUCKET,
        Key: `${app}/${fileName}`,
        Body: stream,
        ContentType: "text/html",
        ACL: "public-read"
      };
      console.log(`UPLOADING : ${app}/${fileName}`);
      return s3Upload(uploadParams, next);
    };

    async.each(files, iterator, err => console.log("Uploaded to s3 ", err));
  });
}

uploadRSSFolder();
