// webform dataset: b34b7088-15ff-43e8-a2e4-922cbedd5954
// webform fields:
      // "fields": [
      //   {
      //     "alias": "task",
      //     "columnName": "Tasks"
      //   },
      //   {
      //     "alias": "notes",
      //     "columnName": "Notes"
      //   },
      //   {
      //     "alias": "status",
      //     "columnName": "Status"
      //   }
      // ]

// trello dataset: 8c2fa723-c61e-4d95-b09c-371234764627
// trello fields:
 // "fields": [
 //        {
 //          "alias": "task",
 //          "columnName": "name"
 //        },
 //        {
 //          "alias": "notes",
 //          "columnName": "desc"
 //        },
 //        {
 //          "alias": "listName",
 //          "columnName": "listName"
 //        },
 //        {
 //          "alias": "status",
 //          "columnName": "closed"
 //        },
 //        {
 //          "alias": "closed",
 //          "columnName": "closed"
 //        },
 //        {
 //          "alias": "idShort",
 //          "columnName": "idShort"
 //        }
 //      ]

// release notes:
	// 1.0.5
	// updated version number
	// added NO fire items option


// Variables
    console.debug();
    var version = 1.05;
    var sectionTitle = '<div id="sectionTitle" class="fRow"><div class="tasks">Tasks</div><div class="notes">Notes</div></div>';
    var noTitle = '<div class="noTitle"><div>&nbsp;</div><div>&nbsp;</div></div>';
    var noData = '<div class="noData">There are NO reported ' + '<span class="redText">fires</span>' + ' at this time.</div>';
    var fireText = $("#fireText");
    var nextText = $("#nextText");
    var fireData = $('#fireData');
    var nextData = $('#nextData');
	var rCount = 0;
    var fCount = 0;
    var nCount = 0;
    var dSum = 0;

 // Current Date
   var today = new Date();
   var viewToday = (
       (today.getMonth() + 1) + "/" +
       today.getDate() + "/" +
       today.getFullYear()
   );
   console.log('Today is: ' + viewToday);


function dCount() {
	console.log('Fire = ' + fCount);
	console.log('Next = ' + nCount);

	dSum = fCount + nCount;
	console.log('--------------------------------- Total rows: ' + dSum);
};


// Tray-lo -------------------------
	function allList(){
		rCount = 1;
		console.log('pull Fire data');
		var fireText = $("#fireText");

		domo.get('/data/v1/gZone?task ~ FIRE').then(function(gZone){
			fireText.append(sectionTitle); // add title section
			gZone.forEach(function(item) {
				if(rCount % 2 === 0) {
					fireData.append('<div class="fRowE"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>'); 
					rCount = rCount+1;
					console.log('evenRow:' + rCount + ':' + item.status + ':' + item.task + ' : ' + item.notes);
				}
				else {
					fireData.append('<div class="fRow"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>');	
					rCount = rCount+1;
					console.log('oddRow:' + rCount);
				}
			});
		});
//		nextStart();
	};


// Fire -------------------------
	function fireStart(){
		fCount = 1;
		console.log('pull Fire data');
		var fireText = $("#fireText");

		domo.get('/data/v1/gZone?filter=status = "Fire"').then(function(gZone){
			fireText.append(sectionTitle); // add title section
			gZone.forEach(function(item) {
				if(fCount % 2 === 0) {
					console.log('evenRow:' + fCount);
					fireData.append('<div class="fRowE"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>'); 
					fCount = fCount+1;
					console.log('rCount:' + fCount);
				}
				else {
					console.log('oddRow:' + fCount);
					fireData.append('<div class="fRow"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>');	
					fCount = fCount+1;
					console.log('oddRow:' + fCount);
				}
			});
			fCount = fCount -1;
			console.log('F:' + fCount);
			if (fCount == 0) {
				console.log('no data');
				document.getElementById("fireText").className = noTitle;
				document.getElementById("fireText").innerHTML = noTitle;
				document.getElementById("fireData").innerHTML = noData;
			}
		});
//		nextStart();
	};

// next -------------------------
	function nextStart(){
		nCount = 1;
		console.log('pull Next data');
		var nextText = $("#nextText");

		domo.get('/data/v1/gZone?filter=status = "Next"').then(function(gZone){
			nextText.append(sectionTitle); // add title section
			gZone.forEach(function(item) {
				if(nCount % 2 === 0) {
					console.log(item);
					nextData.append('<div class="fRowE"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>');
					nCount = nCount+1;
					console.log('evenRow:' + nCount);
				}
				else {
					nextData.append('<div class="fRow"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>');
					nCount = nCount+1;
					console.log('oddRow:' + nCount);
				}
			});
			nCount = nCount -1;
			console.log('N:' + nCount);
			dCount();
		});
	};


//FULL SCREEN CODE
//  console.log("document", document);

	document.body.addEventListener('onChange', function(){
//  document.body.addEventListener('click', function(){
    console.log("launching");
    launchIntoFullscreen(document.documentElement);
  });

function launchIntoFullscreen(element) {
	 //    console.log("entered fullscreen code");
  //   if(element.requestFullscreen) {
  //     element.requestFullscreen();
  // }
  // else if(element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen();
  // }
  // else if(element.webkitRequestFullscreen) {
  //     element.webkitRequestFullscreen();
  // }
  // else if(element.msRequestFullscreen) {
  //     element.msRequestFullscreen();
  // }
	if(element.requestFullscreen) {
      	//element.requestFullscreen();
    	document.getElementById("footer").className = "wideFooter right";
	}
	else if(element.mozRequestFullScreen) {
		//element.mozRequestFullScreen();
    	document.getElementById("footer").className = "wideFooter right";
	}
	else if(element.webkitRequestFullscreen) {
		//element.webkitRequestFullscreen();
    	document.getElementById("footer").className = "wideFooter right";
	}
	else if(element.msRequestFullscreen) {
		//element.msRequestFullscreen();
    	document.getElementById("footer").className = "wideFooter right";
	}
}

