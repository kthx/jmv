describe('IndexCtrl', function() {
    var scope, httpBackend, createController;

    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('IndexCtrl', {
                '$scope': scope
            });
        };
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('runs without errors', function() {
        var controller = createController();

        httpBackend.expect('GET', '/')
            .respond(200, "ok");
        scope.$digest();
        httpBackend.flush();

        expect(scope.alerts).toEqual([]);
        expect(scope.title).toEqual('JMV');
    });
});

describe('ConfigCtrl', function() {
    var scope, createController;
    
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();

        createController = function() {
            return $controller('ConfigCtrl', {
                '$scope': scope
            });
        };
    }));


    it('runs without errors', function() {
        var controller = createController();
        scope.$digest();
        expect(scope.alerts).toEqual([]);
    });
});

describe('ConfigFormCtrl', function() {
    var scope, httpBackend, createController;
    beforeEach(module('myJmv.services'));
    beforeEach(inject(function(_$q_){
        $q = _$q_;
    }));

    var configServiceMock = {
          getCurrentConfig:  function (forceReload) {
            var deferred = $q.defer();
            var self = this; 
            deferred.resolve(true);
            return deferred.promise;


          },
          currentConfig: {"module":{"$":{"name":"Checker"},"module":[{"$":{"name":"TreeWalker"},"module":[{"$":{"name":"CyclomaticComplexity"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"cyclomaticcomplexitychecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Checks cyclomatic complexity against a specified limit. The complexity is measured by the number of if, while, do, for, ?:, catch, switch, case statements, and operators && and || (plus one) in the body of a constructor, method, static initializer, or instance initializer. It is a measure of the minimum number of possible paths through the source and therefore the number of required tests. Generally 1-4 is considered good, 5-7 ok, 8-10 consider re-factoring, and 11+ re-factor now!\n                "}},{"$":{"name":"com.jmv.title","value":"CyclomaticComplexity check"}}],"property":[{"$":{"name":"severity","value":"warning"}},{"$":{"name":"max","value":"5"}}]},{"$":{"name":"BooleanExpressionComplexity"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"booleanexpressioncomplexitychecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Restrict the number of number of &&, ||, &, | and ^ in an expression.\n                Rationale: Too many conditions leads to code that is difficult to read and hence debug and maintain.\n                Note that the operators & and | are not only integer bitwise operators, they are also the non-shortcut versions of the boolean operators && and ||.\n                "}},{"$":{"name":"com.jmv.title","value":"BooleanExpressionComplexity check"}}],"property":[{"$":{"name":"severity","value":"warning"}},{"$":{"name":"max","value":"4"}},{"$":{"name":"tokens","value":"LAND, BAND, LOR, BOR, BXOR"}}]},{"$":{"name":"ClassDataAbstractionCoupling"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"classdataabstractioncouplingchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                This metric measures the number of instantiations of other classes within the given class. This type of coupling is not caused by inheritance or the object oriented paradigm. Generally speaking, any abstract data type with other abstract data types as members has data abstraction coupling; therefore, if a class has a local variable that is an instantiation (object) of another class, there is data abstraction coupling. The higher the DAC, the more complex the data structure (classes) of the system.\n                "}},{"$":{"name":"com.jmv.title","value":"ClassDataAbstractionCoupling check"}}],"property":[{"$":{"name":"severity","value":"warning"}},{"$":{"name":"max","value":"7"}}]},{"$":{"name":"ClassFanOutComplexity"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"classfanoutcomplexitychecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                The number of other classes a given class relies on. Also the square of this has been shown to indicate the amount of maintenance required in functional programs (on a file basis) at least.\n                "}},{"$":{"name":"com.jmv.title","value":"ClassFanOutComplexity check"}}],"property":[{"$":{"name":"severity","value":"warning"}},{"$":{"name":"max","value":"20"}}]},{"$":{"name":"NPathComplexity"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"npathcomplexitychecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                The NPATH metric computes the number of possible execution paths through a function. It takes into account the nesting of conditional statements and multi-part boolean expressions (e.g., A && B, C || D, etc.).\n                Rationale: Nejmeh says that his group had an informal NPATH limit of 200 on individual routines; functions that exceeded this value were candidates for further decomposition - or at least a closer look.\n                "}},{"$":{"name":"com.jmv.title","value":"NPathComplexity check"}}],"property":[{"$":{"name":"severity","value":"warning"}},{"$":{"name":"max","value":"200"}}]},{"$":{"name":"JavaNCSS"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"javancsschecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Determines complexity of methods, classes and files by counting the Non Commenting Source Statements (NCSS). This check adheres to the specification for the JavaNCSS-Tool written by Chr. Clemens Lee.\n                Rougly said the NCSS metric is calculated by counting the source lines which are not comments, (nearly) equivalent to counting the semicolons and opening curly braces.\n                The NCSS for a class is summarized from the NCSS of all its methods, the NCSS of its nested classes and the number of member variable declarations.\n                The NCSS for a file is summarized from the ncss of all its top level classes, the number of imports and the package declaration.\n\n                Rationale: Too large methods and classes are hard to read and costly to maintain. A large NCSS number often means that a method or class has too many responsibilities and/or functionalities which should be decomposed into smaller units.\n                "}},{"$":{"name":"com.jmv.title","value":"JavaNCSS check"}}],"property":[{"$":{"name":"severity","value":"error"}},{"$":{"name":"methodMaximum","value":"50"}},{"$":{"name":"classMaximum","value":"1500"}},{"$":{"name":"fileMaximum","value":"2000"}}]},{"$":{"name":"RedundantImport"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"redundantimportchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Checks for redundant import statements. An import statement is considered redundant if:\n                It is a duplicate of another import. This is, when a class is imported more than once.\n                The class imported is from the java.lang package, e.g. importing java.lang.String.\n                The class imported is from the same package.\n                "}},{"$":{"name":"com.jmv.title","value":"RedundantImport check"}}],"property":[{"$":{"name":"severity","value":"error"}}]},{"$":{"name":"ImportOrder"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"importorderchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Checks the ordering/grouping of imports. Features are:\n                groups imports: ensures that groups of imports come in a specific order (e.g., java. comes first, javax. comes second, then everything else)\n                adds a separation between groups : ensures that a blank line sit between each group\n                sorts imports inside each group: ensures that imports within each group are in lexicographic order\n                sorts according to case: ensures that the comparison between imports is case sensitive\n                groups static imports: ensures the relative order between regular imports and static imports\n                "}},{"$":{"name":"com.jmv.title","value":"ImportOrder check"}}],"property":[{"$":{"name":"severity","value":"warning"}},{"$":{"name":"groups","value":"com.google,android,junit,net,org,java,javax"}},{"$":{"name":"option","value":"top"}}]},{"$":{"name":"JavadocMethod"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"javadocmethodchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Checks the Javadoc of a method or constructor. By default, does not check for unused throws. To allow documented java.lang.RuntimeExceptions that are not declared, set property allowUndeclaredRTE to true. The scope to verify is specified using the Scope class and defaults to Scope.PRIVATE. To verify another scope, set property scope to a different scope.\n\n                Error messages about parameters and type parameters for which no param tags are present can be suppressed by defining property allowMissingParamTags. Error messages about exceptions which are declared to be thrown, but for which no throws tag is present can be suppressed by defining property allowMissingThrowsTags. Error messages about methods which return non-void but for which no return tag is present can be suppressed by defining property allowMissingReturnTag.\n\n                Javadoc is not required on a method that is tagged with the @Override annotation. However under Java 5 it is not possible to mark a method required for an interface (this was corrected under Java 6). Hence Checkstyle supports using the convention of using a single {@inheritDoc} tag instead of all the other tags.\n\n                Note that only inheritable items will allow the {@inheritDoc} tag to be used in place of comments. Static methods at all visibilities, private non-static methods and constructors are not inheritable.\n\n                For example, if the following method is implementing a method required by an interface, then the Javadoc could be done as:\n<pre>\n/** {@inheritDoc} */\npublic int checkReturnTag(final int aTagIndex,\n                          JavadocTag[] aTags,\n                          int aLineNo)\n</pre>\n                The classpath may need to be configured to locate the class information. The classpath configuration is dependent on the mechanism used to invoke Checkstyle.\n                "}},{"$":{"name":"com.jmv.title","value":"JavadocMethod check"}}],"property":[{"$":{"name":"scope","value":"protected"}},{"$":{"name":"severity","value":"warning"}},{"$":{"name":"allowMissingJavadoc","value":"true"}},{"$":{"name":"allowMissingParamTags","value":"true"}},{"$":{"name":"allowMissingReturnTag","value":"true"}},{"$":{"name":"allowMissingThrowsTags","value":"true"}},{"$":{"name":"allowThrowsTagsForSubclasses","value":"true"}},{"$":{"name":"allowUndeclaredRTE","value":"true"}}]},{"$":{"name":"JavadocType"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"javadoctypechecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Checks Javadoc comments for class and interface definitions. By default, does not check for author or version tags. The scope to verify is specified using the Scope class and defaults to Scope.PRIVATE. To verify another scope, set property scope to one of the Scope constants. To define the format for an author tag or a version tag, set property authorFormat or versionFormat respectively to a regular expression.\n                "}},{"$":{"name":"com.jmv.title","value":"JavadocType check"}}],"property":[{"$":{"name":"scope","value":"protected"}},{"$":{"name":"severity","value":"error"}}]},{"$":{"name":"JavadocStyle"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"javadocstylechecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Validates Javadoc comments to help ensure they are well formed. The following checks are performed:\n\n                Ensures the first sentence ends with proper punctuation (That is a period, question mark, or exclamation mark, by default). Javadoc automatically places the first sentence in the method summary table and index. With out proper punctuation the Javadoc may be malformed. All items eligible for the {@inheritDoc} tag are exempt from this requirement.\n                Check text for Javadoc statements that do not have any description. This includes both completely empty Javadoc, and Javadoc with only tags such as @param and @return.\n                Check text for incomplete HTML tags. Verifies that HTML tags have corresponding end tags and issues an 'Unclosed HTML tag found:' error if not. An 'Extra HTML tag found:' error is issued if an end tag is found without a previous open tag.\n                Check that a package Javadoc comment is well-formed (as described above) and NOT missing from any package-info.java files.\n                Check for allowed HTML tags. The list of allowed HTML tags is 'a', 'abbr', 'acronym', 'address', 'area', 'b', 'bdo', 'big', 'blockquote', 'br', 'caption', 'cite', 'code', 'colgroup', 'del', 'div', 'dfn', 'dl', 'em', 'fieldset', 'h1' to 'h6', 'hr', 'i', 'img', 'ins', 'kbd', 'li', 'ol', 'p', 'pre', 'q', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thread', 'tr', 'tt', 'ul'.\n                "}},{"$":{"name":"com.jmv.title","value":"JavadocStyle check"}}],"property":[{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"PackageName"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"packagenamechecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Checks wether the package name fits with the supplied regex\n                "}},{"$":{"name":"com.jmv.title","value":"PackageName check"}}],"property":[{"$":{"name":"format","value":"^[a-z]+(\\.[a-z][a-z0-9]{1,})*$"}},{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"TypeNameCheck"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"typenamecheckchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Validates classes and interfaces against the \"^[A-Z][a-zA-Z0-9]*$\". regex\n                "}},{"$":{"name":"com.jmv.title","value":"TypeNameCheck check"}},{"$":{"name":"altname","value":"TypeName"}}],"property":[{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"ConstantNameCheck"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"constantnamecheckchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Validates non-private, static, final fields against the supplied public/package final fields.\n                "}},{"$":{"name":"com.jmv.title","value":"ConstantNameCheck check"}},{"$":{"name":"altname","value":"ConstantName"}}],"property":[{"$":{"name":"applyToPublic","value":"true"}},{"$":{"name":"applyToProtected","value":"true"}},{"$":{"name":"applyToPackage","value":"true"}},{"$":{"name":"applyToPrivate","value":"false"}},{"$":{"name":"format","value":"^([A-Z][A-Z0-9]*(_[A-Z0-9]+)*|FLAG_.*)$"}},{"$":{"name":"severity","value":"warning"}}],"message":[{"$":{"key":"name.invalidPattern","value":"Variable ''{0}'' should be in ALL_CAPS (if it is a constant) or be private (otherwise)."}}]},{"$":{"name":"StaticVariableNameCheck"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"staticvariablenamecheckchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Validates static, non-final fields against the supplied expression\n                "}},{"$":{"name":"com.jmv.title","value":"StaticVariableNameCheck check"}},{"$":{"name":"altname","value":"StaticVariableName"}}],"property":[{"$":{"name":"applyToPublic","value":"true"}},{"$":{"name":"applyToProtected","value":"true"}},{"$":{"name":"applyToPackage","value":"true"}},{"$":{"name":"applyToPrivate","value":"true"}},{"$":{"name":"format","value":"^[a-z][a-zA-Z0-9]*_?$"}},{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"MemberNameCheck"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"membernamecheckchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n                Validates non-static members against the supplied expression.\n                "}},{"$":{"name":"com.jmv.title","value":"MemberNameCheck check"}},{"$":{"name":"altname","value":"MemberName"}}],"property":[{"$":{"name":"applyToPublic","value":"true"}},{"$":{"name":"applyToProtected","value":"true"}},{"$":{"name":"applyToPackage","value":"true"}},{"$":{"name":"applyToPrivate","value":"true"}},{"$":{"name":"format","value":"^[a-z][a-zA-Z0-9]*$"}},{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"MethodNameCheck"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"methodnamecheckchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n               Validates identifiers for method names.\n                "}},{"$":{"name":"com.jmv.title","value":"MethodNameCheck check"}},{"$":{"name":"altname","value":"MethodName"}}],"property":[{"$":{"name":"format","value":"^[a-z][a-zA-Z0-9]*(_[a-zA-Z0-9]+)*$"}},{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"ParameterName"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"parameternamechecker"}},{"$":{"name":"com.jmv.helptext","value":"\n               Validates identifiers for method parameters against the expression \"^[a-z][a-zA-Z0-9]*$\".\n                "}},{"$":{"name":"com.jmv.title","value":"ParameterName check"}}],"property":[{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"LocalFinalVariableName"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"localfinalvariablenamechecker"}},{"$":{"name":"com.jmv.helptext","value":"\n               Validates identifiers for local final variables against the expression \"^[a-z][a-zA-Z0-9]*$\".\n                "}},{"$":{"name":"com.jmv.title","value":"LocalFinalVariableName check"}}],"property":[{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"LocalVariableName"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"localvariablenamechecker"}},{"$":{"name":"com.jmv.helptext","value":"\n               Validates identifiers for local variables against the expression \"^[a-z][a-zA-Z0-9]*$\".\n                "}},{"$":{"name":"com.jmv.title","value":"LocalVariableName check"}}],"property":[{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"LineLength"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"linelengthchecker"}},{"$":{"name":"com.jmv.helptext","value":"\n               Checks if a line is too long.\n               The default ignore pattern exempts the following elements:\n                  - import statements\n                  - long URLs inside comments\n                "}},{"$":{"name":"com.jmv.title","value":"LineLength check"}}],"property":[{"$":{"name":"max","value":"100","default":"100"}},{"$":{"name":"severity","value":"error"}},{"$":{"name":"ignorePattern","value":"^(package .*;\\s*)|(import .*;\\s*)|( *\\* *https?://.*)$","default":"^(package .*;\\s*)|(import .*;\\s*)|( *\\* *https?://.*)$"}}]},{"$":{"name":"LeftCurly"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"leftcurlychecker"}},{"$":{"name":"com.jmv.title","value":"LeftCurly check"}},{"$":{"name":"com.jmv.helptext","value":"\n               Checks for placement of the left curly brace (\"{\")\n                "}}],"property":[{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"RightCurly"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"rightcurlychecker"}},{"$":{"name":"com.jmv.title","value":"RightCurly check"}},{"$":{"name":"com.jmv.helptext","value":"\n               Checks right curlies on CATCH, ELSE, and TRY blocks are on\n      the same line. e.g., the following example is fine:\n      <pre>\n        if {\n          ...\n        } else</pre>\n      This next example is not fine:\n      <pre>\n        if {\n          ...\n        }\n        else</pre>\n                "}}],"property":[{"$":{"name":"option","value":"same"}},{"$":{"name":"severity","value":"warning"}}]}]},{"$":{"name":"RegexpSingleline"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"copyrightchecker"}},{"$":{"name":"com.jmv.title","value":"Copyright check"}},{"$":{"name":"com.jmv.helptext","value":"\n  Requires a copyright notice in each file.\n  Code intended to be open-sourced may have a multi-line copyright\n  notice, so that this required text appears on the second line:\n  <pre>\n/*\n* Copyright 20XX Company name.\n*\n* (details of open-source license...)\n*/</pre>"}}],"property":[{"$":{"name":"format","value":"^(//| \\*) Copyright (\\([cC]\\) )?[\\d]{4}(\\-[\\d]{4})? (Company name\\.).*$"}},{"$":{"name":"minimum","value":"1"}},{"$":{"name":"maximum","value":"10"}},{"$":{"name":"message","value":"Copyright is missing or malformed."}},{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"FileTabCharacter"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"tabchecker"}},{"$":{"name":"com.jmv.helptext","value":"Checks that there are no tab characters in the file"}},{"$":{"name":"com.jmv.title","value":"Tab check"}}],"property":[{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"NewlineAtEndOfFile"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"newlineatendoffilechecker"}},{"$":{"name":"com.jmv.helptext","value":"Checks whether files end with a new line. Rationale: Any source files and text files in general should end with a newline character, especially when using SCM systems such as CVS. CVS will even print a warning when it encounters a file that doesn't end with a newline."}},{"$":{"name":"com.jmv.title","value":"NewlineAtEndOfFile check"}}],"property":[{"$":{"name":"lineSeparator","value":"system"}},{"$":{"name":"fileExtensions","value":"java"}},{"$":{"name":"severity","value":"warning"}}]},{"$":{"name":"RegexpSingleline"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"nofixmechecker"}},{"$":{"name":"com.jmv.title","value":"No Fixme check"}},{"$":{"name":"com.jmv.helptext","value":"Checks that FIXME is not used in comments.  TODO is preferred."}}],"property":[{"$":{"name":"format","value":"((//.*)|(\\*.*))FIXME"}},{"$":{"name":"message","value":"TODO is preferred to FIXME.  e.g. \"TODO(johndoe): Refactor when v2 is released.\""}}]},{"$":{"name":"RegexpSingleline"},"metadata":[{"$":{"name":"com.jmv.identifier","value":"todonamedchecker"}},{"$":{"name":"com.jmv.title","value":"Todos named check"}},{"$":{"name":"com.jmv.helptext","value":"Checks that TODOs are named.  (Actually, just that they are followed by an open paren."}}],"property":[{"$":{"name":"format","value":"((//.*)|(\\*.*))TODO[^(]"}},{"$":{"name":"message","value":"All TODOs should be named.  e.g. \"TODO(johndoe): Refactor when v2 is released.\""}}]}]}}
      };
    
    var $anchorScroll = jasmine.createSpy('anchorScroll');

    beforeEach(inject(function($rootScope, $httpBackend, $controller, configService, $anchorScroll) {
        anchorScroll = $anchorScroll;
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        configService = configServiceMock;
        createController = function() {
            return $controller('ConfigFormCtrl', {
                '$scope': scope,
                'configService': configServiceMock
            });
        };
    }));


    it('it generates a form obj, a model, and schema without error', function() {
        var controller = createController();
        scope.$digest();
        expect(scope.form.length).toEqual(30);
        expect(Object.keys(scope.model).length).toEqual(75);
        expect(Object.keys(scope.schema).length).toEqual(2);
    });
});

