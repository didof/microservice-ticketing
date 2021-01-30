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
