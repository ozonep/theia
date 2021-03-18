/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
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

import { dirname, join } from 'path';
import { randomBytes } from 'crypto';
import { outputFile, appendFile, move, unlink } from '@theia/core/shared/fs-extra';
import { Buffer } from 'buffer';
import { Disposable } from '@theia/core/lib/common/disposable';
import { FileUri } from '@theia/core/lib/node/file-uri';

export class NodeFileUpload implements Disposable {

    readonly id: string;
    readonly fsPath: string;
    readonly uploadPath: string;
    protected _uploadedBytes = 0;
    get uploadedBytes(): number {
        return this._uploadedBytes;
    }

    constructor(
        readonly uri: string,
        readonly size: number
    ) {
        this.fsPath = FileUri.fsPath(uri);
        this.id = 'theia_upload_' + randomBytes(16).toString('hex');
        this.uploadPath = join(dirname(this.fsPath), this.id);
    }

    async create(): Promise<void> {
        await outputFile(this.uploadPath, '');
    }

    async append(chunk: ArrayBuffer): Promise<void> {
        await appendFile(this.uploadPath, Buffer.from(chunk));
        this._uploadedBytes += chunk.byteLength;
    }

    async rename(): Promise<void> {
        await move(this.uploadPath, this.fsPath, { overwrite: true });
        this.dispose = () => Promise.resolve();
    }

    dispose(): void {
        unlink(this.uploadPath).catch(() => {/* no-op */ });
    }

}
