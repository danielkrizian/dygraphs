# Run the generate-combined.sh script.
# This Makefile isn't really necessary, but it serves as a "indicator"
# to new users that they need to do a "build" of sorts.
#
# Dean Wampler <dean@deanwampler.com> March 22, 2010

all: test generate-combined generate-documentation

clean:
	@echo cleaning...
	@cp .dygraph-combined-clean.js dygraph-combined.js
	rm -f docs/options.html

generate-combined:
	@echo Generating dygraph-combined.js
	@./generate-combined.sh

generate-documentation:
	@echo Generating docs/options.html
	@./generate-documentation.py > docs/options.html
	@chmod a+r docs/options.html

github:
	@echo Deploy to GitHub pages
	@./push-to-gh.sh

gwt: generate-gwt

generate-gwt:
	@echo Generating GWT JAR file
	@./generate-jar.sh

test:
	@./test.sh

test-combined: move-combined test clean-combined-test

move-combined: generate-combined
	mv dygraph-combined.js dygraph-dev.js

clean-combined-test: clean
	@echo restoring combined
	git checkout dygraph-dev.js

lint:
	@./lint.sh

.PHONY: all clean generate-combined generate-documentation github gwt generate-gwt test test-combined move-combined clean-combined-test lint
