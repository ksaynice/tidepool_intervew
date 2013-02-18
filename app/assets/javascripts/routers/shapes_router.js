InterviewFull.Routers.Shapes = Backbone.Router.extend({
  routes: {
    '': 'index',
    'shapes/:id': 'show'
  },

  initialize : function () {
    var c = new InterviewFull.Collections.Shapes;
    c.fetch();
    
    var v = new InterviewFull.Views.SetView({
      el: $("canvas"),
      collection: c
    });
    v.render();
  },
  
  index : function(){
  },
  
  show : function(){
  
  },
  
  
});
