# AYNIM: A non-generated, markdown-based simple static CMS

Introduction
-----

My design goals, originally to rebuild my personal home page, were:

1. Not having to generate/build/transpile the website. The static should be readily servable (e.g. after a change), without any build step.
2. Content should be provided directly in Markdown format, again without any prior build step.
3. The _only_ thing the user needs to create or modify is the content, i.e. some Markdown files each of which will act as a _"page"_, plus a config file specifying where to find the content etc...
4. (Optional) The content, i.e. the Markdown files can be hosted anywhere, as long as they are accessible publicly with an URL. For example, one can write Markdown files in their public Dropx directory, GitHub, Google Drive.

The result is Aynim (All You Need is Markdown), a static website which can be hosted directly anywhere a static website is accepted (Vercel, Netlify, GitHub Pages, etc...), and can be customised via the `config.json` file. 
