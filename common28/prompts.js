// prompts will be inserted into the title attributes of various headers after page upload


var contentPrompts = {
'cursive':"Is this script cursive? Is the basic shape of a letter radically changed? Is it sometimes not cursive? Are there any special features to note? Are Unicode joiner and non-joiner characters needed to override default joining behaviours?",

'gsub':"Are special glyph forms needed, depending on the context in which a character is used? Do glyphs interact in some circumstances?",

"gpos":"Are there requirements to position diacritics or other items specially, depending on context? Does the script have multiple diacritics competing for the same location relative to the base?",

"baselines":"Does the script have special requirements for baseline alignment between mixed scripts and in general? Is line height special for this script? Are there other aspects that affect line spacing, or positioning of items vertically within a line?",

"fontstyle":"Are italicisation, bolding, oblique, etc relevant? Do italic fonts lean in the right direction? Is synthesised italicisation problematic? Are there other problems relating to bolding or italicisation - perhaps relating to generalised assumptions of applicability?",

"graphemes":"Do Unicode grapheme clusters appropriately segment character units for the script? Are there special requirements for the following operations: forwards/backwards deletion, cursor movement & selection, character counts, searching & matching, text insertion, line-breaking, justification, case conversions, sorting?",

"word":"Are words separated by spaces, or other characters? Are there special requirements when double-clicking  on the text? Are words hyphenated?",

"phrase":"What characters are used to indicate the boundaries of phrases, sentences, and sections?",

"otherinline":"Any other form of highlighting or marking of text, such as underlining, numeric overbars, etc. What characters or methods (eg. text decoration) are used to convey information about a range of text?\n• If lines are drawn alongside, over or through the text, do they need to be a special distance from the text itself?\n• Is it important to skip characters when underlining, etc?\n• How do things change for vertically set text?\n• (See also the following sections which deal with specific purposes.)",

"quotations":"What characters are used to indicate quotations?\n• Do quotations within quotations use different characters?\n• What characters are used to indicate dialogue?",

"abbrev":"What characters are used to indicate abbreviation, ellipsis &amp; repetition?",

"emphasis":"How are emphasis and highlighting achieved?\n• If lines are drawn alongside, over or through the text, do they need to be a special distance from the text itself?\n• Is it important to skip characters when underlining, etc?\n• How do things change for vertically set text?",

"bracketing":"What parentheses or brackets are used?",

"otherpunctuation":"Punctuation not already mentioned, such as dashes, connectors, separators, etc.",

"inlinenotes":"What mechanisms, if any, are used to create *inline* notes and annotations? (For referent-type notes such as footnotes, see below.)",

"linebreak":"Are there special rules about the way text  wraps when it hits the end of a line?\n• Does line-breaking wrap whole 'words' at a time, or characters, or something else (such as syllables in Tibetan and Javanese)?\n• What characters should not appear at the end or start of a line, and what should be done to prevent that?",

"hyphenation":"Is hyphenation used, or something else? What rules are used? What difficulties exist?",

"justification":"Does text in a paragraph needs to have flush lines down both sides?\n• Does the script allow punctuation to hang outside the text box at the start or end of a line?\n• Where adjustments are need to make a line flush, how is that done?\n• Does the script shrink/stretch space between words and/or letters?\n• Are word baselines stretched, as in Arabic?\n• What about paragraph indents?",

"letterspace":"Does the script create emphasis or other effects by spacing out the words, letters or syllables in a word?  (For justification related spacing, see above).",
"lists":"Are there list or other counter styles in use?  If so, what is the format used? Do counters need to be upright in vertical text? Are there other aspects related to counters and lists that need to be addressed?",

"initials":"Does the script use special styling of the initial letter of a line or paragraph, such as for drop caps or similar? How about the size relationship between the large letter and the lines alongide? where does the large letter anchor relative to the lines alongside? is it normal to include initial quote marks in the large letter? is the large letter really a syllable? Are dropped, sunken, and raised types found? etc.",

"generallayout":"How are the main text area and ancilliary areas positioned and defined? Are there any special requirements here, such as dimensions in characters for the Japanese kihon hanmen? The book cover for scripts that are read right-to-left scripts is on the right of the spine, rather than the left.  When content can flow vertically and to the left or right, how to specify the location of objects, text, etc. relative to the flow? Do tables and grid layouts work as expected? How do columns work in vertical text? Can you mix block of vertical and horizontal text? Does text scroll in a different direction?",

"grids":"Does the script have special requirements for character grids or tables?",
"footnotes":"Does the script have special requirements for notes, footnotes, endnotes or other necessary annotations of this kind? (There is a section above for purely inline annotations, such as ruby or warichu. This section is more about annotation systems that separate the reference marks and the content of the notes.)",

"interaction":"Are vertical form controls needed? Are scroll bars in an unusual position? Other special requirements for user interaction?",

"headers":"Are there special conventions for page numbering, or the way that running headers and the like are handled?",

"writingstyles":"How are fonts grouped into recognisable writing styles? How is each writing style used?",

"transforms":"Is the orthography bicameral? Are there other character pairings, especially when transforms are needed to convert between the two?",

}





