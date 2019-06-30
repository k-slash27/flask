// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#fff';

// function number_format(number, decimals, dec_point, thousands_sep) {
//   // *     example: number_format(1234.56, 2, ',', ' ');
//   // *     return: '1 234,56'
//   number = (number + '').replace(',', '').replace(' ', '');
//   var n = !isFinite(+number) ? 0 : +number,
//     prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
//     sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
//     dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
//     s = '',
//     toFixedFix = function(n, prec) {
//       var k = Math.pow(10, prec);
//       return '' + Math.round(n * k) / k;
//     };
//   // Fix for IE parseFloat(0.55).toFixed(0) = 0;
//   s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
//   if (s[0].length > 3) {
//     s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
//   }
//   if ((s[1] || '').length < prec) {
//     s[1] = s[1] || '';
//     s[1] += new Array(prec - s[1].length + 1).join('0');
//   }
//   return s.join(dec);
// }

// Area Chart Example
var ctx = document.getElementById("myAreaChart").getContext('2d');
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [
    {
        data: [],
        label: '動揺度',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
    // , {
    //     data: [],
    //     label: "疲労度",
    //     borderColor: 'rgb(54, 162, 235)',
    //     backgroundColor: 'rgba(54, 162, 235, 0.5)',
    //     lineTension: 0,
    //     borderDash: [8, 4]
    // }
    ]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'realtime',
      }],
    },
    plugins: {
        streaming: {
            duration: 50000,
            refresh: 5000,
            delay: 5000,
            frameRate: 30,
            pause: false,
            onRefresh: function(myLineChart) {
                var dat = init();
                var now = Date.now();
                myLineChart.data.datasets[0].data.push({
                    x: now,
                    y: dat['enra']
                });
                // myLineChart.data.datasets[1].data.push({
                //     x: now,
                //     y: dat['fatigue']
                // });
            }
        }
    },
    // tooltips: {
    //   backgroundColor: "rgb(255,255,255)",
    //   bodyFontColor: "#858796",
    //   titleMarginBottom: 10,
    //   titleFontColor: '#6e707e',
    //   titleFontSize: 14,
    //   borderColor: '#dddfeb',
    //   borderWidth: 1,
    //   xPadding: 15,
    //   yPadding: 15,
    //   displayColors: false,
    //   intersect: false,
    //   mode: 'index',
    //   caretPadding: 10,
    //   callbacks: {
    //     label: function(tooltipItem, chart) {
    //       var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
    //       return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
    //     }
    //   }
    // }
  }
});

let result = [];
function init() {
    var enra = getEnraResponse();
    var sendData = JSON.stringify({"enra":enra});
    $.ajax({
      type: 'POST',
      url: '/fetchPos',
      data: sendData,
      contentType: 'application/json',
      success:function(data) {
        result = JSON.parse(data.ResultSet);
        $("#fatigue").text(Math.floor(result['fatigue']));
      }
    });
    return result;
}

function getEnraResponse() {
    var rand = Math.random() * (22 - 18) + 18;
    return rand;
}
