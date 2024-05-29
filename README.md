# Single-Serving Sites

A single-serving site is a website composed of a single page with a dedicated domain name and which serves only one purpose. This site tries to list all the cool ones.

## Contributing
Feel free to [hit me up on Mastodon](https://mastodon.social/@huphtur) if you know a cool site that should be added.

### Add Sites
Create a new `sitename.json` file in the `src/_data/sites` folder and open a pull request.

Use the following template when adding a new site
```json
{
	"url": "https://sitename.com/",
	"title": "Sitename Title",
	"description": "Sitename description, keep it under 160 characters please.",
	"launchDate": "2023-12-31",
	"author": "Your Name",
	"authorSite": "https://yourpersonalsite.com/"
}
```

### Removing Sites
To exclude a site from the list add 2 extra lines to the json file
```json
	"excludeFromList": true,
	"excludeReason": "Explain why the site is not cool"
```

#### Site That Will Be Excluded
- Commercial sites
- Sites with multiple pages
- Sites with ads
- Hate & Crypto sites

I ultimately reserve the right to exclude sites from the list.

### Screenshots 
Screenshots are done at 800×500 pixels Retina and then downscaled and converted to AVIF format. This is a manual process for now to make sure I can capture the right moment for the screenshot and to not burden my free Cloudflare hosting.