function setContentPrompts () {
	if (contentPrompts) {
		// set the prompts in the titles
		for (var thePrompt in contentPrompts) {
			var node = document.getElementById(thePrompt)
			if (node) {		 	
				var heading = node.querySelector('h3')
				if (heading) heading.title = contentPrompts[thePrompt]
				
				var promptPara = node.querySelector('.prompts')
				if (promptPara) promptPara.textContent = contentPrompts[thePrompt]
				}
			 }
			 
		// set the prompts in the initial paras of shaping and pagelayout
		for (thePrompt in contentPrompts) {
			var node = document.getElementById(thePrompt+'Inline')
			if (node) node.title = contentPrompts[thePrompt]
			}

		contentPrompts = {}
		}
	}




function showAbout (node, script, language) {
// Displays/hides the 'About this document' details

if (node.innerHTML == '') {
	console.log(node.parentNode)
	node.innerHTML = `
	<p class="instructions"><span class="leadin">Transcriptions.</span> Transcriptions in <span style="white-space:nowrap;">⌈corner brackets⌋</span> are taken from the sources consulted, and may be narrow or broad, phonemic or phonetic, depending on what is available (which is why corner brackets are used rather than the usual /phonemic/ and [phonetic] indicators). Transcriptions between <span style="white-space:nowrap;">&lt;angle brackets&gt;</span>, represent the letters as commonly written in the Latin script. When you click on an example to see its composition, the letters in the panel that opens are a <em><a href="../glossary/#transliteration" class="termref">transliteration</a></em>, rather than a <a href="../glossary/#transcription" class="termref">transcription</a>: the difference being that a transliteration provides perfect round-trip conversion between the native and Latin, whereas transcriptions rarely do.  The transliteration has been developed especially for this page, and is generally based on the sound of a letter where possible, but where a letter has multiple pronunciations, the transliteration represents only one.</p>
	<p class="instructions noprint"><span class="leadin">Detailed topic information.</span> Footnote  links with an arrow alongside take you to more detailed information on the current topic.</p>
	<p class="instructions noprint"><span class="leadin">Changing fonts.</span>Click on the vertical blue bar (bottom right) to change font settings for the sample text.</p>
	` 
	node.parentNode.open = true
	}
else { 
	node.parentNode.open = false
	node.innerHTML = ''
	}
}




