const express = require("express");
// const OpenSeadragon = require('openseadragon');
const app = express();

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

app.get("/pyramid", (req, res) => {
  // Fetch the pyramid image data
  const pyramidImageData = getPyramidsFolder(); // Replace with logic to retrieve the pyramid image data

  // Set the response headers
  res.set({
    "Content-Type": "file/zip",
    "Content-Disposition": 'attachment; filename="pyramid_image.zip"',
  });

  // Send the pyramid image data as the response
  res.send(pyramidImageData);
});

function exportDataAsParam(pyramidId) {
  // returns the path of the pyramid using the pyramidId

  // for now just return the abs path which is a string

  // assuming  the below function has folder with paths
  return getPyramidsFolder() + pyramidId;
}

// todo: get local folders using express
function getPyramidsFolder() {
  return "/Users/akshat.saini/Documents/data/pyramids";
}

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
