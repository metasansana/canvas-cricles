BROWSERIFY=./node_modules/.bin/browserify
UGLIFYJS=./node_modules/.bin/uglifyjs
TSC=./node_modules/.bin/tsc
LESSC=./node_modules/.bin/lessc
CLEANCSSS=./node_modules/.bin/cleancss

./: public
	touch $@

public: public/assets/js/app.js public/assets/css/app.css
	touch $@

public/assets/js/app.js: lib
	mkdir -p public/assets/js || true
	$(BROWSERIFY) lib/main.js $(if $(findstring yes,$(DEBUG)),,|$(UGLIFYJS))\
	> $@

public/assets/css/app.css: $(shell find src -name \*.less)
	mkdir -p public/assets/css || true
	$(LESSC) src/main.less | $(CLEANCSSS) > $@

lib: $(shell find src -name \*.ts)
	@rm -R $@ || true
	cp -R src $@
	$(TSC) -p $@

.PHONY: clean
clean:
	@rm -R ./lib ./public/assets/js ./public/assets/css || true