/*
function showOrthoLinks (node, script, langName, lang, orthog, indic) {
// Adds the link popup and anchoring line in Basic Features
// script: iso code for script; langName: language name; lang: bcp47 tag
// orthog: ordinary name for orthography described
// indic: boolean indicating whether or not to show indic syllable property link
        
	out = `
    <div id="orthoLinkSwitch" onmouseover="document.getElementById('orthoLinkPopup').style.display='block'"  
    onmouseout="document.getElementById('orthoLinkPopup').style.display='none'"><img src="../common/icons/transfer.png" alt="External links">

    <div id="orthoLinkPopup">
    <ul>`
    
    out += `<li><a target="_blank" href="/app-charuse?language=${lang}">Character usage</a></li>`
    
    if (indic) out += `<li><a target="_blank" href="" onClick="this.href='../apps/listindic?chars='+encodeURI(getOrthographyList('.characterBox', 'index', false) + getOrthographyList('.auxiliaryBox', 'index', true));">Indic category</a></li>`
    
    out += `<li><a target="_blank" href="" onClick="this.href='../apps/listcategories?chars='+encodeURI(getOrthographyList('.characterBox', 'index', true) + getOrthographyList('.auxiliaryBox', 'index', true))">General Category</a></li>
    
    <li><a target="_blank" href="" onClick="this.href='/app-listcharacters?chars='+encodeURI(getOrthographyList('.characterBox', 'index', false) + getOrthographyList('.auxiliaryBox', 'index', true));">Unicode blocks</a></li>
    
    <li><a target="_blank" href="" onClick="this.href='/uniview?charlist='+encodeURI(getOrthographyList('.characterBox', 'index', false) + getOrthographyList('.auxiliaryBox', 'index', true))">UniView</a></li>
    
    <li><a target="_blank" href="" onClick="this.href='/app-analysestring/?chars='+encodeURI(getOrthographyList('.characterBox', 'index', false) + getOrthographyList('.auxiliaryBox', 'index', true))">Analyse String</a></li>
    
    <li><a target="_blank" href="" onClick="this.href='../fontlist/?script=${script}&text='+encodeURI(getOrthographyList('.characterBox', 'index', true) + getOrthographyList('.auxiliaryBox', 'index', true))">Font Lister</a></li>
    
    <li><a target="_blank" href="../samples/?script=${script}">Sample texts</a></li>
    
    <li><a target="_blank" href="block">Character notes</a></li>
    
    <li><a target="_blank" href="../links?iso=${script}">Related resources</a></li>
    
    <li id="closeOrthoLink" onClick="this.parentNode.parentNode.style.display='none'">X</li>
    </ul>
    </div>
    </div>

    <div id="orthoLinkInstructions">
    <p>Click on the image to the left to view all the characters in the index in various groupings or open related apps.</p>
    <!--p>Show <a href="../../app-charuse/?language=${lang}" target="_blank">${langName}</a> in the Character Usage app.</p>
    <p>Show ${orthog} characters grouped by <a target="_blank" href="" onClick="this.href='../apps/listcategories?chars='+encodeURI(getOrthographyList('.characterBox', 'index', true) + getOrthographyList('.auxiliaryBox', 'index', true))">General Category</a>, or click on the icon to the left to choose alternatives.</p-->
    </div>
	` 
	node.innerHTML = out

}
*/






