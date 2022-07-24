
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

export function FileUpload(myFile){

    
      
    const target = { Bucket:process.env.REACT_APP_BUCKET_NAME, Key:myFile.name, Body:myFile };
    const creds = {accessKeyId:process.env.REACT_APP_ACCESS_ID,secretAccessKey: process.env.REACT_APP_ACCESS_KEY};
    try {

      const parallelUploads3 = new Upload({
        client: new S3Client({region:process.env.REACT_APP_REGION,credentials:creds}),
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });
  
      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
  
      parallelUploads3.done();
      console.log("File Uploaded Successfully " );

      return myFile.name;

    } catch (e) {
      console.log(e);
    }
}  