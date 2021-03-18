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

import { resolve as pResolve } from 'path';
import { existsSync } from 'fs-extra';
import { ChildProcess, ForkOptions, spawn as cpSpawn, fork as cpFork, SpawnOptions } from 'child_process';
import { ApplicationPackage } from '@theia/application-package';

export class ApplicationProcess {

    protected readonly defaultOptions = {
        cwd: this.pck.projectPath,
        env: process.env
    };

    constructor(
        protected readonly pck: ApplicationPackage,
        protected readonly binProjectPath: string
    ) { }

    spawn(command: string, args?: string[], options?: SpawnOptions): ChildProcess {
        return cpSpawn(command, args || [], Object.assign({}, this.defaultOptions, options));
    }

    fork(modulePath: string, args?: string[], options?: ForkOptions): ChildProcess {
        return cpFork(modulePath, args, Object.assign({}, this.defaultOptions, options));
    }

    canRun(command: string): boolean {
        return existsSync(this.resolveBin(command));
    }

    run(command: string, args: string[], options?: SpawnOptions): Promise<void> {
        const commandProcess = this.spawnBin(command, args, options);
        return this.promisify(command, commandProcess);
    }

    spawnBin(command: string, args: string[], options?: SpawnOptions): ChildProcess {
        const binPath = this.resolveBin(command);
        return this.spawn(binPath, args, options);
    }

    protected resolveBin(command: string): string {
        const commandPath = pResolve(this.binProjectPath, 'node_modules', '.bin', command);
        return process.platform === 'win32' ? commandPath + '.cmd' : commandPath;
    }

    protected promisify(command: string, p: ChildProcess): Promise<void> {
        return new Promise((resolve, reject) => {
            p.stdout!.on('data', data => this.pck.log(data.toString()));
            p.stderr!.on('data', data => this.pck.error(data.toString()));
            p.on('error', reject);
            p.on('close', (code, signal) => {
                if (signal) {
                    reject(new Error(`${command} exited with an unexpected signal: ${signal}.`));
                    return;
                }
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`${command} exited with an unexpected code: ${code}.`));
                }
            });
        });
    }

}
