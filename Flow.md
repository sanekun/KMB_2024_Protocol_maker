# Information Flow

``` mermaid
flowchart TB

A("Users") --> B["Labnote"]
B --> C("Protocol Maker")
A --> C
C --> OT2

subgraph OT2
  direction TB
  A1["Cloning"] -- A2["Dependency"]
  A2 --> C

OT2 --> D("Protocol")
```
