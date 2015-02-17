$(document).ready(function(){

var onMobileBrowser = $.browser.mobile;

if (onMobileBrowser)
	console.log('On mobile!');
else
	console.log('Not on mobile');

var LennyFace = function(data) {
	this.name = data.name;
	this.text = decodeHtml(data.text);

};

var initialFaces = [
	{
		name: 'ClassicLenny',
		text: '( &#865;&deg; &#860;&#662; &#865;&deg;)'
	},
	{
		name: 'IntriguedLenny',
		text: '( &#864;&deg; &#863;&#662; &#865;&deg;)'
	},
	{
		name: 'MusclyLenny',
		text: '&#5478;( &#865;&deg; &#860;&#662; &#865;&deg;)&#5476;'
	},
	{
		name: 'WinkyLenny',
		text: '( &#865;~ &#860;&#662; &#865;&deg;)'
	},
	{
		name: 'BigEyesLenny',
		text: '( &#865;o &#860;&#662; &#865;o)'
	},
	{
		name: 'ReversedClassicLenny',
		text: '( &#865;&#865; &deg; &#860; &#662; &#865; &deg;)'
	},
	{
		name: 'SquareFaceLenny',
		text: '[ &#865;&deg; &#860;&#662; &#865;&deg;]'
	},
	{
		name: 'SamuraiLenny',
		text: '( &#865;&deg;&#9581;&#860;&#662;&#9582;&#865;&deg; )'
	},
];

var ViewModel = function() {
	var self = this;

	self.faceListRow1 = ko.observableArray([]);
	self.faceListRow2 = ko.observableArray([]);

	for (var i = 0; i < 4; i++) {
		self.faceListRow1.push(new LennyFace(initialFaces[i]));
	}
	for (var i = 4; i < initialFaces.length; i++) {
		self.faceListRow2.push(new LennyFace(initialFaces[i]));
	}
	// initialFaces.forEach(function(face) {
	// 	self.faceList.push(new LennyFace(face));
	// });

	/* COPY TO CLIPBOARD */
	self.copyFunction = function(html, event) {

		if (onMobileBrowser) {
			return;
		}
		var target = event.target;
		$(target).zclip({
			path: "zclip/ZeroClipboard.swf",
			copy: function() {
				return $(target).text();	
			}
		});
	}

	/* If on mobile, add 'easySelect' class 
		for easier copying
		*/
	

	


};

// Make our LennyFaces readable
function decodeHtml(html) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}



ko.applyBindings(new ViewModel());

function select(evt) {
	if (event.target.firstChild.nodeType !== 3) {
		console.log("Unable to select face, firstChild is not a textNode.");
		return;
	}

	var el = event.target;

	if (!isEditable(el)) {
		el.setAttribute('contentEditable', true);
	}

	var sel = window.getSelection();

	var range = document.createRange();

	range.setStart(el.firstChild, 0);
	range.setEnd(el.firstChild, el.innerHTML.length);
	sel.removeAllRanges();
	sel.addRange(range);
}

function isEditable(el) {
	return editable = el.getAttribute("contentEditable");
}


if (onMobileBrowser) {

	
	var newRow = document.createElement('div');
	$(newRow).addClass('row row-centered');
	var newCol = document.createElement('div');
	$(newCol).addClass('col-xs-10  col-centered mobileInfo text-center');
	$(newCol).html('It looks like you\'re on a mobile device so we can\'t directly copy the faces to your clipboard. However, you\'ll notice that if you click on a face we automatically select it, making it easier for you to copy it yourself.');

	$(newRow).prepend(newCol);

	$('#logoLennyFace').after(newRow);


	$('a.boxedItem').addClass('easySelect');
	$('.easySelect').each(function() {
		var easy = $(this);
		easy.on('click', select);
	});
}
		
});

