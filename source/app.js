(function() {
    var id = "asos_mobileperf";
    var div = document.getElementById(id);
    if ( div ) {
        div.style.display = "block";
    } 
    else {
        var div = document.createElement('div');
        div.id = id;
        //div.style.cssText = "";
        
        var style = document.createElement('style');
        style.innerText = '@@{style}@'; 
        
        if ( "undefined" === typeof(performance) ) 
            sHtml = 'ERROR: Navigation timing API was not found.';

        var sHtml = '';
        try {
            var a = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart; // dom loaded
            var b = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart; // load event fired
            var c = window.performance.timing.responseEnd - window.performance.timing.navigationStart; // HTML code finish to download
            var l = window.performance.timing.responseStart - window.performance.timing.navigationStart; // initial network latency

            var redirectCount = window.performance.navigation.redirectCount; // count number of redirects
            var DNSlookupTime = window.performance.timing.domainLookupEnd - window.performance.timing.domainLookupStart; // DNS lookup
            var connectionTime = window.performance.timing.connectEnd - window.performance.timing.connectStart; // TCP Connection time
            var serverTime = window.performance.timing.responseStart - window.performance.timing.requestStart; // Request time, the server computes the response
            var responseTime = window.performance.timing.responseEnd - window.performance.timing.responseStart; // Response time, HTML download time 
            var domLoadingTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.domContentLoadedEventStart; // time to load the DOM
            var pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.loadEventStart; // time to trigger the load event from the domContentLoaded event

            try {
                var connection = navigator.connection || {'type':'0'}, // create a custom object if navigator.connection isn't available 
                    connectionSpeed;
                console.log(connection.type);
                // determine connection speed 
                switch(connection.type) { 
                    case connection.CELL_3G: // 3G 
                        connectionSpeed = 'CELL_3G'; 
                    break; 
                    case connection.CELL_2G: // 2G 
                        connectionSpeed = 'CELL_2G'; 
                    break; 
                    default: // WIFI, ETHERNET, UNKNOWN 
                        connectionSpeed = 'fast'; 
                }; 
            } catch (e) {}

            var max = Math.max.apply( Math, [l, c, b, a] ); 
            var timeline = '<div id="asosTimelineBar"><div style="z-index:5;background:#0E3;width:' + ( ( ( DNSlookupTime + connectionTime ) * 100 ) / max ).toFixed(0) + '%;"></div><div style="z-index:4;background:#99B4EC;width:' + ( ( serverTime * 100 ) / max ).toFixed(0) + '%;"></div><div style="z-index:3;background:#407AC7;width:' + ( ( c * 100 ) / max ).toFixed(0) + '%;"></div><div style="z-index:2;background:#F19B73;width:' + ( ( a * 100 ) / max ).toFixed(0) + '%;"></div><div style="z-index:1;background:#D62121;width:100%;"></div></div>';
            sHtml = timeline 
                + '<div id="asos_timing_report" style="padding:8px;max-width:250px">'
                + '<div>DNS lookup: <div style="float:right">' + DNSlookupTime + '</div></div>'
                + '<div>TCP Connection: <div style="float:right">' + connectionTime + '</div></div>'
                //+ '<div>Initial network latency: <div style="float:right">' + l + '</div></div>'
                + '<div>Server computing time: <div style="float:right">' + serverTime + '</div></div>'
                + '<div>HTML download time: <div style="float:right">' + responseTime + ' ' + ( (window.performance.timing.domainLookupEnd === window.performance.timing.connectEnd) ? '(cached)': '' ) + '</div></div>' 
                + '<div style="margin: 7px 0;width:100%;height:1px;border-bottom:1px solid #000;"></div>'
                + '<div>HTML finishes to download at: <div style="float:right">' + c + '</div></div>' 
                + '<div>DOMContentLoaded event: <div style="float:right">' + a + '</div></div>' 
                + '<div>Page load event: <div style="float:right">' + b + '</div></div>' 
                + '<div>Connection type: <div style="float:right">' + connectionSpeed + '</div></div>'
                + '<div id="closeMobilePerf" onclick="document.body.removeChild( document.getElementById(\'asos_mobileperf\') );">Close</div>' 
                + '</div>';

            // Save timestamp, page URL, referrer, page size and number of resources 
        } catch(e) {}

        div.innerHTML = sHtml;
        div.appendChild(style); 
        var abc = '@@{saveData}@';
        document.body.appendChild(div);
    }
})();