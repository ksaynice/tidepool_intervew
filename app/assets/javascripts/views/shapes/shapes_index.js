InterviewFull.Views.ShapeView = Backbone.View.extend({
  initialize: function() {
    // var model = this.model, ctx = this.options.ctx;
  },
  
  render : function() {
    var model = this.model, ctx = this.options.ctx;
    
    if (model.attributes.t === "square") {
      ctx.fillStyle = model.get("color");
      ctx.globalAlpha = 1;
      ctx.fillRect(model.get("x"), model.get("y"), model.get("w"), model.get("h"));
    }
    else if (model.attributes.t === "circle") {
      ctx.beginPath();
      ctx.globalAlpha = 1;
      ctx.arc(model.get("x"), model.get("y"), 30, 0 , 2 * Math.PI, false);
      ctx.fillStyle = model.get("color");
      ctx.fill();
    };
  }
});

InterviewFull.Views.SetView = Backbone.View.extend({
  initialize: function() {
    InterviewFull.Views.SetView.that = this;
    InterviewFull.Views.SetView.ctx = this.el.getContext("2d");
    InterviewFull.Views.SetView.col = this.collection;

    InterviewFull.Views.SetView.selection = null;
    InterviewFull.Views.SetView.col.on("reset",this.render,this);
    InterviewFull.Views.SetView.col.on("add",this.render,this);
    InterviewFull.Views.SetView.col.on("change",this.render,this);
    this.el.addEventListener('mousedown', this.sel, true);
    this.el.addEventListener('mouseup', function(e) {
      InterviewFull.Views.SetView.dragging = false;
    }, true);
    this.el.addEventListener('mousemove', this.moveShape, true);
    this.el.addEventListener('dblclick', this.createShape, true);
    window.setInterval(this.saveNotice,30000);
    $(".close").on("click", function(){
      $(".alert").hide();
    });
    var drop_color = $('#drop_color');
    drop_color.change(function() 
    {
      if (InterviewFull.Views.SetView.selection !== null) {
        InterviewFull.Views.SetView.selection.save({color: $(this).val()}, {partialUpdate : true});
      };
    });
    // this.el.addEventListener('click', this.createShape, false);
  },
  
  saveNotice: function() {
      $(".alert").show();
  },
  
  moveShape: function(event) {
    if (InterviewFull.Views.SetView.dragging && (InterviewFull.Views.SetView.selection !== null)){
      var x = event.offsetX,
          y = event.offsetY;
      InterviewFull.Views.SetView.selection.save({x: x - InterviewFull.Views.SetView.dragoffx, y: y - InterviewFull.Views.SetView.dragoffy }, {partialUpdate : true})
    }
  },
  
  sel : function(event) {
    InterviewFull.Views.SetView.selection = null;
    var x = event.offsetX,
        y = event.offsetY;
    
    for(var i = 0; i < InterviewFull.Views.SetView.shapes.length; i++ ) {
      var distSqr = Math.pow(InterviewFull.Views.SetView.shapes[i].attributes.x - x, 2) + Math.pow(InterviewFull.Views.SetView.shapes[i].attributes.y - y, 2);
      
      if((x > InterviewFull.Views.SetView.shapes[i].attributes.x
        && x < InterviewFull.Views.SetView.shapes[i].attributes.x + InterviewFull.Views.SetView.shapes[i].attributes.w
        && y > InterviewFull.Views.SetView.shapes[i].attributes.y
        && y < InterviewFull.Views.SetView.shapes[i].attributes.y + InterviewFull.Views.SetView.shapes[i].attributes.h) && InterviewFull.Views.SetView.shapes[i].attributes.t === "square") {
       InterviewFull.Views.SetView.selected_shape = InterviewFull.Views.SetView.shapes[i];
       InterviewFull.Views.SetView.selection = InterviewFull.Views.SetView.selected_shape;
       InterviewFull.Views.SetView.dragoffx = x - InterviewFull.Views.SetView.selected_shape.attributes.x;
       InterviewFull.Views.SetView.dragoffy = y - InterviewFull.Views.SetView.selected_shape.attributes.y;
       InterviewFull.Views.SetView.dragging = true;
      }
      else if ((distSqr < 900) && InterviewFull.Views.SetView.shapes[i].attributes.t === "circle") {
        InterviewFull.Views.SetView.selected_shape = InterviewFull.Views.SetView.shapes[i];
        InterviewFull.Views.SetView.selection = InterviewFull.Views.SetView.selected_shape;
        InterviewFull.Views.SetView.dragoffx = x - InterviewFull.Views.SetView.selected_shape.attributes.x;
        InterviewFull.Views.SetView.dragoffy = y - InterviewFull.Views.SetView.selected_shape.attributes.y;
        InterviewFull.Views.SetView.dragging = true;
        };
    };
    
    InterviewFull.Views.SetView.that.render();
    
  },
  
  createShape: function(event) {
    event.preventDefault();
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    var drop_color = $('#drop_color').val();
    var drop_shape = $('#drop_shape').val();
    new_shape = new InterviewFull.Models.Shape({ uid: InterviewFull.uid, x: x, y: y, z: 0, w: 60, h: 60, color: drop_color, t: drop_shape });
    InterviewFull.Views.SetView.col.create(new_shape);
  },
  
  render: function() {
    var canvas = this.el, ctx = canvas.getContext("2d");
    InterviewFull.Views.SetView.shapes = this.collection.models;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.collection.each(function(model) {
      var view = new InterviewFull.Views.ShapeView({ctx:ctx,model:model});
      view.render();      
    })
    
    if (InterviewFull.Views.SetView.selection !== null) {
      if (InterviewFull.Views.SetView.selection.attributes.t === "square") {
        InterviewFull.Views.SetView.ctx.strokeStyle = "black";
        InterviewFull.Views.SetView.ctx.lineWidth = 2;
        InterviewFull.Views.SetView.ctx.strokeRect(InterviewFull.Views.SetView.selection.get("x"), InterviewFull.Views.SetView.selection.get("y"), InterviewFull.Views.SetView.selection.get("w"), InterviewFull.Views.SetView.selection.get("h"));
      } else if (InterviewFull.Views.SetView.selection.attributes.t === "circle") {
        InterviewFull.Views.SetView.ctx.beginPath();
        InterviewFull.Views.SetView.ctx.arc(InterviewFull.Views.SetView.selection.get("x"), InterviewFull.Views.SetView.selection.get("y"), 30, 0 , 2 * Math.PI, false);
        InterviewFull.Views.SetView.ctx.lineWidth = 2;
        InterviewFull.Views.SetView.ctx.strokeStyle = "black";
        InterviewFull.Views.SetView.ctx.stroke();
      };
    };
  }
});