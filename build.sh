set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
#npm run build
# npm run test-prod

# REGISTRY=192.168.0.24:5000
REGISTRY=dslima
# image name
IMAGE=projeto-controle-chamados
docker build -t $REGISTRY/$IMAGE:latest .