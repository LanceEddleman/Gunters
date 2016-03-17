// Variables
    console.debug();
//    var dataSourceID = 'qasi';
    var sectionTitle = '<div id="sectionTitle"><div class="wsquad">Squad</div><div class="wstatus">Status</div><div class="wjira">Jira #</div><div class="wsummary">Summary</div><div class="wnotes">Notes</div><div class="wreason">Reason</div><div class="wsprint">Sprint</div><div class="wtest">Left 2 Test</div></div>';
    //var dataRow = '<div class="tableRows"><div class="wsquad"></div><div class="wstatus"></div><div class="wjira"></div><div class="wsummary"></div><div class="wnotes"></div><div class="wreason"></div><div class="wsprint"></div><div class="wtest"></div></div>';
    //var squad, status, jira, summary, notes, reason, sprint, test = "";
 //    var fsquad = '<div class="tableRows"><div class="wsquad">';
	// var fstatus = '</div><div class="wstatus">';
	// var fjira = '</div><div class="wjira">';
	// var fsummary = '</div><div class="wsummary">';
	// var fnotes = '</div><div class="wnotes">';
	// var freason = '</div><div class="wreason">';
	// var fsprint = '</div><div class="wsprint">';
	// var ftest = '</div><div class="wtest">';
	// var fend = '</div></table></div>';
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

		domo.get('/data/v1/qasi?orderby=sprint ascending').then(function(qasi){
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
		var rCount = 1;
		var sprintNo = document.getElementById("sprints").value;
		var sprint = $('#sprints :selected').text();
		console.log('sprintNo: ' + sprintNo + ' sprint: ' + sprint + ' status: ' + status + ' num: ' + num);
		document.getElementById("fireText").innerHTML = sectionTitle;

		if (sprintNo == 0 || sprintNo == 1) {
			if (status == 'all') {
	            document.getElementById("groupTitle").innerHTML = 'Sprint: ' + sprint;
				domo.get('/data/v1/qasi?orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							fireText.append('<div class="tableRows fRowE"><div class="wsquad">' + item.squad + '&nbsp;</div><div class="wstatus">' + item.status + '&nbsp;</div><div class="wjira">' + item.jira + '&nbsp;</div><div class="wsummary">' + item.summary + '&nbsp;</div><div class="wnotes">' + item.notes + '&nbsp;</div><div class="wreason">' + item.reason + '&nbsp;</div><div class="wsprint">' + item.sprint + '&nbsp;</div><div class="wtest">' + item.test + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
						else {
							fireText.append('<div class="tableRows fRow"><div class="wsquad">' + item.squad + '&nbsp;</div><div class="wstatus">' + item.status + '&nbsp;</div><div class="wjira">' + item.jira + '&nbsp;</div><div class="wsummary">' + item.summary + '&nbsp;</div><div class="wnotes">' + item.notes + '&nbsp;</div><div class="wreason">' + item.reason + '&nbsp;</div><div class="wsprint">' + item.sprint + '&nbsp;</div><div class="wtest">' + item.test + '&nbsp;</div></div>');
							rCount = rCount+1;
						}
			       });
				console.log('Rows: ' + rCount);	
				});
			}
			else {
				domo.get('/data/v1/qasi?filter=status contains "fire" &limit='+ num + '&orderby=sprint descending').then(function(qasi){
					rCount = 0;
					qasi.forEach(function(item) {
						console.log(item);
						if(rCount % 2 === 0) {
							fireText.append('<div class="tableRows fRowE"><div class="wsquad">' + item.squad + '</div><div class="wstatus">' + item.status + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wnotes">' + item.notes + '</div><div class="wreason">' + item.reason + '</div><div class="wsprint">' + item.sprint + '</div><div class="wtest">' + item.test + '</div></div>');
							rCount = rCount+1;
						}
						else {
							fireText.append('<div class="tableRows fRow"><div class="wsquad">' + item.squad + '</div><div class="wstatus">' + item.status + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wnotes">' + item.notes + '</div><div class="wreason">' + item.reason + '</div><div class="wsprint">' + item.sprint + '</div><div class="wtest">' + item.test + '</div></div>');
							rCount = rCount+1;
						}
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
						if(rCount % 2 === 0) {
							fireText.append('<div class="fRowE"><div class="wsquad">' + item.squad + '</div><div class="wstatus">' + item.status + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wnotes">' + item.notes + '</div><div class="wreason">' + item.reason + '</div><div class="wsprint">' + item.sprint + '</div><div class="wtest">' + item.test + '</div></div>');
							rCount = rCount+1;
						}
						else {
							fireText.append('<div class="tableRows fRow"><div class="wsquad">' + item.squad + '</div><div class="wstatus">' + item.status + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wnotes">' + item.notes + '</div><div class="wreason">' + item.reason + '</div><div class="wsprint">' + item.sprint + '</div><div class="wtest">' + item.test + '</div></div>');
							rCount = rCount+1;
						}
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
						if(rCount % 2 === 0) {
							fireText.append('<div class="tableRows fRowE"><div class="wsquad">' + item.squad + '</div><div class="wstatus">' + item.status + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wnotes">' + item.notes + '</div><div class="wreason">' + item.reason + '</div><div class="wsprint">' + item.sprint + '</div><div class="wtest">' + item.test + '</div></div>');
							rCount = rCount+1;
						}
						else {
							fireText.append('<div class="tableRows fRow"><div class="wsquad">' + item.squad + '</div><div class="wstatus">' + item.status + '</div><div class="wjira">' + item.jira + '</div><div class="wsummary">' + item.summary + '</div><div class="wnotes">' + item.notes + '</div><div class="wreason">' + item.reason + '</div><div class="wsprint">' + item.sprint + '</div><div class="wtest">' + item.test + '</div></div>');
							rCount = rCount+1;
						}
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



