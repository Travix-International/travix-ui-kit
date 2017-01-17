VERSION := patch

release:
	echo "Releasing version: $(VERSION)"
	git checkout master
	git pull origin master
	npm run lint
	npm run test
	npm run transpile
	npm version $(VERSION)
	npm publish
	git push --follow-tags