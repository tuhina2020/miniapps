sudo gsutil cp -r ./dist gs://web-pages/acronyms/v4
sudo gsutil acl -r ch -u AllUsers:R gs://web-pages/<your-folder-name>