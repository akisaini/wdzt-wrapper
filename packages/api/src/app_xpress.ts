import express from "express";
// import fs from 'fs';
// import path from 'path';

// const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

// creating a test route
app.get("/data", (req: Request, res: Response) => {
  // Handle the request and send a response
  const data = { message: "This is a test" };
  // Send the data as a response
  res.json(data);
});

// // app.use(express.static('/Users/akshat.saini/Documents/repo/wdzt-wrapper/data/bigfile-dzi/'));

// // route to test wdzt.html
// // app.get('/pyramid', (req, res) => {
// //     const imagePath = '/Users/akshat.saini/Documents/repo/wdzt-wrapper/src/wdzt.html';
// //     res.sendFile(imagePath);

// // check number of pixels per image: width * height * zoom * zoom > appConfig.getFetchingPixelsMax()
// // set header attachement: zip, to be investigated

// // set rectangle with x, y, w, h

// // set cookie
// // key-val pair

// // fill stream frm pyramid

// //  pyramidId is the name of the folder

// // zip the dzi files

// app.get("/pyramid", (req: Request, res: Response) => {
//   // Fetch the pyramid image data
//   const pyramidImageData = getPyramidsFolder(); // Replace with logic to retrieve the pyramid image data

//   // Set the response headers
//   res.set({
//     "Content-Type": "file/zip",
//     "Content-Disposition": 'attachment; filename="pyramid_image.zip"',
//   });

//   // Send the pyramid image data as the response
//   res.send(pyramidImageData);
// });

// function exportDataAsParam(pyramidId: string): string {
//   // returns the path of the pyramid using the pyramidId

//   // for now just return the abs path which is a string

//   // assuming the below function has folder with paths
//   return getPyramidsFolder() + pyramidId;
// }

// // todo: get local folders using express
// // how to access storage using express 
// function getPyramidsFolder(): string {
//   return "/Users/akshat.saini/Documents/data/pyramids";
// }

// const getFileList = async (dirName: string): Promise<string[]> => {
//   let files: string[] = [];
//   const items = await fs.promises.readdir(dirName, { withFileTypes: true });

//   for (const item of items) {
//     if (item.isDirectory()) {
//       files = [
//         ...files,
//         ...(await getFileList(path.join(dirName, item.name))),
//       ];
//     } else {
//       files.push(path.join(dirName, item.name));
//     }
//   }

//   return files;
// };

// app.get("/folder-list", (req: Request, res: Response) => {
//   getFileList('src')
//     .then((files) => {
//       res.send(files);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// });

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
