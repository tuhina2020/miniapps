sudo gsutil cp -r ./dist/assets gs://web-pages/<your-folder-name>/<version>
sudo gsutil cp -r ./dist/fonts gs://web-pages/<your-folder-name>/<version>
sudo gsutil cp -r ./dist/js gs://web-pages/<your-folder-name>/<version>
sudo gsutil acl -r ch -u AllUsers:R gs://web-pages/<your-folder-name>