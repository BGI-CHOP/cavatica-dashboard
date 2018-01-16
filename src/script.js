function addCommas(nStr) {
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function pieChart(bgcolor, piecolor, name, data){
	var options={
		credits: false,
		chart: { backgroundColor: bgcolor, type: 'pie' },
		title: { text: null },
		tooltip: { pointFormat: '<b>{point.y}</b> '+name },
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true, distance: 20, format: '{point.y}',
					style: { textOutline: false }
				}, 
				colors: (function() {
					var colors = [], base = Highcharts.getOptions().colors[piecolor], i;
					for (i = 0; i < 10; i += 1) {
						colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
					}
					return colors;
				}()),
				showInLegend: true
			}
		},
		legend: {
			align: 'center', verticalAlign: 'bottom', labelFormat: '{id}'
		},
		series: [{ name: name, data: data }]
	};
	return options;
}

function sumY(data){
	var sum = 0;
	for (i = 0; i < data.length; i++) {
		sum += data[i].y;
	}
	return sum;
}

$(document).ready(function(){
	$.ajax({
		url: './src/data.js?format=jsonp',
		dataType: 'jsonp',
		jsonpCallback: 'callback',
		success: function(data) {
			// user
			document.getElementById('UserNum').innerHTML = addCommas(sumY(data.user));
			$('#user').highcharts(pieChart("#dff0d8", 2, "users", data.user));
			// dataset
			document.getElementById('DataNum').innerHTML = addCommas(sumY(data.dataset));
			$('#dataset').highcharts(pieChart("#d4cbe6", 4, "datasets", data.dataset));
			// files
			document.getElementById('FileNum').innerHTML = addCommas(sumY(data.file));
			$('#file').highcharts(pieChart("#fcf8e3", 3, "files", data.file));
			// apps
			document.getElementById('AppNum').innerHTML = addCommas(sumY(data.app));
			$('#app').highcharts(pieChart("#f2dede", 5, "apps", data.app));
			// diagnosis
			$('#diagnosis').highcharts({
				credits: false,
				chart: { backgroundColor:"#daedf7", type: 'column' },
				title: { text: null },
				xAxis: { type: 'category' },
				yAxis: { title: {text: null}, gridLineDashStyle: 'dot' },
				legend: { enabled: false },
				plotOptions: {
					series: {
						pointWidth: 16,
						dataLabels: {
							enabled: true, format: '{point.y}',
							style: { 
								textOutline: false, 
								fontWeight: "normal", color: "gray", fontSize: "8px"
							}
						}
					}
				},
				tooltip: { pointFormat: 'has <b>{point.y}</b> cases<br/>' },
				series: [{
					colorByPoint: true, borderWidth: 0,
					borderRadius: 2, data: data.diagnosis
				}]
			});
		}
	});
});