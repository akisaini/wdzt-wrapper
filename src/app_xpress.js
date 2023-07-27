require('dotenv').config();
const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const archiver =  require('archiver');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const { readdir } = require('fs').promises;

// creating a test route
app.get("/data", (req, res) => {
  // Handle the request and send a response
  const data = { message: "This is a test" };
  // Send the data as a response
  res.json(data);
});

// app.use(express.static('/Users/akshat.saini/Documents/repo/wdzt-wrapper/data/bigfile-dzi/'));

// route to test wdzt.html
// app.get('/pyramid', (req, res) => {
//     const imagePath = '/Users/akshat.saini/Documents/repo/wdzt-wrapper/src/wdzt.html';
//     res.sendFile(imagePath);

// check number of pixels per image: width * height * zoom * zoom > appConfig.getFetchingPixelsMax()
// set header attachement: zip, to be investigated

// set rectangle with x, y, w, h

// set cookie
// key-val pair

// fill stream frm pyramid

//  pyramidId is the name of the folder

// zip the dzi files


// 1 content-type for zip file is correct - Done
// 2 Look at how to zip a file with xpress - Done 
// 3 create .env file which will have env variables - Done 
// 4 define a pyramid object and store it in mongodb - Done 
// 5 how to create an object type - Done 


function exportDataAsParam(pyramidId) {
  // returns the path of the pyramid using the pyramidId

  // for now just return the abs path which is a string

  // assuming  the below function has folder with paths
  return getPyramidsFolder() + pyramidId;
}

// todo: get local folders using express
// how to access storage using express 
function getPyramidsFolder() {
  return "/Users/akshat.saini/Documents/data/pyramids";
}


// Shows the dirs
  
  const getFileList = async (dirName) => {
      let files = [];
      const items = await readdir(dirName, { withFileTypes: true });
  
      for (const item of items) {
          if (item.isDirectory()) {
              files = [
                  ...files,
                  ...(await getFileList(`${dirName}/${item.name}`)),
              ];
          } else {
              files.push(`${dirName}/${item.name}`);
          }
      }
  
      return files;
  };
  
  // getFileList('src').then((files) => {
  //     console.log(files);
  // });
  

  // zips the directory

  app.get("/pyramid", (req, res) => {
    // Fetch the pyramid image data
    const pyramidImageData = getPyramidsFolder(); // Replace with logic to retrieve the pyramid image data
    // Set the response headers
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="pyramid_image.zip"',
    });
  
    const zip  = archiver('zip')
  
    zip.pipe(res);
  
    // zip the stream
    // currently zips file
    // const filePath = '/Users/akshat.saini/Documents/data/pyramids/file.txt';
    const filePath = getPyramidsFolder()+'/file.txt';
    zip.file(filePath, { name: 'file.txt' });
  
    // Finalize the ZIP file and send the response
    zip.finalize(); 
    console.log(filePath)
  });

//------------returns extension in a dir-------------------------

  function fromDir(startPath, filter, callback) {
  
      //console.log('Starting from dir '+startPath+'/');
  
      if (!fs.existsSync(startPath)) {
          console.log("no dir ", startPath);
          return;
      }
  
      var files = fs.readdirSync(startPath);
      for (var i = 0; i < files.length; i++) {
          var filename = path.join(startPath, files[i]);
          var stat = fs.lstatSync(filename);
          if (stat.isDirectory()) {
              fromDir(filename, filter, callback); //recurse
          } else if (filter.test(filename)) callback(filename);
      };
  };
  
let pyrpath = getPyramidsFolder(); // gets folder loc from function 
let pp = [];  // contains all .dzi files
  fromDir(pyrpath, /\.dzi$/, function(filename) {
      pp.push(filename);
  }); 

  console.log('-- Found: ', pp);


const port = process.env.PORT_NUM;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});