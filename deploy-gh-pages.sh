npm run ghp-build
git push origin --delete gh-pages
git add dist -f
git commit -m "build gh pages adicionado dist"
git subtree push --prefix dist origin gh-pages