describe('HeaderCtrl', function() {
    beforeEach(module('myJmv.services'));
    var scope, createController;
    
    var lastResultServiceMock = {
        resultName: 'test',
        getLastResult: function() {
            return 'test';
        },

        setLastResult: function(name) {
            resultName = name;
        }
    }

    beforeEach(inject(function($rootScope, $controller, $location, lastResultService) {
        
        scope = $rootScope.$new();
        lastResultService = lastResultServiceMock
        createController = function() {
            return $controller('HeaderCtrl', {
                '$scope': scope,
                'lastResultService' : lastResultService
            });
        };
    }));


    it('runs without errors', function() {
        var controller = createController();
        scope.$digest();
        expect(scope.resultPath()).toEqual("test");
    });
});

describe('UploadCtrl', function() {
    beforeEach(module('myJmv.services'));
    beforeEach(module('angularFileUpload'));
    var scope, createController;
    
    var lastResultServiceMock = {
        resultName: 'test',
        getLastResult: function() {
            return 'test';
        },
        setLastResult: function(name) {
        }
    }

    beforeEach(inject(function($rootScope, $controller,$upload, $location, lastResultService) {  
        scope = $rootScope.$new();
        lastResultService = lastResultServiceMock
        createController = function() {
            return $controller('UploadCtrl', {
                '$scope': scope,
                'lastResultService' : lastResultService
            });
        };
    }));


    it('runs without errors', function() {
        var controller = createController();
        scope.$digest();

        expect(scope.$parent.alerts).toEqual([]);
    });
});