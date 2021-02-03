# Testing NATS Streaming Server

## State

Both nats-depl and nats-srv up and running.
Port forwarding of the pod, specifying the ports. [1]
Publisher and listener server running.

[1]
In order to test a deployed nats server (associated to a service that exposes it) it's possible to forward the port with
the command `kubectl port-forward [pod-name] [port-local-machine]:[port-nats-exposed]` and leave it running until needed.
