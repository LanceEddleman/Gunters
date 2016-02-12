// Variables
    console.debug();
    var dataSourceID = 'qasi';
    var sectionTitle = '<div class="tableHeader"><table><thead><tr><th><div class="wsquad">Squad</div></th><th><div class="wstatus">Status</div></th><th><div class="wjira">Jira #</div></th><th><div class="wsummary">Summary</div></th><th><div class="wnotes">Notes</div></th><th><div class="wreason">Reason</div></th><th><div class="wsprint">Sprint</div></th><th><div class="wtest">Left 2 Test</div></th></tr></thead></div>';
	var fsquad = '<div class=""><table><thead><tr><th><div class="wsquad">';
	var fstatus = '</div></th><th><div class="wstatus">';
	var fjira = '</div></th><th><div class="wjira">';
	var fsummary = '</div></th><th><div class="wsummary">';
	var fnotes = '</div></th><th><div class="wnotes">';
	var freason = '</div></th><th><div class="wreason">';
	var fsprint = '</div></th><th><div class="wsprint">';
	var ftest = '</div></th><th><div class="wtest">';
	var fend = '</div></th></tr></thead></div>';
    var fireTitle = "On Fire";
    var fireText = $("#fireText");

 
 // Current Date
   var today = new Date();
   var viewToday = (
       (today.getMonth() + 1) + "/" +
       today.getDate() + "/" +
       today.getFullYear()
   );
   console.log('Today is: ' + viewToday);


// Fire -------------------------
	function dataStart(){
		var rCount = 1;
		console.log('run dataStart ****');

		domo.get('/data/v1/qasi?filter=status = "Fire"').then(function(qasi){
			console.log("qasi", qasi);

			fireText.append(sectionTitle); // add title section

			qasi.forEach(function(item) {
				console.log(item);
//				fireText.append('<div><table><thead><tr><th><div class="wsquad">' + item.squad + '</div></th><th><div class="wstatus">'+ item.status +'</div></th><th><div class="wjira">'+ item.jira +'</div></th><th><div class="wsummary">'+ item.summary +'</div></th><th><div class="wnotes">'+ item.notes +'</div></th><th><div class="wreason">'+ item.reason +'</div></th><th><div class="wsprint">'+ item.sprint +'</div></th><th><div class="wtest">'+ item.test +'</div></th></tr></thead></div>');
				fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
			});
		});
	};



// ShowSprint -------------------------
	function showSprint(sprint){
		console.log('run showSprint ###');
		console.log('selected Sprint was: ' + sprint);
		domo.get('/data/v1/qasi?filter=sprint = ' + sprint).then(function(qasi){
			console.log("qasi", qasi);

			qasi.forEach(function(item) {
				console.log(item);
//				fireText.append('<div class=""><table><thead><tr><th><div class="wsquad">' + item.squad + '</div></th><th><div class="wstatus">'+ item.status +'</div></th><th><div class="wjira">'+ item.jira +'</div></th><th><div class="wsummary">'+ item.summary +'</div></th><th><div class="wnotes">'+ item.notes +'</div></th><th><div class="wreason">'+ item.reason +'</div></th><th><div class="wsprint">'+ item.sprint +'</div></th><th><div class="wtest">'+ item.test +'</div></th></tr></thead></div>');
				fireText.append(fsquad + item.squad + fstatus + item.status + fjira + item.jira + fsummary + item.summary + fnotes + item.notes + freason + item.reason + fsprint + item.sprint + ftest + item.test + fend);
	       });
		});
   };



// Sprint List
	function getSprintsList(){
		console.log('build Sprint list');
		var SL = $("#sprints"); // sprintlist
		var slc = 1; // sprint list counter

		domo.get('/data/v1/qasi').then(function(qasi){
			console.log("qasi", qasi);
			qasi.forEach(function(item) {
				console.log(item);
				if (item.sprintlist == null) {// console.log(item.sprintlist);
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

    document.getElementById("fireText").innerHTML = sectionTitle //'<div class="full tbold">-- Summary --</div><div id="tests" class="summaryItems"><span>Tests: ' + expectedPass + '</span></div><div id="passing" class="summaryItems"><span>Passed: ' + actualPass + '</span></div>';
	showSprint(sprint); // RUN showSprint
}
