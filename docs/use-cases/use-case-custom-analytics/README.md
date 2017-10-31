# Use Case - Custom Analytics UI

**WORK IN PROGRESS**

## Background

A company is opening a medical data portal. This portal proposes some advanced analysis capabilities on drugs/treatment/reactions. It targets the world-wide population of doctors and works with an annual subscription. Even if the audience is more or less predictable, some seasonal or sudden epidemic events can affect the traffic. With the auto-medication trend, the company also plan to open this service to the public.

## Business Requirements

* The portal should be able to serve peak traffic of around 10.000 simultaneous connections with an average of 500 on the given data model.
* The portal should run with minimal downtime, rolling updates of the web application should be possible without any downtime.


## Technical Requirements

* The company is already using Docker and Docker Swarm Mode in complementary backend system of this portal.
* AWS is the preferred cloud provider, although the implementation should allow to move to another cloud provider (e.g. DigitalOcean) or to and on-prem deployment with minimal efforts.
* The implementation should meet industry best practices in terms of being able to monitor the system.

## Functional Requirements

* As a dev-ops I want to provision and run docker nodes hosting the portal so that I can support peak traffic around 10.000 simultaneous connections and an average of 500 on the given data model.
* As a dev-ops I want to be able to update my system without interruption of the service.
* As an end-user I want to be able to use a UI tailored for my needs so I can quickly find the insights I need.
* As an end-user I want to be able to stay logged in so that I can access the portal conveniently.

## Assumptions

* Initially, all users need to be logged in to use the portal.
* The scaling will be done manually with the help of scripts and will depend on the anticipated traffic.
* The data set (no dynamic data reduction) is the same for every end-user.
* The data reload is usually every quarter when FDA releases them.
* A subscription model won't be implemented (rely on authentication permissions only).


## Data

This use case is characterized by a [single qvf](./fda-drug-cases.qvf) with the following data model:

![Data model](./data-model.png)

## UI

The main benefit for doctors is to be able to narrow analysis based on advanced collection of demographic criteria (gender, weight, origin etc.).

The web application presents information in four main tabs focusing on:

* filters
* prescription viz/table
* side effects/reactions viz/table
* report

(There will be multiple objects on each single page)

![Portal UI](./portal-ui.png)

## Detailed Functional Requirements

### Scaling

- While it is a basic assumption of this use-case, that scaling is done manually, I'd like to know as a developer where I could hook into the APIs to create my custom, fully automated scaling strategy.

### Monitoring

- As a dev-ops I want to be able to monitor the system and find potential issues.
- As a dev-ops I want to be able to monitor all log-files from all services/containers.
- As a dev-ops I want to be able to analyze the number of page-hits/sessions over time.
- As a dev-ops I want to be able to get typical web-page KPIs out of the system (page-hits, sessions, up-time, down-time, reliability, etc.)
- As a dev-ops I want to be able to get some information from the monitoring-system about the whether I should scale up/down the system (based on the assumption mentioned above that scaling is done manually)
- As a dev-ops I want to be able to see how the QiX Engine containers are behaving, including getting detailed log-files and error-messages

### Testing

- As a dev-ops I expect basic e2e tests
- As a dev-ops I expect stress-tests to find out the limits of the given setup (machines & number of distributed services)
    - Max requests/hits handled per sec
    - Failure rate / Errors per second
    - Avg/Min/Max response time
    - Latency
    - Number of users handled by the system
    - See e.g. [this article](https://www.blazemeter.com/blog/understanding-your-reports-part-2-kpi-correlations?utm_source=Blog&utm_medium=BM_Blog&utm_campaign=kpis-part1) for more examples
- When using the stress-tests mentioned above, I - as a dev-ops - expect to be able to configure key-settings, which drive the behavior of the stress-test
    - Number of concurrent users
    - Activity pattern of users (just watching, heavily making selections, etc.)

## System Design

_NOTE: The design documentation is work in progress. More information will be added on a regular basis._

This use case is about scaling the QIX Engine in a configuration of
- One document
- Multiple users

Scaling up engines needs to be done only to reduce load as a consequence of multiple users access the system simultaneously. All engine instances are equivalent and there is no need to have a certain engine service a certain user since all users access the same single document.

More information here

[QIX Engine Session Management](./system-design/session-management.md)
