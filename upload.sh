gsutil acl -r ch -u AllUsers:R gs://web-pages/<your-folder-name>
gsutil -m rsync -r ./static gs://<your-bucket-name>/static