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

import { Event } from '../../common/event';

export interface NewWindowOptions {
    readonly external?: boolean;
}

/**
 * Service for opening new browser windows.
 */
export const WindowService = Symbol('WindowService');
export interface WindowService {

    openNewWindow(url: string, options?: NewWindowOptions): undefined;

    /**
     * Called when the `window` is about to `unload` its resources.
     * At this point, the `document` is still visible and the [`BeforeUnloadEvent`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)
     * event will be canceled if the return value of this method is `false`.
     */
    canUnload(): boolean;

    /**
     * Fires when the `window` unloads. The unload event is inevitable. On this event, the frontend application can save its state and release resource.
     * Saving the state and releasing any resources must be a synchronous call. Any asynchronous calls invoked after emitting this event might be ignored.
     */
    readonly onUnload: Event<void>;

}
