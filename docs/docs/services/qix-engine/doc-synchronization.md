# Document Synchronization

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution
    since this feature may change in the future.

## Description

For sharing documents between multiple instances the Qlik Associative Engine uses a message broker called [RabbitMQ](https://www.rabbitmq.com/).
With this feature the Qlik Associative Engine instances running in a cluster, regardless of orchestration,
will assume that the cluster uses a shared persistence layer.
What type of shared persistence volume that should be used is configurable by the end-user,
as long as the volume is based on a block file system.
The Qlik Associative Engines subscribes and publishes events to the message broker which propagates change
events to other instances.

## Configuration

To configure a Qlik Associative Engine to use a `RabbitMQ` broker you will need to pass additional startup parameters.
As shown in the example below this configuration is also dependent on `ABAC` being enabled and a set of rules are defined.
Further information regarding access control in Qlik Associative Engine can be found [here](access-control.md).

```bash
docker run
    -v <host rules folder>:<container rules folder>
    -v <host document folder>:<container document folder>
    qlikea/engine:<version> \
    -S EnableABAC=1 \
    -S SystemAllowRulePath=/<container rules folder>/allow.txt \
    -S SystemDenyRulePath=/<container rules folder>/deny.txt \
    -S DocumentDirectory=<container document folder> \
    -S Gen3=1 \
    -S PersistenceMode=3 \
    -S RabbitHost=rabbitmq:5672 \
    -S UseEventBus=1
```

If this feature is enabled the Qlik Associative Engine will assume that there is a `RabbitMQ` message broker
available on the address specified by the `RabbitHost` parameter.

In the configuration example above we are mounting a folder `-v <host document folder>:<container document folder>`,
which is also passed in as `DocumentDirectory`.
This is the folder which the Qlik Associative Engine container will use for storing documents,
and the mounted folder can then be shared with other Qlik Associative Engine instances.

## Example

To show how two Qlik Associative Engine instances are sharing the same document using the message broker,
we have implemented a basic example in `Kubernetes` using `Persisted Volumes`.
You can find the example [here](https://github.com/qlik-ea/example-doc-sync).
