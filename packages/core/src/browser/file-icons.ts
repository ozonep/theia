/********************************************************************************
 * Copyright (C) 2017 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

const fileExtensions: { [key: string]: string; } = {
	'7z': '_archive',
	'bz2': '_archive',
	'gz': '_archive',
	'jar': '_archive',
	'rar': '_archive',
	'tar': '_archive',
	'taz': '_archive',
	'tbz': '_archive',
	'tbz2': '_archive',
	'file': '_file',
	'folder': '_folder',
	'tgz': '_archive',
	'tlz': '_archive',
	'txz': '_archive',
	'tzo': '_archive',
	'zip': '_archive',
	'xz': '_archive',
	'dll': '_binary',
	'exe': '_binary',
	'pyc': '_binary',
	'so': '_binary',
	'cfg': '_config',
	'conf': '_config',
	'directory': '_config',
	'dockerfile': '_config',
	'gradle': '_config',
	'gyp': '_config',
	'gypi': '_config',
	'ini': '_config',
	'mk': '_config',
	'properties': '_config',
	'pssc': '_config',
	'tern-project': '_config',
	'toml': '_config',
	'cake': '_config-src',
	'conf.js': '_config-src',
	'config.cjs': '_config-src',
	'config.js': '_config-src',
	'config.json': '_config-src',
	'config.mjs': '_config-src',
	'ctags': '_ctags',
	'gemtags': '_ctags',
	'tags': '_ctags',
	'cabal': '_data',
	'cson': '_data',
	'edn': '_data',
	'env': '_data',
	'eyaml': '_data',
	'eyml': '_data',
	'json': '_data',
	'jsonc': '_data',
	'mod': '_data',
	'psd1': '_data',
	'webmanifest': '_data',
	'yaml': '_data',
	'yml': '_data',
	'xaml': '_data-markup',
	'xml': '_data-markup',
	'xsl': '_data-markup',
	'xslt': '_data-markup',
	'schema.json': '_data-template',
	'graphql': '_data-template',
	'dump': '_database',
	'sqlite': '_database',
	'sqlite3': '_database',
	'dsql': '_database-src',
	'sql': '_database-src',
	'pdb': '_debug',
	'diff': '_diff',
	'patch': '_diff',
	'dvi': '_doc',
	'log': '_doc',
	'rdoc': '_doc',
	'rst': '_doc',
	'tex': '_doc',
	'txt': '_doc',
	'bash': '_script',
	'bat': '_script',
	'cmd': '_script',
	'ksh': '_script',
	'ps1': '_script',
	'psm1': '_script',
	'psrc': '_script',
	'sh': '_script',
	'vbs': '_script',
	'vsh': '_script',
	'zsh': '_script',
	'eot': '_font',
	'otf': '_font',
	'ttf': '_font',
	'woff': '_font',
	'woff2': '_font',
	'd.ts': '_headers',
	'h': '_headers',
	'h++': '_headers',
	'hpp': '_headers',
	'hxx': '_headers',
	'pyi': '_headers',
	'gif': '_image',
	'ico': '_image',
	'jpeg': '_image',
	'jpg': '_image',
	'png': '_image',
	'svg': '_image',
	'svgz': '_image',
	'afdesign': '_image-src',
	'fla': '_image-src',
	'indd': '_image-src',
	'psd': '_image-src',
	'xfl': '_image-src',
	'ilk': '_linker',
	'lock': '_lock',
	'map': '_map',
	'markdown': '_markdown',
	'md': '_markdown',
	'asp': '_markup',
	'aspx': '_markup',
	'cshtml': '_markup',
	'htm': '_markup',
	'html': '_markup',
	'jshtm': '_markup',
	'jsp': '_markup',
	'php': '_markup',
	'php4': '_markup',
	'php5': '_markup',
	'phtml': '_markup',
	'pod': '_markup',
	'rhtml': '_markup',
	'shtml': '_markup',
	'xhtml': '_markup',
	'npmrc': '_config',
	'nvmrc': '_config',
	'flv': '_media',
	'm4a': '_media',
	'mov': '_media',
	'mp3': '_media',
	'mp4': '_media',
	'mpg': '_media',
	'ogg': '_media',
	'ipynb': '_notebook',
	'pdf': '_pdf',
	'code-search': '_search',
	'csv': '_sheet',
	'tsv': '_sheet',
	'as': '_src',
	'c': '_src',
	'c++': '_src',
	'cc': '_src',
	'cjs': '_src',
	'clj': '_src',
	'cljc': '_src',
	'cljs': '_src',
	'cljx': '_src',
	'gitignore': '_ignore',
	'cpp': '_src',
	'cpy': '_src',
	'cr': '_src',
	'cs': '_src',
	'csx': '_src',
	'cxx': '_src',
	'es': '_src',
	'es6': '_src',
	'ex': '_src',
	'exs': '_src',
	'fs': '_src',
	'fsi': '_src',
	'fsscript': '_src',
	'fsx': '_src',
	'go': '_src',
	'groovy': '_src',
	'gs': '_src',
	'gvy': '_src',
	'hlsl': '_src',
	'hs': '_src',
	'htc': '_src',
	'hx': '_src',
	'hxsl': '_src',
	'iced': '_src',
	'ipy': '_src',
	'java': '_src',
	'js': '_src',
	'jscad': '_src',
	'jsfl': '_src',
	'jsm': '_src',
	'json5': '_src',
	'kt': '_src',
	'litcoffee': '_src',
	'lua': '_src',
	'm': '_src',
	'mjs': '_src',
	'mm': '_src',
	'nqp': '_src',
	'p6': '_src',
	'pac': '_src',
	'pjs': '_src',
	'pl': '_src',
	'pl6': '_src',
	'pm': '_src',
	'pm6': '_src',
	'psgi': '_src',
	'py': '_src',
	'pyw': '_src',
	'r': '_src',
	'rpy': '_src',
	'rs': '_src',
	'shader': '_src',
	'swift': '_src',
	'ts': '_src',
	'v': '_src',
	'vb': '_src',
	'xsjs': '_src',
	'xsjslib': '_src',
	'css': '_stylesheet',
	'less': '_stylesheet',
	'sass': '_stylesheet',
	'scss': '_stylesheet',
	'styl': '_stylesheet',
	'ctp': '_template',
	'eco': '_template',
	'ecr': '_template',
	'ejs': '_template',
	'erb': '_template',
	'haml': '_template',
	'hamlc': '_template',
	'handlebars': '_template',
	'hbs': '_template',
	'hjs': '_template',
	'j2': '_template',
	'jade': '_template',
	'jinja2': '_template',
	'jsx': '_template',
	'mustache': '_template',
	'njk': '_template',
	'pug': '_template',
	'slim': '_template',
	'svelte': '_template',
	'tsx': '_template',
	'twig': '_template',
	'vue': '_template',
	'xsd': '_template',
	'spec.js': '_test',
	'spec.jsx': '_test',
	'spec.ts': '_test',
	'spec.tsx': '_test',
	'test.js': '_test',
	'test.jsx': '_test',
	'test.ts': '_test',
	'test.tsx': '_test',
	'todo': '_todo'
};

const filenames: { [key: string]: string; } = {
	'bugs': '_bugs',
	'bugs.md': '_bugs',
	'bugs.txt': '_bugs',
	'changelog': '_changelog',
	'changelog.md': '_changelog',
	'changelog.txt': '_changelog',
	'history': '_changelog',
	'history.md': '_changelog',
	'history.txt': '_changelog',
	'authors': '_codeowners',
	'codeowners': '_codeowners',
	'owners': '_codeowners',
	'.appveyor.yml': '_config',
	'.browserslistrc': '_config',
	'.coveragerc': '_config',
	'.editorconfig': '_config',
	'.gitattributes': '_config',
	'.gitkeep': '_config',
	'.gitmodules': '_config',
	'.gitpod.yml': '_config',
	'.hlint.yaml': '_config',
	'.htaccess': '_config',
	'.htmlvalidate.json': '_config',
	'.keep': '_config',
	'.npmrc': '_config',
	'.nvmrc': '_config',
	'.renovaterc': '_config',
	'.renovaterc.json': '_config',
	'.stylish-haskell.yaml': '_config',
	'.travis.yml': '_config',
	'appveyor.yml': '_config',
	'cmakelists.txt': '_config',
	'cname': '_config',
	'config.yml': '_config',
	'dependabot.yml': '_config',
	'dockerfile': '_config',
	'jakefile': '_config',
	'jenkinsfile': '_config',
	'jsconfig.json': '_config',
	'labeler.yml': '_config',
	'makefile': '_config',
	'procfile': '_config',
	'release-drafter.yml': '_config',
	'renovate.json': '_config',
	'renovate.json5': '_config',
	'stale.yml': '_config',
	'tsconfig.json': '_config',
	'vercel.json': '_config',
	'.babelrc': '_config',
	'.babelrc.json': '_config',
	'.eslintrc': '_config',
	'.eslintrc.json': '_config',
	'.eslintrc.yaml': '_config',
	'.eslintrc.yml': '_config',
	'.nycrc': '_config',
	'.nycrc.json': '_config',
	'.nycrc.yaml': '_config',
	'.nycrc.yml': '_config',
	'.prettierrc': '_config',
	'.prettierrc.json': '_config',
	'.prettierrc.yaml': '_config',
	'.prettierrc.yml': '_config',
	'.remarkrc': '_config',
	'.remarkrc.json': '_config',
	'.remarkrc.yaml': '_config',
	'.remarkrc.yml': '_config',
	'.stylelintrc': '_config',
	'.stylelintrc.json': '_config',
	'.stylelintrc.yaml': '_config',
	'.stylelintrc.yml': '_config',
	'.markdownlintrc': '_config',
	'.markdownlint.yml': '_config',
	'.markdownlint.yaml': '_config',
	'.markdownlint.json': '_config',
	'.mocha.json': '_config',
	'.mocha.jsonc': '_config',
	'.mocha.yaml': '_config',
	'.mocha.yml': '_config',
	'cakefile': '_config-src',
	'gatsby-config.js': '_config-src',
	'gruntfile.js': '_config-src',
	'gulpfile.js': '_config-src',
	'.eslintrc.js': '_config-src',
	'.mocharc.js': '_config-src',
	'.nycrc.js': '_config-src',
	'.prettierrc.js': '_config-src',
	'.remarkrc.js': '_config-src',
	'.stylelintrc.js': '_config-src',
	'.babelrc.cjs': '_config-src',
	'.babelrc.js': '_config-src',
	'.babelrc.mjs': '_config-src',
	'.mocharc.cjs': '_config-src',
	'.mocharc.mjs': '_config-src',
	'tags': '_ctags',
	'manifest.in': '_data',
	'pipfile': '_data',
	'contributing': '_doc',
	'code_of_conduct': '_doc',
	'issue_template': '_doc',
	'pull_request_template': '_doc',
	'.dockerignore': '_ignore',
	'.eslintignore': '_ignore',
	'.gitignore': '_ignore',
	'.npmignore': '_ignore',
	'.nycignore': '_ignore',
	'.prettierignore': '_ignore',
	'.remarkignore': '_ignore',
	'.stylelintignore': '_ignore',
	'.vscodeignore': '_ignore',
	'readme': '_info',
	'readme.md': '_info',
	'readme.txt': '_info',
	'copying': '_license',
	'copying.md': '_license',
	'copying.txt': '_license',
	'license': '_license',
	'license.md': '_license',
	'license.txt': '_license',
	'license-code': '_license',
	'license-code.md': '_license',
	'license-code.txt': '_license',
	'.vpkg-lock.json': '_lock',
	'package-lock.json': '_lock',
	'.mailmap': '_mail',
	'gradlew': '_script',
	'security': '_security',
	'security.md': '_security',
	'funding.yml': '_support',
	'support': '_support',
	'support.md': '_support',
	'todo': '_todo',
	'todo.md': '_todo',
	'todo.txt': '_todo'
};

export function getClassWithColor(name: string): string | undefined {
	const arr = name.split('.');
	let result;
	let className;
	for (const key in filenames) {
		if (name === key) {
			className = filenames[key];
			break;
		}
	}
	if (!className) {
		if (arr.length === 3) {
			result = `${arr[1]}.${arr[2]}`;
		} else if (arr.length === 2) {
			result = arr.pop();
		} else {
			result = arr[0];
		}
		for (const key in fileExtensions) {
			if (result === key) {
				className = fileExtensions[key];
				break;
			}
		}
	}
	return className;
}
