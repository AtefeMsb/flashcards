

// async
function test(callback) {
  var a = 2;

  // async
    setTimeout(function () {
        
        callback(new Error("some string"), null);
        // execute after one second

    }, 1000);

    // execute immediately
}


// try {
  

//   });
// } catch (e) {
//   console.log(e);

// }


test(function (error, response) {

    // waits until
    console.log(error);
    // application code continues here
    console.log("Test");
});



setTimeout(function () {
    try {
      throw new Error("BROKEN");
    }
    catch (err) {
      next(err);
    }
  }, 100);


  setTimeout(function () {

      next(new Error("BROKEN"));
  }, 100);