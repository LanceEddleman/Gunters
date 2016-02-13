// Variables
    console.debug();
//    var dataSourceID = 'qasi';
    var sectionTitle = '<div class="tableHeader title"><table id="dataTable"><tr><td><div class="wsquad">Squad</div></td><td><div class="wstatus">Status</div></td><td><div class="wjira">Jira #</div></td><td><div class="wsummary">Summary</div></td><td><div class="wnotes">Notes</div></td><td><div class="wreason">Reason</div></td><td><div class="wsprint">Sprint</div></td><td><div class="wtest">Left 2 Test</div></td></tr></thead></div>';
    var fsquad = '<div class="tableRows"><table><tr><td><div class="wsquad">';
	var fstatus = '</div></td><td><div class="wstatus">';
	var fjira = '</div></td><td><div class="wjira">';
	var fsummary = '</div></td><td><div class="wsummary">';
	var fnotes = '</div></td><td><div class="wnotes">';
	var freason = '</div></td><td><div class="wreason">';
	var fsprint = '</div></td><td><div class="wsprint">';
	var ftest = '</div></td><td><div class="wtest">';
	var fend = '</div></td></tr></table></div>';
    var titleText = 'Make a selection';
    var groupTitle = '<div>' + titleText + '</div>';
    var fireDiv = $("#fire");
    var fireText = $("#fireText");


// Current Date
function showDate(){
var today = new Date();
   var viewToday = (
       (today.getMonth() + 1) + "/" +
       today.getDate() + "/" +
       today.getFullYear()
   );
   console.log('Today is: ' + viewToday);
}


// Fire -------------------------
//function dataStart(){
//	console.log('run dataStart ****');
//	domo.get('/data/v1/qasi?filter=status = "Fire"').then(function(qasi){
//		console.log("qasi", qasi);
//		fireText.append(sectionTitle); // add title section
//
//		qasi.forEach(function(item) {
//            console.log(item);
//			// fireText.append('<div><table><thead><tr><th><div class="wsquad">' + item.squad + '</div></th><th><div class="wstatus">'+ item.status +'</div></th><th><div class="wjira">'+ item.jira +'</div></th><th><div class="wsummary">'+ item.summary +'</div></th><th><div class="wnotes">'+ item.notes +'</div></th><th><div class="wreason">'+ item.reason +'</div></th><th><div class="wsprint">'+ item.sprint +'</div></th><th><div class="wtest">'+ item.test +'</div></th></tr></thead></div>');
//			fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
//        });
//    });
//}



// ShowSprint -------------------------
	function showSprint(sprint){
		// console.log('run showSprint ###');
		// console.log('selected Sprint was: ' + sprint);
		domo.get('/data/v1/qasi?filter=sprint = ' + sprint).then(function(qasi){
			// console.log("qasi", qasi);

			qasi.forEach(function(item) {
				console.log(item);
				fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
	       });
		});
   }



// Sprint List
	function getSprintsList(){
		console.log('build Sprint list');
		var SL = $("#sprints"); // sprintlist
		var slc = 1; // sprint list counter

		domo.get('/data/v1/qasi').then(function(qasi){
			console.log("qasi", qasi);
			qasi.forEach(function(item) {
				console.log(item);
				if (item.sprintlist === null) {// console.log(item.sprintlist);
				}
				else {
					SL.append('<option value="' + slc + '">' + item.sprintlist + '</option>');
					slc = slc + 1;
				}
			});
		});
	};

// User selected Sprint
    function chooseSprint(option) {
        var option = document.getElementById("sprints").value;
        var optionText = $('#sprints :selected').text(); 
        console.log(option);console.log(optionText);
        var sprint = optionText;
        
        if (optionText == 'Select Release') {
            console.log('run RESET');
            runReset();
        }
        else {
            document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
            document.getElementById("fireText").innerHTML = sectionTitle;
            showSprint(sprint); // RUN showSprint
        }
    }

// Reset to base page
    function runReset() {
        location.reload(parent);
        document.getElementById("fire").innerHTML = '';
        fireDiv.append('<div id="groupTitle" class="title">Select A Release To Review</div>');
		fireDiv.append('<div id="fireText">&nbsp;</div>');
    }