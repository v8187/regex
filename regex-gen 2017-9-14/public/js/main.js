const
	elByTag = tagName => {
		return document.getElementsByTagName(tagName)[0];
	}
	, elQuery = queryStr => {
		var elList = document.querySelector(queryStr);

		return {
			el: elList,
			count: elList ? elList.length : 0
		};
	}
	, elCreate = (name, html, className) => {
		let el = document.createElement(name);

		className && (el.className = className);
		html && (el.innerHTML = html);

		return el;
	}
	, getToggleBtn = (id, onMsg, offMsg, isOn) => {

		return `<div class="toggle-switch-container">
				<input id="${id}" type="checkbox" ${isOn ? 'checked' : ''} />
				<label  for="${id}">
                    <span class="tog-swh-text">${onMsg}</span>
					<span class="tog-swh-text">${offMsg}</span>
                    <span class="tog-swh-btn">IIII</span>
                </label></div>`;
	}
	, elOutput = elByTag('output')

	, cagetories = [
		{
			label: 'Begin Group',
			id: 'bGroup',
			className: 'cat-b-group',
			optionsTemplate: () => {
				let indx = elQuery('.cat-b-group').count;

				return `<input id="btnBGroupDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		},
		{
			label: 'Begin List',
			id: 'bList',
			className: 'cat-b-list',
			optionsTemplate: () => {
				let indx = elQuery('.cat-b-list').count;

				return `<input id="btnbListDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		},
		{
			label: 'Custom Characters List',
			id: 'selCharList',
			className: 'cat-sel-char-list',
			optionsTemplate: () => {
				let indx = elQuery('.cat-sel-char-list').count;

				return `<input id="selCharListChars${indx}" type="text" placeholder="Chars to Include/Exclude" />
				${getToggleBtn(`btnSelCharListInclude${indx}`, 'Include', 'Exclude', true)}
				${getToggleBtn(`btnSelCharListOptional${indx}`, 'Optional', 'Required')}
				${getToggleBtn(`btnSelCharListInfinite${indx}`, 'Infinite', 'Limited')}
				<input id="selCharListMin${indx}" type="number" min="0" placeholder="Min"  />
				<input id="selCharListMax${indx}" type="number" min="1" placeholder="Max" />
				<input id="btnSelCharListDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		},
		{
			label: 'Alphabet(s)',
			id: 'alpha',
			className: 'cat-alpha',
			optionsTemplate: () => {
				let indx = elQuery('.cat-alpha').count;

				return `<input id="alphaChars${indx}" type="text" placeholder="Alphabets to Include/Exclude" />
				${getToggleBtn(`btnAlphaInclude${indx}`, 'Include', 'Exclude', true)}
				${getToggleBtn(`btnAlphaOptional${indx}`, 'Optional', 'Required')}
				${getToggleBtn(`btnAlphaInfinite${indx}`, 'Infinite', 'Limited')}
				<input id="alphaMin${indx}" type="number" min="0" placeholder="Min"  />
				<input id="alphaMax${indx}" type="number" min="1" placeholder="Max" />
				<input id="btnAlphaDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		},
		{
			label: 'Number(s)',
			id: 'num',
			className: 'cat-number',
			optionsTemplate: () => {
				let indx = elQuery('.cat-number').count;

				return `<input id="numChars${indx}" type="text" placeholder="Numbers to Include/Exclude" />
				${getToggleBtn(`btnNumInclude${indx}`, 'Include', 'Exclude', true)}
				${getToggleBtn(`btnNumOptional${indx}`, 'Optional', 'Required')}
				${getToggleBtn(`btnNumInfinite${indx}`, 'Infinite', 'Limited')}
				<input id="numMin${indx}" type="number" min="0" placeholder="Min"  />
				<input id="numMax${indx}" type="number" min="1" placeholder="Max" />
				<input id="btnNumDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		},
		{
			label: 'Special Characters(s)',
			id: 'splChar',
			className: 'cat-spl-char',
			optionsTemplate: () => {
				let indx = elQuery('.cat-spl-char').count;

				return `<input id="splCharChars${indx}" type="text" placeholder="Special char to Include/Exclude" />
				${getToggleBtn(`btnSplCharInclude${indx}`, 'Include', 'Exclude', true)}
				${getToggleBtn(`btnSplCharOptional${indx}`, 'Optional', 'Required')}
				${getToggleBtn(`btnSplCharInfinite${indx}`, 'Infinite', 'Limited')}
				<input id="splCharMin${indx}" type="number" min="0" placeholder="Min"  />
				<input id="splCharMax${indx}" type="number" min="1" placeholder="Max" />
				<input id="btnSplCharDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		},
		{
			label: 'Space',
			id: 'space',
			className: 'cat-space',
			optionsTemplate: () => {
				let indx = elQuery('.cat-space').count;

				return `${getToggleBtn(`btnSpaceInclude${indx}`, 'Include', 'Exclude', true)}
				${getToggleBtn(`btnSpaceOptional${indx}`, 'Optional', 'Required')}
				${getToggleBtn(`btnSpaceInfinite${indx}`, 'Infinite', 'Limited')}
				<input id="spaceMin${indx}" type="number" min="0" placeholder="Min"  />
				<input id="spaceMax${indx}" type="number" min="1" placeholder="Max" />
				<input id="btnSpaceDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		},
		{
			label: 'End List',
			id: 'eList',
			className: 'cat-e-list',
			optionsTemplate: () => {
				let indx = elQuery('.cat-e-list').count;

				return `<input id="btnEListDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		},
		{
			label: 'End Group',
			id: 'eGroup',
			className: 'cat-e-group',
			optionsTemplate: () => {
				let indx = elQuery('.cat-e-group').count;

				return `<input id="btnEGroupDel${indx}" type="button" class="del-btn" value="x" />`;
			}
		}
	]
	, renderCharTypes = () => {
		var fragment = document.createDocumentFragment(),
			ul = elQuery('#characterTypes > ul').el;

		ul.innerHTML = '';
		cagetories.map((cType, indx) => {
			let elLI = elCreate('li', '', cType.className),
				tbl = elCreate('table');

			elLI.appendChild(elCreate('i', ':::', 'icon'));
			elLI.innerHTML += `<div class="category-controls"><h2>${cType.label}</h2><div>${cType.optionsTemplate()}</div></div>`;
			fragment.appendChild(elLI);
		});
		ul.appendChild(fragment);
	}
	;

renderCharTypes();