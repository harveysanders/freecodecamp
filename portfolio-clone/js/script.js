$(document).ready(function() {
	var $section0, //because the FixedBackground utilty starts sections at 1
		$section1,
		$section2,
		$section3,
		$section4,
		$section5,

		sections
		;

	sections = [$section0, $section1, $section2, $section3, $section4, $section5];

	sections.map(function($section, index){
		$section = $('#fbsection' + index);
		$section.css({
			'background-image' : 'url(images/bokeh' + index + '.jpg)',
			'padding-top' : $('.navbar-fixed-top').height() + 30 + 'px',
		});
		$section.append('<div>').attr({'class' : 'text-center'});
	});
	console.log(sections);
	$section1 = $('#fbsection1');
	
	//background images//

	console.log($section1);
});
