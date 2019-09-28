sudo file /lib/systemd/system/docker.service
sudo file /lib/systemd/system/docker.socket

sudo systemctl unmask docker.service
sudo systemctl unmask docker.socket
sudo systemctl start docker.service
sudo systemctl status docker
