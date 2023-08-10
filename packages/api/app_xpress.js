require('dotenv').config();
const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const archiver =  require('archiver');
const { readdir } = require('fs').promises;

// creating a test route
app.get("/data", (req, res) => {
  // Handle the request and send a response
  const data = { message: "This is a test" };
  // Send the data as a response
  res.json(data);
});

// 1 content-type for zip file is correct - Done
// 2 Look at how to zip a file with xpress - Done 
// 3 create .env file which will have env variables
      // Update, inject environment variables get pyr path from env file. 
// 4 define a pyramid object and store it in mongodb - Done 
      // Use CRUD operations for mongoose - a
          // Use repositories with expressjs - b 
      // separate  logic into diff files/folders - c 
// 5 how to create an object type - Done 
// 6 how to use external parameters in a get or post request for expressjs 
      // look at WIPP-backend @request params (Line 147-PyramidFetchingController.java)
      // create a rectangle from the x,y,width,heigth passed as params to get the final region

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


// Shows the folders and sub folders in a directory
  
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
  
  // zips the file in a directory
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
let pyrfiles = [];  // contains all .dzi files
  fromDir(pyrpath, /\.dzi$/, function(filename) {
      pyrfiles.push(filename);
  }); 

console.log('-- Found: ', pyrfiles);

// -------------Passing the files in a zip stream------------------
app.get('/zipFiles', (req, res) => {
  // use pyrfiles - pyrfiles contains the loc of all the .dzi files

  res.attachment('dzi_files.zip');
  const zipStream = archiver('zip');

  zipStream.on('error', function (err) {
    res.status(500).send({ error: err.message });
  });

  zipStream.pipe(res);

  pp.forEach((filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
    zipStream.append(fileStream, { name: fileName });
  });

  zipStream.finalize();
});


const port = process.env.PORT_NUM;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});