window.InterviewFull = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new InterviewFull.Routers.Shapes();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  InterviewFull.initialize();
});
