/********************************************************************************
 * Copyright (C) 2018 Red Hat, Inc. and others.
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

import { injectable } from '@theia/core/shared/inversify';
import { existsSync, createWriteStream, mkdirSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, resolve as pResolve, basename } from 'path';
import { URL } from 'url';
import * as request from 'request';

import { PluginDeployerResolver, PluginDeployerResolverContext } from '../../common';

/**
 * Resolver that handle the http(s): protocol
 * http://path/to/my.plugin
 * https://path/to/my.plugin
 */
@injectable()
export class HttpPluginDeployerResolver implements PluginDeployerResolver {

    private unpackedFolder: string;

    constructor() {
        this.unpackedFolder = pResolve(tmpdir(), 'http-remote');
        if (!existsSync(this.unpackedFolder)) {
            mkdirSync(this.unpackedFolder);
        }
    }

    /**
     * Grab the remote file specified by the given URL
     */
    async resolve(pluginResolverContext: PluginDeployerResolverContext): Promise<void> {

        // download the file
        return new Promise<void>((resolve, reject) => {

            // keep filename of the url
            const urlPath = pluginResolverContext.getOriginId();
            const link = new URL(urlPath);
            if (!link.pathname) {
                reject(new Error('invalid link URI' + urlPath));
                return;
            }

            const idirname = dirname(link.pathname);
            const ibasename = basename(link.pathname);
            const filename = idirname.replace(/\W/g, '_') + ('-') + ibasename;
            const unpackedPath = pResolve(this.unpackedFolder, basename(filename));

            const finish = () => {
                pluginResolverContext.addPlugin(pluginResolverContext.getOriginId(), unpackedPath);
                resolve();
            };

            // use of cache. If file is already there use it directly
            if (existsSync(unpackedPath)) {
                finish();
                return;
            }
            const dest = createWriteStream(unpackedPath);

            dest.addListener('finish', finish);
            request.get(pluginResolverContext.getOriginId())
                .on('error', err => {
                    reject(err);
                }).pipe(dest);
        });

    }

    /**
     * Handle only the plugins that starts with http or https:
     */
    accept(pluginId: string): boolean {
        return /^http[s]?:\/\/.*$/gm.test(pluginId);
    }
}