function makeIndexIntro (node, script, langName, lang, orthog, indic) {
// Adds the introduction for the Index - includes the former showOrthoLinks 
// script: iso code for script; langName: language name; lang: bcp47 tag
// orthog: ordinary name for orthography described
// indic: boolean indicating whether or not to show indic syllable property link


    // redefine the parameters here to improve portability, since this is called from each separate page
    script = window.scriptTag
    langName = window.languageName
    lang = window.charUsageBCP
    orthog = window.orthogName
    indic = window.indic
    
    var out = ''
    
    out += `<div id="index_intro">
    <div class="index_intro_column">
    <p class="instructions">The index points to locations where a character is mentioned in this page, and indicates whether it is used by the ${orthog} orthography described here.</p>
    <p class="instructions"><a href="#" onclick="listAllIndexCharacters('arab','arab-fa'); document.getElementById('charCountList').style.display='block'; return false;">List &amp; export characters</a> in the index.</p>
    </div>
    <div class="index_intro_column" id="orthoLinks"></div>
    `

    
	out += `<div id="orthoLinkSwitch" onmouseover="document.getElementById('orthoLinkPopup').style.display='block'"  
    onmouseout="document.getElementById('orthoLinkPopup').style.display='none'"><img src="../common/icons/transfer.png" alt="External links">

    <div id="orthoLinkPopup">
    <ul>`
    
    out += `<li><a target="_blank" href="/app-charuse?language=${lang}">Character usage</a></li>`
    
    if (indic) out += `<li><a target="_blank" href="" onClick="this.href='../apps/listindic?chars='+encodeURI(getOrthographyList('.characterBox', 'index', false) + getOrthographyList('.auxiliaryBox', 'index', true));">Indic category</a></li>`
    
    out += `<li><a target="_blank" href="" onClick="this.href='../apps/listcategories?chars='+encodeURI(getOrthographyList('.characterBox', 'index', true) + getOrthographyList('.auxiliaryBox', 'index', true))">General Category</a></li>
    
    <li><a target="_blank" href="" onClick="this.href='/app-listcharacters?chars='+encodeURI(getOrthographyList('.characterBox', 'index', false) + getOrthographyList('.auxiliaryBox', 'index', true));">Unicode blocks</a></li>
    
    <li><a target="_blank" href="" onClick="this.href='/uniview?charlist='+encodeURI(getOrthographyList('.characterBox', 'index', false) + getOrthographyList('.auxiliaryBox', 'index', true))">UniView</a></li>
    
    <li><a target="_blank" href="" onClick="this.href='/app-analysestring/?chars='+encodeURI(getOrthographyList('.characterBox', 'index', false) + getOrthographyList('.auxiliaryBox', 'index', true))">Analyse String</a></li>
    
    <li><a target="_blank" href="" onClick="this.href='../fontlist/?script=${script}&text='+encodeURI(getOrthographyList('.characterBox', 'index', true) + getOrthographyList('.auxiliaryBox', 'index', true))">Font Lister</a></li>
    
    <li><a target="_blank" href="../samples/?script=${script}">Sample texts</a></li>
    
    <li><a target="_blank" href="block">Character notes</a></li>
    
    <li><a target="_blank" href="../links?iso=${script}">Related resources</a></li>
    
    <li id="closeOrthoLink" onClick="this.parentNode.parentNode.style.display='none'">X</li>
    </ul>
    </div>
    </div>

    <div id="orthoLinkInstructions">
    <p>Click on the image to the left to view all the 'main' and 'infrequent' characters in the index in various groupings or open related apps.</p>
    </div>
	`
    
    out += `</div>
    <table id="charCountList"></table>
    `
	node.outerHTML = out

}











function addUsageAdvice (script) {
	// Add a para to the intro 
	
	document.getElementById('usage').outerHTML = '<p style="line-height:1.4"><strong style="font-size:120%;">This is an interactive document:</strong> Click/tap on the following to reveal detailed information and examples for each character: (a) characters in boxes with coloured backgrounds, (b) <span style="color:teal;">link text</span> on character names. (You can make this happen as the cursor moves over the characters in boxes, by selecting <samp>Detail on mouseover</samp> in the floating menu to the right.) The same information also appears in the companion document, <a href="block" target="_blank" class="linkHighlightx">'+script+' character notes</a>. In addition, you can click/tap on <span class="ex">coloured examples</span> and on figures to see a list of the characters they contain.</p>'
	}


