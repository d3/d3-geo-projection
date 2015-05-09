GENERATED_FILES = \
	d3.geo.projection.js \
	d3.geo.projection.min.js \
	index.js \
	bower.json

all: $(GENERATED_FILES)

.PHONY: clean all test

test:
	npm test

d3.geo.projection.js: $(shell node_modules/.bin/smash --ignore-missing --list src/index.js) package.json
	rm -f $@
	node_modules/.bin/smash src/index.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	chmod a-w $@

d3.geo.projection.min.js: d3.geo.projection.js
	rm -f $@
	node_modules/.bin/uglifyjs $< -c -m -o $@

index.js: $(shell node_modules/.bin/smash --ignore-missing --list src/module.js) package.json
	rm -f $@
	node_modules/.bin/smash src/module.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	chmod a-w $@

bower.json: bin/bower package.json
	rm -f $@
	bin/bower > $@
	chmod a-w $@

clean:
	rm -f -- $(GENERATED_FILES)
