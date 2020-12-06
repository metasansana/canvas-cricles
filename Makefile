BROWSERIFY=./node_modules/.bin/browserify
UGLIFYJS=./node_modules/.bin/uglifyjs
TSC=./node_modules/.bin/tsc
LESSC=./node_modules/.bin/lessc
CLEANCSSS=./node_modules/.bin/cleancss

./: docs
	touch $@

docs: docs/assets/js/app.js docs/assets/css/app.css
	touch $@

docs/assets/js/app.js: lib
	mkdir -p docs/assets/js || true
	$(BROWSERIFY) lib/main.js $(if $(findstring yes,$(DEBUG)),,|$(UGLIFYJS))\
	> $@

docs/assets/css/app.css: $(shell find src -name \*.less)
	mkdir -p docs/assets/css || true
	$(LESSC) src/main.less | $(CLEANCSSS) > $@

lib: $(shell find src -name \*.ts)
	@rm -R $@ || true
	cp -R src $@
	$(TSC) -p $@

.PHONY: clean
clean:
	@rm -R ./lib ./docs/assets/js ./docs/assets/css || true
