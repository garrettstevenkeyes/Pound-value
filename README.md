## Pound-value
Visualization of how the price of the pound has changed over time


## How to open the file

To open the graph you have to use python to local host a server. 
First in the console navigate to the greater folder holding all the files. 
Then you have to run the command python -m http.server 8000 . 
This will launch the server. YOu can use a different server number if you want, it doesn't matter just dictatices where the local host is.
From there you go to localhost:8000 in your browser. All browsers will work but using google chrome incognitio is best. Incognito to avoid chromes cashing feature.

## How it was made

To make this graphic I first had to parse the Json data to make it readable. From there I constructed the base line chart which programmatically calculates the line coordinates. After making the lie chart I included the UI slider in the HTML. Next I created a filter function that shows values for the filtered date range. And then i refactored the chart to fit in the d3 update pattern. 

## Dependencies used

HTML5 

CSS

JavascriptES6

JQuery 

d3.js

JQuery UI
