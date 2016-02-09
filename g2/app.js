// Variables
    console.debug();
    var sectionTitle = '<div class="fRow"><div class="tasks">-- Task --</div><div class="notes">-- Notes --</div></div>';
    var fireText = $("#fireText");
    var nextText = $("#nextText");
 // Current Date
   var today = new Date();
   var viewToday = (
       (today.getMonth() + 1) + "/" +
       today.getDate() + "/" +
       today.getFullYear()
   );
   console.log('Today is: ' + viewToday);


// Fire -------------------------
   function fireStart(){
     console.log('pull Gunters data');
     var fireText = $("#fireText");
   };

    domo.get('/data/v1/gZone?filter=status = "Fire"').then(function(gZone){
           console.log("gZone", gZone);

    fireText.append(sectionTitle); // add title section

    gZone.forEach(function(item) {
        console.log(item);
        fireText.append('<div class="fRow"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>');
       });
    });

// next -------------------------
   function nextStart(){
     console.log('pull Gunters data');
     var nextText = $("#nextText");
   };

    domo.get('/data/v1/gZone?filter=status = "Next"').then(function(gZone){
           console.log("gZone", gZone);

    nextText.append(sectionTitle); // add title section

    gZone.forEach(function(item) {
        console.log(item);
        nextText.append('<div class="fRow"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>');
       });
    });

