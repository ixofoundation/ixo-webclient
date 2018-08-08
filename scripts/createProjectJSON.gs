=ARRAYFORMULA(
IF(ROW (A:A) = 1,
"JSON",
IF(ISBLANK(A:A),
"",
  CHAR(123)&CHAR(34)&"title"&CHAR(34)&":"&CHAR(34)& E:E&CHAR(34)&","&
  CHAR(34) &"ownerName"&CHAR(34)&":"&CHAR(34)& C:C&CHAR(34)&","&
  CHAR(34) &"ownerEmail"&CHAR(34)&":"&CHAR(34)& B:B&CHAR(34)&","&
  CHAR(34) &"shortDescription"&CHAR(34)&":"&CHAR(34)& K:K&CHAR(34)&","&
  CHAR(34) &"longDescription"&CHAR(34)&":"&CHAR(34)& L:L&CHAR(34)&","&
  CHAR(34) &"impactAction"&CHAR(34)&":"&CHAR(34)& I:I&CHAR(34)&","&
  CHAR(34) &"projectLocation"&CHAR(34)&":"&CHAR(34)& G:G&CHAR(34)&","&
  CHAR(34) &"requiredClaims"&CHAR(34)&":"& J:J&","&
  CHAR(34) &"sdgs"&CHAR(34)&":["&CHAR(34)&H:H&CHAR(34)&"],"&
  CHAR(34) &"templates"&CHAR(34)&":{"&
  CHAR(34) &"claim"&CHAR(34)&":{"&
  CHAR(34) &"schema"&CHAR(34)&":"&CHAR(34)&"<ENTER HASH HERE>"&CHAR(34)&","&
  CHAR(34) &"form"&CHAR(34)&":"&CHAR(34)&"<ENTER HASH HERE>"&CHAR(34)&"}},"&
  CHAR(34) &"evaluatorPayPerClaim"&CHAR(34)&":"&CHAR(34)& "0"&CHAR(34)&","&
  CHAR(34) &"socialMedia"&CHAR(34)&":{"&
  CHAR(34) &"facebookLink"&CHAR(34)&":"&CHAR(34)& P:P&CHAR(34)&","&
  CHAR(34) &"instagramLink"&CHAR(34)&":"&CHAR(34)& R:R&CHAR(34)&","&
  CHAR(34) &"twitterLink"&CHAR(34)&":"&CHAR(34)& Q:Q&CHAR(34)&","&
  CHAR(34) &"webLink"&CHAR(34)&":"&CHAR(34)& S:S&CHAR(34)&"},"&
  CHAR(34) &"serviceEndpoint"&CHAR(34)&":"&CHAR(34)& "<ENTER PDS URL HERE>"&CHAR(34)&","&
  CHAR(34) &"imageLink"&CHAR(34)&":"&CHAR(34)& M:M&CHAR(34)&","&
  CHAR(34) &"autoApprove"&CHAR(34)&":"& AD:AD&","&
  CHAR(34) &"founder"&CHAR(34)&":{"&
  CHAR(34) &"name"&CHAR(34)&":"&CHAR(34)& T:T&CHAR(34)&","&
  CHAR(34) &"email"&CHAR(34)&":"&CHAR(34)& AC:AC&CHAR(34)&","&
  CHAR(34) &"countryOfOrigin"&CHAR(34)&":"&CHAR(34)& U:U&CHAR(34)&","&
  CHAR(34) &"shortDescription"&CHAR(34)&":"&CHAR(34)& V:V&CHAR(34)&","&
  CHAR(34) &"websiteURL"&CHAR(34)&":"&CHAR(34)& W:W&CHAR(34)&","&
  CHAR(34) &"logoLink"&CHAR(34)&":"&CHAR(34)& Y:Y&CHAR(34)&"}}"
)))