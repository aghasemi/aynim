


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
	//document.getElementById('my-name').style.display = "none"
	document.getElementById('copyright-holder').innerHTML = marked.parseInline(copyrightMarkdown)
	document.getElementById('pages').innerHTML =''

	let currentPagePath = `/content/${pgHash}.md` //Default path. Will be used if an array is given as list
	let currentPageTitle = pgHash
	const pageTitles = Array.isArray(pages) ? pages : Object.keys(pages)  
	
	pageTitles.forEach(page_title => {
		const pageAnchor = page_title.replace(/ /g, '_'); //Remove all whitespaces

		currentPagePath = (pageAnchor===pgHash && (typeof pages[page_title] !== 'undefined') ) ? pages[page_title] : currentPagePath
		currentPageTitle = (pageAnchor===pgHash  ) ? page_title : currentPageTitle
		document.getElementById('pages').innerHTML += `<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#${pageAnchor}" >${page_title}</a>\n`
	});


	const styleFile = 'styleFile' in config ? config['styleFile'] : '/css/style.css'
	loadCSS(styleFile)

	document.title =  `${siteName} - ${currentPageTitle}`;
	const result   = await (await fetch(currentPagePath) ).text()
	document.getElementById('content').innerHTML = marked.parse(result);
	document.getElementById('page-title').innerHTML = currentPageTitle

	
}

window.addEventListener('hashchange', () => renderFromAnchor())

window.addEventListener('DOMContentLoaded', event => {
	const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
			document.body.classList.toggle('sb-sidenav-toggled');
        }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

	document.getElementById('pages').addEventListener('click', event => {
		const isMobile = ! window.matchMedia('(min-width: 768px)').matches;
		if (isMobile) document.body.classList.toggle('sb-sidenav-toggled');
	});

});


window.onload = () => renderFromAnchor()

