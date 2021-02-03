### necessary

add the following line to the bottom of `/etc/host`:
`[minikube_ip] [host_name]`

where **minikube_ip** it's retrieved from `minikube ip`
whilst **host_name** it's specified in `ingress-srv.yaml`

### adding secret to k8s cluster

create:
`kubectl create secret generic [NAME] --from-inline=[KEY]=[VALUE]`

log:
`kubectl get secrets`

---

### NATS Straming Server

Find documentaion over [docs.nats.io](https://docs.nats.io/)
The official Dockerimage is [nats-streaming](https://hub.docker.com/_/nats-streaming)
On the microservice use [node-nats-streaming](https://www.npmjs.com/package/node-nats-streaming) to communicate with NATS Streaming Server