function addUsageAdvice (script) {
	// Add a para to the intro & add accessibility controls
	
	document.getElementById('usage').outerHTML = `
    <p style="line-height:1.4"><strong style="font-size:120%;">This is an interactive document:</strong> Click/tap on the following to reveal detailed information and examples for each character: (a) characters in boxes with coloured backgrounds, (b) <span style="color:teal;">link text</span> on character names. (You can make this happen as the cursor moves over the characters in boxes, by selecting <samp>Detail on mouseover</samp> in the floating menu to the right.) The same information also appears in the companion document, <a href="block" target="_blank" class="linkHighlightx">${ script } character notes</a>. In addition, you can click/tap on <span class="ex">coloured examples</span> and on figures to see a list of the characters they contain.</p>
    
    <div id="contrastSwitch" title="Accessibility settings." onclick="document.getElementById('access').style.display='flex'"><img src="../../shared/images/access.png" alt="Accessibility settings"></div>

    <!-- ACCESSIBILITY PANEL  -->
    <div id="access" style="display: none;">
    <div id="access_contrast">
    <div id="contrastChoice">
    <button id="contrastLow" class="access_selected" onClick="document.querySelector('body').classList.remove('contrast');
        access.contrast = 'low';
        this.classList.add('access_selected'); 
        document.getElementById('contrastHigh').classList.remove('access_selected');
        ">Low contrast</button><button id="contrastHigh"
    onClick="document.querySelector('body').classList.add('contrast');
        access.contrast = 'high';
        this.classList.add('access_selected'); 
        document.getElementById('contrastLow').classList.remove('access_selected');
        ">High contrast</button>
    </div>
    </div>
    
    <div id="access_fontsize">Set text size: <input id="accessFontsize" type="range" min="15" max="24" step="1" value="15" oninput="access.fontsize=this.value; document.querySelector('html').style.fontSize = this.value+'px'" style="width:12rem;"></div>
    <div style="color: white;">Font &amp; text size of the examples can be changed independently using the control that pulls out from the bottom right of the page.</div>
    
    <div style="display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:space-around;">
    <div style="margin-block-start: 1rem; font-size: 1.4rem; color: black; cursor:pointer;" onclick="localStorage['docsAccess'] = JSON.stringify(access)">Save settings</div>
    <div style="margin-block-start: 1rem; font-size: 1.4rem; color: black; cursor:pointer;" onclick="this.parentNode.parentNode.style.display='none';">Close X</div>
    </div>
    </div>
    `
	}






function addAnalytics () {
    // add the stuff at the bottom to generate lists and the index
    
    document.getElementById('analytics').outerHTML = `
    `
    +
    `<details>
    <summary class="prompts">Make index</summary>
    <hr>
    <h1>Make the index here</h1>

    <p>Click here to start (and every time you reload the page)</p>
    <p><button onClick="makeIndexObject()">Make Index Object</button></p>

    <p><input id="allchars" type="text" placeholder="List of all chars appears here"></p>
    
    <details>
    <summary>Hints for first build of index</summary>
    <p>Main <input id="mainIndexList" type="text" placeholder="List of all common chars appears here"></p>
    <p>Aux <input id="auxIndexList" type="text" placeholder="List of all infrequent chars appears here"></p>
    <p>Archaic <input id="archaicIndexList" type="text" placeholder="List of all archaic chars appears here"></p>
    <p>Deprecated <input id="deprecatedIndexList" type="text" placeholder="List of all infrequent chars appears here"></p>
    <p>Other <input id="otherIndexList" type="text" placeholder="List of all other chars appears here"></p>
    <p>Unknown <input id="unknownIndexList" type="text" placeholder="List of unknown status chars appears here"></p>
    
    <p><a href="/scripts/apps/listcategories/" target="_blank">Triage by category</a>.</p>
    <p>Copy each General Category to the picker and sort into lines, one for each of the different subsections in the index for that category.</p>
    <p>Copy each line, one at a time to the input box below, and press Make Markup.</p>

    <p><input id="in" type="text" placeholder="Index line here"> <button onClick="makeMarkup()">Make markup</button></p>
    </details>

    <p>Update section: <button onclick="makeMarkupForSection('index_letters')">Letter</button>
        <button onclick="makeMarkupForSection('index_cchars')">Marks</button>
        <button onclick="makeMarkupForSection('index_numbers')">Number</button>
        <button onclick="makeMarkupForSection('index_punctuation')">Punctuation</button>
        <button onclick="makeMarkupForSection('index_symbols')">Symbols</button>
        <button onclick="makeMarkupForSection('index_other')">Other</button>
        </p>

    <p><textarea id="out" style="width: 80%;height:300px;"></textarea>
    </p>
    <p>Take the output and copy it to the document in the correct place in the index.</p>
    `
    }


