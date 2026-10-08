# 03 — Networking, Services and Listener

[← Oracle Database](../README.md)

## Connection path

~~~mermaid
flowchart LR
  APP[Client / App] --> NAME[Connect Identifier]
  NAME --> LISTENER[Listener]
  LISTENER --> SERVICE[Database Service]
  SERVICE --> DB[Instance / PDB]
~~~

When a client cannot connect, separate:

1. name resolution,
2. network reachability,
3. listener availability,
4. service registration,
5. database/PDB state,
6. authentication/authorization.

## Core topics

Mapped from lessons 7–11:

- Oracle Net Services,
- Easy Connect / Local Naming / Directory Naming,
- listener administration,
- dynamic vs static service registration,
- dedicated vs shared server,
- Oracle Connection Manager,
- multiplexing/access control.

## Troubleshooting principle

Do not treat every connection error as “listener down”.

A listener can be up while the service is unregistered, the PDB is closed, the descriptor points to the wrong service, or process/session capacity is exhausted.

## Source mapping

Oracle University lessons 7–11.
