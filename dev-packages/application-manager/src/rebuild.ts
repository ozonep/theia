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

import { existsSync, removeSync, copySync, readdirSync, lstatSync } from 'fs-extra';
import { join } from 'path';

export function rebuild(target: 'browser', modules: string[] | undefined): void {
    const nodeModulesPath = join(process.cwd(), 'node_modules');
    const browserModulesPath = join(process.cwd(), '.browser_modules');

    if (target === 'browser' && existsSync(browserModulesPath)) {
        for (const moduleName of collectModulePaths(browserModulesPath)) {
            console.log('Reverting ' + moduleName);
            const src = join(browserModulesPath, moduleName);
            const dest = join(nodeModulesPath, moduleName);
            removeSync(dest);
            copySync(src, dest);
        }
        removeSync(browserModulesPath);
    } else {
        console.log('native node modules are already rebuilt for ' + target);
    }
}

function collectModulePaths(root: string): string[] {
    const moduleRelativePaths: string[] = [];
    for (const dirName of readdirSync(root)) {
        if (existsSync(join(root, dirName, 'package.json'))) {
            moduleRelativePaths.push(dirName);
        } else if (lstatSync(join(root, dirName)).isDirectory()) {
            moduleRelativePaths.push(...collectModulePaths(join(root, dirName)).map(p => join(dirName, p)));
        }
    }
    return moduleRelativePaths;
}
