


const loadCSS = (url, callback) => {
    var el = document.createElement("link");
    el.href = url;
    el.rel = "stylesheet";
    el.type = "text/css";
    document.head.appendChild(el);
    if(typeof(callback) == "function") {
        el.onload = callback(el);
    }
    return el;
}

let config = undefined


const renderFromAnchor = async () => {
	config = config===undefined ?  await (await fetch(`/config.json`)).json() : config

	const hash = window.location.hash
	const pgHash = hash.length===0 ? 'Home':  hash.substring(1)

	
	const siteName = config['siteName']
	const copyrightMarkdown = config['copyrightNotice']
	const pages = config['pages']
	
	document.getElementById('my-name').innerHTML = siteName
	document.getElementById('copyright-holder').innerHTML = marked.parseInline(copyrightMarkdown)
	document.getElementById('pages').innerHTML =''

	let currentPagePath = `/content/${pgHash}.md` //Default path. Will be used if an array is given as list
	let currentPageTitle = pgHash
	const pageTitles = Array.isArray(pages) ? pages : Object.keys(pages)  
	
	pageTitles.forEach(page_title => {
		const pageAnchor = page_title.replace(/ /g, '_'); //Remove all whitespaces

		currentPagePath = (pageAnchor===pgHash && (typeof pages[page_title] !== 'undefined') ) ? pages[page_title] : currentPagePath
		currentPageTitle = (pageAnchor===pgHash  ) ? page_title : currentPageTitle
		document.getElementById('pages').innerHTML += `<li class="nav-item"><a class="nav-link" href="#${pageAnchor}" >${page_title}</a></li>`
	});


	const styleFile = 'styleFile' in config ? config['styleFile'] : '/css/style.css'
	loadCSS(styleFile)

	document.title =  `${siteName} - ${pgHash}`;
	const result   = await (await fetch(currentPagePath) ).text()
	document.getElementById('content').innerHTML = marked(result);

	//Close the Navbar after clicking
	const navLinks = document.querySelectorAll('.nav-item')
	const menuToggle = document.getElementById('navbarSupportedContent')
	const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false})
	navLinks.forEach((l) => {l.addEventListener('click', () => { bsCollapse.toggle() }) })
	
	
}

window.addEventListener('hashchange', () => renderFromAnchor())

window.onload = () => renderFromAnchor()