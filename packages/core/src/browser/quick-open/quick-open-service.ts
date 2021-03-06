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

import { injectable } from 'inversify';
import { QuickOpenModel } from '../../common/quick-open-model';
import { MessageType } from '../../common/message-service-protocol';
import { QuickOpenHideReason, QuickOpenOptions } from '../../common/quick-open-service';
import { QuickOpenItem } from '../../common/quick-open-model';
import { Emitter } from '../../common/event';

@injectable()
export class QuickOpenService {

    /**
     * Dom node of the QuickOpenWidget
     */
    widgetNode: HTMLElement;

    protected readonly onDidChangeActiveEmitter = new Emitter<QuickOpenItem[]>();
    readonly onDidChangeActive = this.onDidChangeActiveEmitter.event;
    getActive(): QuickOpenItem[] {
        return [];
    }

    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    open(model: QuickOpenModel, options?: QuickOpenOptions): void { }
    hide(reason?: QuickOpenHideReason): void { }
    showDecoration(type: MessageType): void { }
    hideDecoration(): void { }
    refresh(): void { }

}
