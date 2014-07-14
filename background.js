var visibleSetPoint = ".zh-pipeline-heading-container";
var placementPoint = ".pagehead";
var issuesLabel = ".zh-issue-label";

var hash = window.location.hash.split("?",1);
if (window.location.host == 'github.com' && hash == '#boards') {
  checkDOMChange();
}

function checkDOMChange() {
    if ($(visibleSetPoint).length) {
    	var menuPosition = $(visibleSetPoint).offset();
    	addtime(menuPosition);
    }
    else {
    	setTimeout(checkDOMChange, 100 );
    }
}

function addtime(menuPosition) {
	var hours = getHours();
	var text = nuamsBar("<h4>Total time for this board: " + hours + "</h4>" + burnDownLink(), menuPosition);
	$(placementPoint).prepend(text);
}

function getHours() {
	var total = 0;
	$(issuesLabel).each(function(e) {
 		var label = $(this).attr('data-name');
 		var data = parseInt(label[label.length -1]);
 		total = total + hours(data);
	});
	return total;
}

function burnDownLink() {
	var pathname = window.location.pathname;
	var link = '<a targe="_blank" href="http://radekstepan.com/github-burndown-chart/#!' + pathname + '" id="nuams-burn-me">burndown</a>';
	return link;
}

function hours(size) {
	if (size == 1){return 1}
 	else if (size == 2){return 3;}
 	else if (size == 3) {return 5}
 	else if (size == 4) {return 7}
 	else if (size == 5) {return 14;}
	else {return 0;}
}

function nuamsBar(text, menuPosition) {
	var top = parseInt(menuPosition.top) + parseInt(87);
var top = 175;
	var width = $(visibleSetPoint).width();
	return '<div id="nuams-bar" style="width: ' +  width +'px; left:' + menuPosition.left + 'px; top:' + top + 'px;"><div id="nuams-bar-inner">' + text + '</div></div>';
}
