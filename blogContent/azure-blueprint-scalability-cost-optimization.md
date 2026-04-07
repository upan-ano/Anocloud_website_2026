Azure bills are painful in a specific way: they grow in the dark. Developers spin up VMs for a test that never gets torn down. Reserved capacity bought for a project that pivoted sits idle. By the time finance flags it, the damage is done. This blueprint is how we prevent that — and how we cut average Azure spend by 40% without touching a single workload.

| Metric | Value |
| :--- | :--- |
| **Avg Cost Reduction** | 40% |
| **Azure Regions** | 60+ |
| **AKS SLA** | 99.99% |
| **RI Savings vs PAYG** | 36% |

---

## The Azure Landing Zone: Foundation Before Everything

Every Azure engagement we do starts with landing zone review. If the foundation is wrong — management groups mis-scoped, no policy guardrails, RBAC too broad — the cost and security problems compound over time. You cannot bolt governance on later.

1. Management group hierarchy: Tenant Root to Platform to Landing Zones to Corp/Online/Sandbox
2. Azure Policy assignments at management group level — not per-subscription
3. Azure Blueprints for repeatable, compliant subscription vending
4. Defender for Cloud across all subscriptions from day one
5. Azure Monitor + Log Analytics workspace hierarchy mapped to your MG structure

---

## The Cost Optimisation Playbook

### Quick Wins (Week 1)

* Enable Azure Advisor and action all High impact Cost recommendations
* Tag everything — use Azure Policy to enforce tag inheritance
* Set budget alerts on every subscription (50%/80%/100%)
* Identify unattached disks and orphaned NICs (Azure Resource Graph query)
* Shut down dev/test VMs outside business hours (Azure Automation runbooks)

**💰 Fastest Win:** Orphaned resources (unattached disks, idle public IPs, abandoned load balancers) typically represent 8-15% of total Azure spend. A single Resource Graph query finds them all.

### Strategic Savings (Month 1-3)

| Strategy | Typical Saving | Best For |
| :--- | :--- | :--- |
| Reserved Instances (1yr) | 30-36% | Predictable baseline compute |
| Reserved Instances (3yr) | 50-60% | Long-term stable workloads |
| Spot VMs | 60-90% | Batch, dev/test, stateless |
| Azure Hybrid Benefit | 40-49% | Existing Windows/SQL licenses |
| Dev/Test pricing | ~40% | Non-prod environments |

---

## AKS: Getting Kubernetes Right on Azure

AKS is mature and production-ready, but the defaults leave money on the table. System node pools should be minimal. User node pools with Cluster Autoscaler scale from zero. Add a spot node pool for non-critical workloads and watch your compute bill drop 60%.

* KEDA for event-driven autoscaling — scale to zero on queues
* Azure CNI Overlay for better IP utilisation in large clusters
* Workload Identity for credential-free service-to-service auth
* AKS Cost Analysis add-on to attribute spend to namespace/deployment
* GitOps with Flux for cluster configuration drift detection

---

## Enterprise Integration: The Azure-Microsoft Moat

The real reason large enterprises choose Azure is not the technical specs — it is the Microsoft 365 integration, Active Directory Federation, existing EA agreements, and compliance certifications their legal team trusts. When you are already paying for E5, Azure SSO and Defender integration is genuinely additive, not aspirational.

> “Our security team went from spending 3 weeks reviewing Azure deployment proposals to 3 days, because Defender for Cloud spoke their language and our policies were encoded in Azure Policy. That time saving has compounding value.”
