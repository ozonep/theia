/********************************************************************************
 * Copyright (C) 2018 Ericsson and others.
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

import { interfaces } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution, isBasicWasmSupported } from '@theia/core/lib/browser';
import { bindContributionProvider } from '@theia/core';
import { TextmateRegistry } from './textmate-registry';
import { LanguageGrammarDefinitionContribution } from './textmate-contribution';
import { MonacoTextmateService, OnigasmPromise } from './monaco-textmate-service';
import { MonacoThemeRegistry, OnigPromise } from './monaco-theme-registry';
import { IOnigLib } from 'vscode-textmate';
import { loadWASM, OnigScanner, OnigString } from 'vscode-oniguruma';

// eslint-disable-next-line no-null/no-null
let onigurumaLib: Promise<IOnigLib> | null = null;

async function fetchOnigasm(): Promise<ArrayBuffer> {
    const onigasmPath = require('vscode-oniguruma/release/onig.wasm');
    const response = await fetch(onigasmPath);
    if (response.status === 200) {
        return response.arrayBuffer();
    } else {
        throw new Error('Could not fetch onigasm');
    }
}

async function getOnigasm(): Promise<IOnigLib> {
    if (!onigurumaLib) {
        const wasmBin = await fetchOnigasm(); // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onigurumaLib = loadWASM(wasmBin).then((_: any) => ({
            createOnigScanner(patterns: string[]): OnigScanner { return new OnigScanner(patterns); },
            createOnigString(s: string): OnigString { return new OnigString(s); }
        }));
    }
    return onigurumaLib;
}

export default (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
    const onigasmPromise: Promise<IOnigLib> = isBasicWasmSupported ? getOnigasm() : Promise.reject(new Error('wasm not supported'));
    bind(OnigasmPromise).toConstantValue(onigasmPromise);
    bind(OnigPromise).toConstantValue(onigasmPromise);
    bind(MonacoTextmateService).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(MonacoTextmateService);
    bindContributionProvider(bind, LanguageGrammarDefinitionContribution);
    bind(TextmateRegistry).toSelf().inSingletonScope();
    bind(MonacoThemeRegistry).toDynamicValue(() => MonacoThemeRegistry.SINGLETON).inSingletonScope();
};
