set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
# npm run build
# npm run test-prod

REGISTRY=192.168.0.30:5000
# image name
IMAGE=projeto-controle-chamados
docker build -t $REGISTRY/$IMAGE:latest .