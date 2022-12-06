---
title:
description:
---

Before you write, please be familiar with description of [ADL](https://bcc-code.github.io/docs/ADL/)
 # Context 
 - architectural drivers, business cases
 
 Reng: I support a document database since I don't think referential integrity is a big issue here (some of the things we modelled can be nested objects, which then takes care of this integrity). However, if there is a good case for SQL, that's fine too. With regard to hosting, preferably something main stream that can be purchased / managed via the big cloud providers. When modelling data make sure that only things that really are part of the object are nested there (e.g. a relationship probably shouldn't be nested since it is shared by two objects -- unless it was duplicated).
 
 # Decision 
 - the choice and the arguments
 # Consequences 
 - known issues which can occur because of chosen decision
 # Alternatives 
 - were there any other alternatives? why were they not choose