const siteList = new List('sites', {
	valueNames: ["domain", { name: "launch", attr: "datetime" }, "title", "description", "author"],
	page: 69,
	pagination: true,
});
siteList.sort("launch", { order: "desc" });