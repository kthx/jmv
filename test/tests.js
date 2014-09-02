var should = require("should")
    , router = require("../routes/index");

var request = {};
var response = {
    viewName: ""
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe("Routing", function(){
    describe("Default Route", function(){
        it("should provide the a index view name", function(){
            router.get('/', function(request, response){
                response.viewName.should.equal("index");                        
            });     
        });
        it("should provide the a title ", function(){
            router.get('/', function(request, response){           
                response.data.title.should.equal("JMV");            
            });     
        });
    });
});