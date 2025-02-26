   function getQueryParam(param) {
            let urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        let currentX, currentY;
        let locationData = getQueryParam("location");

        if (locationData) {
            locationData = JSON.parse(decodeURIComponent(locationData));
            document.getElementById("current-location").innerText = "Current Location: " + locationData.name;

            const locations = {
                "Computer Science Department": { x: 550, y: 300 }
            };

            if (locations[locationData.name]) {
                let marker = document.getElementById("current-marker");
                currentX = locations[locationData.name].x;
                currentY = locations[locationData.name].y;

                marker.style.left = currentX + "px";
                marker.style.top = currentY + "px";
            }
        }

        function navigate() {
            const selectedDestination = document.getElementById("way").value;

            const locationss = {
                "Library": { x: 300, y: 740 } // Final Destination
            };

            if (locationss[selectedDestination]) {
                let destX = locationss[selectedDestination].x;
                let destY = locationss[selectedDestination].y;
                let marker1 = document.getElementById("destination-marker");

                marker1.style.left = destX + "px";
                marker1.style.top = destY + "px";
                marker1.style.display = "block"; 

                drawPath(currentX, currentY, destX, destY);
            }
        }

        function drawPath(startX, startY, endX, endY) {
            let svg = document.getElementById("path-svg");
            svg.innerHTML = "";

            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", `M ${startX} ${startY} 
			                        
                                    L 550 270
                                    L 180 270 
                                    L 180 745 
                                    L ${endX} ${endY}`);
            path.setAttribute("class", "path-line");
            svg.appendChild(path);
        }