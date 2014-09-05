describe('myJmv filters', function() {
    beforeEach(module("myJmv.filters"));

    it('should return current version', inject(function(version) {
        expect(version).toEqual('0.1');
    }));

    it('has a onlyfieldsets filter', inject(function($filter) {
        expect($filter('onlyfieldsets')).not.toBeNull();
    }));

    describe('onlyfieldsets', function() {
        it('should convert object into array of only fieldsets', inject(function($filter) {
            var input = {
                a: {type: 'fieldset'},
                b: {type: 'fieldset'},
                c: {type: 'fieldset'},
                d: {type: 'button'}
            };

            var expectedResult = [
                {type: 'fieldset'},
                {type: 'fieldset'},
                {type: 'fieldset'}
            ];

            expect($filter('onlyfieldsets')(input)).toEqual(expectedResult);
        }));
   });
});
