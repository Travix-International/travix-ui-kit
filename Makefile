VERSION := patch
GITHUB_API_TOKEN := ""

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
	make publish-site

changelog:
	git checkout master
	git pull origin master
	github_changelog_generator -t $(GITHUB_API_TOKEN)

push-changelog:
	git checkout master
	git pull origin master
	git add CHANGELOG.md
	git commit -m 'changelog updated.'
	git push origin master

prepare-site:
	npm run styleguide-build
	rm -rf ./_site
	mkdir _site
	cp -r ./styleguide/ ./_site/
	cp ./dist/ui-bundle.css ./_site/build/ui-bundle.css
	sed -i.bak 's/\/ui\-bundle\.css/build\/ui\-bundle\.css/g' _site/index.html
	rm _site/index.html.bak
	cp .gitignore ./_site/.gitignore

publish-site-only:
	(cd ./_site && git init)
	(cd ./_site && git commit --allow-empty -m 'update site')
	(cd ./_site && git checkout -b gh-pages)
	(cd ./_site && touch .nojekyll)
	(cd ./_site && git add .)
	(cd ./_site && git commit -am 'update site')
	(cd ./_site && git push git@github.com:Travix-International/travix-ui-kit.git gh-pages --force)

publish-site:
	make prepare-site
	make publish-site-only
