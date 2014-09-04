describe('myJmv services', function() {
    beforeEach(module('myJmv.services'));

    it('should return current version', inject(function(version) {
        expect(version).toEqual('0.1');
    }));

    describe("lastResultService", function(){
        it('can set and get last result', inject(function(lastResultService) {
            lastResultService.setLastResult("FindMeLater");
            expect(lastResultService.getLastResult()).toEqual("FindMeLater");
        }));
    });

    describe("configService", function(){
        beforeEach(inject(function (_configService_, $httpBackend) {
            configService = _configService_;
            httpBackend = $httpBackend;
        }));
        it('getCurrentConfig loads the config into the service and returns true', function() {
            httpBackend.whenGET("/config/api").respond({
                    data: JSON.stringify({ key: 'findMe'})
            });

            configService.getCurrentConfig().then(function(result) {
                expect(result).toEqual(true);
                expect(
                    JSON.stringify(configService.currentConfig) 
                    == JSON.stringify({ key: 'findMe'})).toEqual(true);
            });
            httpBackend.flush();
        });
        it('getCurrentConfig returns false on error', function() {
            httpBackend.whenGET("/config/api").respond(500, 'error'); 

            configService.getCurrentConfig().then(function(result) {
                expect(result).toEqual(false);
                expect(
                    JSON.stringify(configService.currentConfig) 
                    == JSON.stringify({})).toEqual(true);
            });
            httpBackend.flush();
        });
    });
});