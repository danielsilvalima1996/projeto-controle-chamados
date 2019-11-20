set -ex

# SET THE FOLLOWING VARIABLES
# docker hub username
# REGISTRY=192.168.0.24:5000
REGISTRY=dslima
# image name
IMAGE=projeto-controle-chamados

# ensure we're up to date
git pull
# bump version
docker run --rm -v /"$PWD"/src/assets:/app treeder/bump patch
version=`cat src/assets/VERSION`
echo "version: $version"

# run build
./build.sh

# tag it
git add -A
git commit -m "version $version"
git tag -a "$version" -m "version $version"
git push
git push --tags
docker tag $REGISTRY/$IMAGE:latest $REGISTRY/$IMAGE:$version

# push it
docker push $REGISTRY/$IMAGE:latest
docker push $REGISTRY/$IMAGE:$version