/********************************************************************************
 * Copyright (C) 2020 TypeFox and others.
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

import { dirname, parse, join, sep } from 'path';
// @ts-ignore
import type webpack from '@types/webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { RawSourceMap } from 'source-map';
import { ApplicationPackage } from '@theia/application-package/lib/application-package';

const modulePackages: { dir: string, name?: string }[] = [];
for (const extensionPackage of new ApplicationPackage({ projectPath: process.cwd() }).extensionPackages) {
    modulePackages.push({
        name: extensionPackage.name,
        dir: dirname(extensionPackage.raw.installed!.packagePath)
    });
}

function exposeModule(modulePackage: { dir: string, name?: string }, resourcePath: string, source: string): string {
    if (!modulePackage.name) {
        return source;
    }
    const { dir, name } = parse(resourcePath);
    let moduleName = join(modulePackage.name, dir.substring(modulePackage.dir.length));
    if (name !== 'index') {
        moduleName = join(moduleName, name);
    }
    if (sep !== '/') {
        moduleName = moduleName.split(sep).join('/');
    }
    return source + `\nif (!global) global = {};\n(global['theia'] = global['theia'] || {})['${moduleName}'] = this;\n`;
}

/**
 * Expose bundled modules on window.theia.moduleName namespace, e.g.
 * window['theia']['@theia/core/lib/common/uri'].
 * Such syntax can be used by external code, for instance, for testing.
 */
export = function (this: webpack.loader.LoaderContext, source: string, sourceMap?: RawSourceMap): string | undefined {
    if (this.cacheable) {
        this.cacheable();
    }

    let modulePackage = modulePackages.find(({ dir }) => this.resourcePath.startsWith(dir + sep));
    if (modulePackage) {
        this.callback(undefined, exposeModule(modulePackage, this.resourcePath, source), sourceMap);
        return;
    }
    const searchString = sep + 'node_modules';
    const index = this.resourcePath.lastIndexOf(searchString);
    if (index !== -1) {
        const nodeModulesPath = this.resourcePath.substring(0, index + searchString.length);
        let dir = this.resourcePath;
        while ((dir = dirname(dir)) !== nodeModulesPath) {
            try {
                const { name } = require(join(dir, 'package.json'));
                modulePackage = { name, dir };
                modulePackages.push(modulePackage);
                this.callback(undefined, exposeModule(modulePackage, this.resourcePath, source), sourceMap);
                return;
            } catch {
                /** no-op */
            }
        }
    }
    this.callback(undefined, source, sourceMap);
};
