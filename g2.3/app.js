// old datasource id: b34b7088-15ff-43e8-a2e4-922cbedd5954

// Variables
    console.debug();
    var sectionTitle = '<div class="fRow"><div class="tasks">Tasks</div><div class="notes">Notes</div></div>';
    var fireText = $("#fireText");
    var nextText = $("#nextText");
    var fireData = $('#fireData');
    var nextData = $('#nextData');

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
		var rCount = 1;
		console.log('pull Fire data');
		var fireText = $("#fireText");

		domo.get('/data/v1/gZone?filter=status = "Fire"').then(function(gZone){
//			console.log("gZone", gZone);
			fireText.append(sectionTitle); // add title section
			gZone.forEach(function(item) {
				if(rCount % 2 === 0) {
					fireData.append('<div class="fRowE"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>'); 
					rCount = rCount+1;
					console.log('evenRow:' + rCount);
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

// next -------------------------
	function nextStart(){
		var rCount = 1;
		console.log('pull Next data');
		var nextText = $("#nextText");

		domo.get('/data/v1/gZone?filter=status = "Next"').then(function(gZone){
//			console.log("gZone", gZone);
			nextText.append(sectionTitle); // add title section
			gZone.forEach(function(item) {
				if(rCount % 2 === 0) {
					console.log(item);
					nextData.append('<div class="fRowE"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>');
					rCount = rCount+1;
					console.log('evenRow:' + rCount);
				}
				else {
					nextData.append('<div class="fRow"><div class="tasks">' + item.task + '</div><div class="notes">'+ item.notes +'</div></div>');
					rCount = rCount+1;
					console.log('oddRow:' + rCount);
				}
			});
		});
	};
