// Variables
    console.debug();
//    var dataSourceID = 'qasi';
    var sectionTitle = '<div class="tableHeader title"><table id="dataTable"><tr><td><div class="wsquad">Squad</div></td><td><div class="wstatus">Status</div></td><td><div class="wjira">Jira #</div></td><td><div class="wsummary">Summary</div></td><td><div class="wnotes">Notes</div></td><td><div class="wreason">Reason</div></td><td><div class="wsprint">Sprint</div></td><td><div class="wtest">Left 2 Test</div></td></tr></table></div>';
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
    var sprint = 0;
    var status = 'all';
    var num = 9999;
    var rCount = 0;

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

// Sprint List
	function getSprintsList(){
		console.log('build Sprint list');
		var SL = $("#sprints"); // sprintlist
		var slc = 2; // sprint list counter

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
    function chooseSprint() {
        var option = document.getElementById("sprints").value;
        var optionText = $('#sprints :selected').text(); 
        console.log(option);console.log(optionText);
        var sprint = optionText;
        
        if (optionText == 'Select Release') {
            console.log('run RESET');
            runReset();
        }
        else {
            // document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
            // document.getElementById("fireText").innerHTML = sectionTitle;
            // //showSprint(sprint); // RUN showSprint
            showSelection('all',num)
        }
    }

// Reset to base page
    function runReset() {
        location.reload(parent);
        document.getElementById("fire").innerHTML = '';
        fireDiv.append('<div id="groupTitle" class="title">Select A Release To Review</div>');
		fireDiv.append('<div id="fireText" class="tableRows">&nbsp;</div>');
    }

// Show Slection
	function showSelection(status,num) {
		var sprintNo = document.getElementById("sprints").value;
		var sprint = $('#sprints :selected').text();
		// console.log('sprint: ' + sprint + ' status: ' + status + ' num: ' + num);
		console.log('sprintNo: ' + sprintNo + ' sprint: ' + sprint + ' status: ' + status + ' num: ' + num);
		document.getElementById("fireText").innerHTML = sectionTitle;

		if (sprintNo == 0 || sprintNo == 1) {
			if (status == 'all') {
	            document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
				domo.get('/data/v1/qasi?orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
						rCount = rCount+1;
			       });
				console.log('Rows: ' + rCount);	
				});
			}
			else {
				domo.get('/data/v1/qasi?filter=status contains "fire" &limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
						rCount = rCount+1;
			       });
				console.log('Rows: ' + rCount);	
				});
			}
		}
		else {
			if (status == 'all') {
	            document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
				domo.get('/data/v1/qasi?filter=sprint = ' + sprint + '&limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
						rCount = rCount+1;
			       });
				console.log('Rows: ' + rCount);	
				});
			}
			else {
	            document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
				domo.get('/data/v1/qasi?filter=sprint = ' + sprint + ',status contains "fire" &limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
						rCount = rCount+1;
			       });
				console.log('Rows: ' + rCount);	
				});
			}
		}
	}

// ShowSprint -------------------------  unused
	function showSprint(sprint){
		// console.log('run showSprint ###'); console.log('selected Sprint was: ' + sprint);
		if (sprint == "All Issues") {
			domo.get('/data/v1/qasi?orderby=sprint descending').then(function(qasi){
				qasi.forEach(function(item) {
					console.log(item);
					fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
				});
			});
		}
		else {
			domo.get('/data/v1/qasi?filter=sprint = ' + sprint).then(function(qasi){
				qasi.forEach(function(item) {
					console.log(item);
					fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
		       });
			});
		}
   }



