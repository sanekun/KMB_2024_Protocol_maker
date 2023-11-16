# Cloning
PCR 부터 Transformation 까지 `Full-automation` 진행  
`Input Materials`
> Template[Vector, Insert]  
> Primer[Vector, Insert]  
> PCR master mix  
> Magnetic Bead  
> Assembly master mix[Gibson]  
> Competent Cell  
> Square plate

<details>

<summary>Flow Diagram</summary>

```mermaid
flowchart TB
    classDef Input stroke:#0f0

    subgraph Insert PCR
        A1[Template] --> PCR{PCR}
        B1[Primer] --> PCR{PCR}
    end
    subgraph Vector PCR
        A2[Template] --> PCR1{PCR}
        B2[Primer] --> PCR1{PCR}
    end

    subgraph PCR Purification
        PCR --> Insert
        PCR1 --> Vector
        Bead[Magnetic Bead]:::Input --> A
        Vector --> A{Purification}
        Insert --> A
    end

    subgraph Gibson
        A --> |Dilute & Pooling| B[Purified\nDNA]
        B --> D{Assembly}
        C[Gibson Mix]:::Input --> D
    end

    D .-> |Alram| TF{Transformation}
    CP[CP cell] .-> TF
    TF ==> F[Colony Plotting]
```

</details>

## Usage