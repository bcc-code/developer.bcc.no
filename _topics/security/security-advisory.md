---
title: Security Advisory
---

# Github security advisory usage
### What is Github Security Advisory
Security advisories are a way to report and fix security issues in a private manner. They offer the advantage of allowing private discussions and colaboration in private branches even on public repositories, and a convenient way to overview the current status. The full documentation is available [here](https://docs.github.com/en/code-security).

### Creating the security advisory
Any user with at least write permission ([reference](https://docs.github.com/en/code-security/security-advisories/permission-levels-for-security-advisories)) for a specific repo can create a security advisory for it. This is how you create one:
![Create security advisory](/assets/create-advisory.png)

#### Then you fill the form as such:<br>
**Ecosystem:** Choose the appropriate option if it's a package (like [feathers-arangodb](https://github.com/bcc-code/feathers-arangodb) which is a npm package) or Other if is's a custom solution (like [bcc-pay](https://github.com/bcc-code/bcc-pay)) and in the next field put **BCC Solutions**<br>
**Package name:** Name of repo<br>
**Affected versions:** The version(s) affected by vulnerability if available (some repos don't have version control)<br>
**Patched versions:** This should be filled after the vulnerability is patched if the repo has version control<br>
<br>
**Severity:** Fill preferably with *Assess severity using CVSS*<br>
**CWE:** Add it only if you know what to add.<br>
**CVE identifier:** Let default (*Request CVE ID later*) as we won't use CVE IDs for now as we won't publish the advisories except a few ones.<br>
**Title:** Very short vulnerability description<br>
**Description:** Use the template<br>
```markdown
### Description
(What is the issue and what impact does it have?)

### Explanation
(Detailed description, reference to the vulnerable code and why it's vulnerable.)

### Proof of concept
(How to exploit this vulnerability)
```
And then press *Create draft security advisory*.

### Solving the security issue
In order to patch a security advisory you need to add collaborators. Those can be users from the team that's managing the repo in question. **Only users that have admin privileges can add colaborators.** After a user is added as a collaborator, it gains write permision over the security advisory so he can discuss there, edit the advisory and create a temporary private fork and colaborate in it.<br><br>
An admin privileged user is then supposed to merge the pull request. 
It's also worth noting that **"You cannot merge individual pull requests in a temporary private fork. Instead, you merge all open pull requests at once, in the corresponding security advisory."** 

### Tracking progress
Security advisories can be tracked in a project board by adding a card with a link to it. Currently they are not fully supported so that's the best option I'm thinking of now to integrate them in a project board.<br>
The overall progrss and status of security advisories is available to admin privileged users like this: Organisation level overview for organisation owners and team level for team administrators.

### Marking the vulnerability as done
After the patch is verified and merged, an admin privileged user should close that security advisory.<br>
We don't currently plan to publish security advisories so please be carefull here as **the only way to delete a publised one is to contact Github Support**.<br><br>
For vulerabilities that we decide to publish (maybe for public npm packages that we develop) we should also fill the **Credits** field with the names of the people that helped solving (or reported) the vulnerability, but not if they work for BCC.
