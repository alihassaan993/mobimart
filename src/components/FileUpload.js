
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import fs from 'fs';
//const fs = require('fs');


export async function FileUpload(props){

    let {myFile}=props;

    let file='/Users/alihassaan/Desktop/1.txt';
    // console.log(pr);
    const reader = new FileReader();
    reader.onload = () => {
      // do something with the file contents
      const contents = reader.result;
    };
   
      
    const target = { Bucket:process.env.REACT_APP_BUCKET_NAME, Key:'ali.jpg', Body: reader.readAsText(file) };
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
  
      await parallelUploads3.done();
      console.log("File Uploaded Successfully " );

      return '1.txt';

    } catch (e) {
      //myFile.name="error";
      console.log(e);
      return "error";
    }
}  