Full-Stack Interview Question
=============================

Application
-----------
Build a simple canvas application as shown in the wireframe: (doc/wireframe.pdf)

* When the app loads, an anonymous user account is generated in the database if there is no user cookie found in the system.
	* If there is an anonymous user cookie than load the previously saved canvas for that user.
* The canvas size is 800x600, excluding the toolbar. (Use the Bootstrap standard toolbar size)
	* If the browser is sized smaller, show scrollbars in the canvas.
* User can choose the Shape dropdown and pick a square or circle for the shape. (Square is the default)
	* Once a shape is chosen from the dropdown, when a user clicks on an empty area in the canvas the chosen shape is drawn. The size of the shape is 60x60px and the origin is the cursor location.
	* Shape z-order is the order of shapes created where the last created shape is topmost.
	* Clicking on an area selects the top most shape in that area.
* User can choose the Color dropdown, which has the 5 colors as shown as options.
	* Selecting a color changes the fill color of the currently selected shape.
	* If no shape is selected, the fill color is set for the next drawn shape.
* User can choose a shape and drag them around the canvas.
	* The shape is cropped around the edges.
* The canvas contents are saved every 30 seconds automatically in the anonymous users account.
	* A Saving notice is shown.

Frameworks/languages:
---------------------

* Bootstrap for HTML/CSS
* Backbone.js and Javascript (or better yet Coffeescript)
	* You can pick an alternative like Ember.js, Angular.js with the explanation on why you picked them.
* Ruby on Rails for backend
	* Explain the gems you used and why you picked them.
* Active Record for the ORM.
	* Or pick something else but explain why.
	* SQLLite for the database for development mode.

Please write your tests as well. We will look at the tests too.

Once you are ready to show something, send keremk a pull-request. You are welcome to share un-finished pull-requests. (i.e. if you are done with a feature and the system works, you can send a pull-request)
