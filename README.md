OSX Yosemite's Today Jalaly (Persian) Calendar Widget
=====================================================

![screen shot](https://raw.githubusercontent.com/morteza-fsh/mac-todaywidget.jalaly/master/screenshot/widget-ss.png)

Installation
------------
 1. Download "TodayScripts" from [here](https://github.com/SamRothCA/Today-Scripts/releases).
 2. Install Node.js:  
    `$ brew install node`
 3. Add "Scripts" widget to Yosemite's notification center. 
 4. Click on (i) icon and create new scripts widget.
 5. Enter a label for your widget.
 6. Change program to `/usr/local/bin/node`
 7. open `dist/widget.min.js` and copy all of its content to the widget.
 8. Save Script and Enjoy!

Contribute
==========

Node installation:
-------------------
    brew install node


Grunt installation:
-------------------
    npm install -g grunt-cli
    npm install -g grunt-init
    npm init (creates a `package.json` file)


Project Dependencies:
---------------------
    npm install grunt --save-dev
    npm install grunt-contrib-watch    --save-dev
    npm install grunt-contrib-uglify   --save-dev
    npm install grunt-contrib-concat   --save-dev

    npm install load-grunt-tasks   --save-dev
    npm install time-grunt         --save-dev
    npm install grunt-concurrent   --save-dev


Simple Dependency Install:
--------------------------
    npm install (from the same root directory as the `package.json` file)