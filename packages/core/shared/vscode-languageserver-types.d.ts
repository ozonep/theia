export declare type DocumentUri = string;
export interface Position {
    line: number;
    character: number;
}
export declare namespace Position {
    function create(line: number, character: number): Position;
    function is(value: any): value is Position;
}
export interface Range {
    start: Position;
    end: Position;
}
export declare namespace Range {
    function create(start: Position, end: Position): Range;
    function create(startLine: number, startCharacter: number, endLine: number, endCharacter: number): Range;
    function is(value: any): value is Range;
}
export interface Location {
    uri: DocumentUri;
    range: Range;
}
export declare namespace Location {
    function create(uri: DocumentUri, range: Range): Location;
    function is(value: any): value is Location;
}
export interface LocationLink {
    originSelectionRange?: Range;
    targetUri: DocumentUri;
    targetRange: Range;
    targetSelectionRange: Range;
}
export declare namespace LocationLink {
    function create(targetUri: DocumentUri, targetRange: Range, targetSelectionRange: Range, originSelectionRange?: Range): LocationLink;
    function is(value: any): value is LocationLink;
}
export interface Color {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;
}
export declare namespace Color {
    function create(red: number, green: number, blue: number, alpha: number): Color;
    function is(value: any): value is Color;
}
export interface ColorInformation {
    range: Range;
    color: Color;
}
export declare namespace ColorInformation {
    function create(range: Range, color: Color): ColorInformation;
    function is(value: any): value is ColorInformation;
}
export interface ColorPresentation {
    label: string;
    textEdit?: TextEdit;
    additionalTextEdits?: TextEdit[];
}
export declare namespace ColorPresentation {
    function create(label: string, textEdit?: TextEdit, additionalTextEdits?: TextEdit[]): ColorPresentation;
    function is(value: any): value is ColorPresentation;
}
export declare enum FoldingRangeKind {
    Comment = "comment",
    Imports = "imports",
    Region = "region"
}
export interface FoldingRange {
    startLine: number;
    startCharacter?: number;
    endLine: number;
    endCharacter?: number;
    kind?: string;
}
export declare namespace FoldingRange {
    function create(startLine: number, endLine: number, startCharacter?: number, endCharacter?: number, kind?: string): FoldingRange;
    function is(value: any): value is FoldingRange;
}
export interface DiagnosticRelatedInformation {
    location: Location;
    message: string;
}
export declare namespace DiagnosticRelatedInformation {
    function create(location: Location, message: string): DiagnosticRelatedInformation;
    function is(value: any): value is DiagnosticRelatedInformation;
}
export declare namespace DiagnosticSeverity {
    const Error: 1;
    const Warning: 2;
    const Information: 3;
    const Hint: 4;
}
export declare type DiagnosticSeverity = 1 | 2 | 3 | 4;
export declare namespace DiagnosticTag {
    const Unnecessary: 1;
    const Deprecated: 2;
}
export declare type DiagnosticTag = 1 | 2;
export interface Diagnostic {
    range: Range;
    severity?: DiagnosticSeverity;
    code?: number | string;
    source?: string;
    message: string;
    tags?: DiagnosticTag[];
    relatedInformation?: DiagnosticRelatedInformation[];
}
export declare namespace Diagnostic {
    function create(range: Range, message: string, severity?: DiagnosticSeverity, code?: number | string, source?: string, relatedInformation?: DiagnosticRelatedInformation[]): Diagnostic;
    function is(value: any): value is Diagnostic;
}
export interface Command {
    title: string;
    command: string;
    arguments?: any[];
}
export declare namespace Command {
    function create(title: string, command: string, ...args: any[]): Command;
    function is(value: any): value is Command;
}
export interface TextEdit {
    range: Range;
    newText: string;
}
export declare namespace TextEdit {
    function replace(range: Range, newText: string): TextEdit;
    function insert(position: Position, newText: string): TextEdit;
    function del(range: Range): TextEdit;
    function is(value: any): value is TextEdit;
}
export interface TextDocumentEdit {
    textDocument: VersionedTextDocumentIdentifier;
    edits: TextEdit[];
}
export declare namespace TextDocumentEdit {
    function create(textDocument: VersionedTextDocumentIdentifier, edits: TextEdit[]): TextDocumentEdit;
    function is(value: any): value is TextDocumentEdit;
}
interface ResourceOperation {
    kind: string;
}
export interface CreateFileOptions {
    overwrite?: boolean;
    ignoreIfExists?: boolean;
}
export interface CreateFile extends ResourceOperation {
    kind: 'create';
    uri: DocumentUri;
    options?: CreateFileOptions;
}
export declare namespace CreateFile {
    function create(uri: DocumentUri, options?: CreateFileOptions): CreateFile;
    function is(value: any): value is CreateFile;
}
export interface RenameFileOptions {
    overwrite?: boolean;
    ignoreIfExists?: boolean;
}
export interface RenameFile extends ResourceOperation {
    kind: 'rename';
    oldUri: DocumentUri;
    newUri: DocumentUri;
    options?: RenameFileOptions;
}
export declare namespace RenameFile {
    function create(oldUri: DocumentUri, newUri: DocumentUri, options?: RenameFileOptions): RenameFile;
    function is(value: any): value is RenameFile;
}
export interface DeleteFileOptions {
    recursive?: boolean;
    ignoreIfNotExists?: boolean;
}
export interface DeleteFile extends ResourceOperation {
    kind: 'delete';
    uri: DocumentUri;
    options?: DeleteFileOptions;
}
export declare namespace DeleteFile {
    function create(uri: DocumentUri, options?: DeleteFileOptions): DeleteFile;
    function is(value: any): value is DeleteFile;
}
export interface WorkspaceEdit {
    changes?: {
        [uri: string]: TextEdit[];
    };
    documentChanges?: (TextDocumentEdit | CreateFile | RenameFile | DeleteFile)[];
}
export declare namespace WorkspaceEdit {
    function is(value: any): value is WorkspaceEdit;
}
export interface TextEditChange {
    all(): TextEdit[];
    clear(): void;
    add(edit: TextEdit): void;
    insert(position: Position, newText: string): void;
    replace(range: Range, newText: string): void;
    delete(range: Range): void;
}
export declare class WorkspaceChange {
    private _workspaceEdit;
    private _textEditChanges;
    constructor(workspaceEdit?: WorkspaceEdit);
    get edit(): WorkspaceEdit;
    getTextEditChange(textDocument: VersionedTextDocumentIdentifier): TextEditChange;
    getTextEditChange(uri: DocumentUri): TextEditChange;
    createFile(uri: DocumentUri, options?: CreateFileOptions): void;
    renameFile(oldUri: DocumentUri, newUri: DocumentUri, options?: RenameFileOptions): void;
    deleteFile(uri: DocumentUri, options?: DeleteFileOptions): void;
    private checkDocumentChanges;
}
export interface TextDocumentIdentifier {
    uri: DocumentUri;
}
export declare namespace TextDocumentIdentifier {
    function create(uri: DocumentUri): TextDocumentIdentifier;
    function is(value: any): value is TextDocumentIdentifier;
}
export interface VersionedTextDocumentIdentifier extends TextDocumentIdentifier {
    version: number | null;
}
export declare namespace VersionedTextDocumentIdentifier {
    function create(uri: DocumentUri, version: number | null): VersionedTextDocumentIdentifier;
    function is(value: any): value is VersionedTextDocumentIdentifier;
}
export interface TextDocumentItem {
    uri: DocumentUri;
    languageId: string;
    version: number;
    text: string;
}
export declare namespace TextDocumentItem {
    function create(uri: DocumentUri, languageId: string, version: number, text: string): TextDocumentItem;
    function is(value: any): value is TextDocumentItem;
}
export declare namespace MarkupKind {
    const PlainText: 'plaintext';
    const Markdown: 'markdown';
}
export declare type MarkupKind = 'plaintext' | 'markdown';
export declare namespace MarkupKind {
    function is(value: any): value is MarkupKind;
}
export interface MarkupContent {
    kind: MarkupKind;
    value: string;
}
export declare namespace MarkupContent {
    function is(value: any): value is MarkupContent;
}
export declare namespace CompletionItemKind {
    const Text: 1;
    const Method: 2;
    const Function: 3;
    const Constructor: 4;
    const Field: 5;
    const Variable: 6;
    const Class: 7;
    const Interface: 8;
    const Module: 9;
    const Property: 10;
    const Unit: 11;
    const Value: 12;
    const Enum: 13;
    const Keyword: 14;
    const Snippet: 15;
    const Color: 16;
    const File: 17;
    const Reference: 18;
    const Folder: 19;
    const EnumMember: 20;
    const Constant: 21;
    const Struct: 22;
    const Event: 23;
    const Operator: 24;
    const TypeParameter: 25;
}
export declare type CompletionItemKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
export declare namespace InsertTextFormat {
    const PlainText: 1;
    const Snippet: 2;
}
export declare type InsertTextFormat = 1 | 2;
export declare namespace CompletionItemTag {
    const Deprecated = 1;
}
export declare type CompletionItemTag = 1;
export interface CompletionItem {
    label: string;
    kind?: CompletionItemKind;
    tags?: CompletionItemTag[];
    detail?: string;
    documentation?: string | MarkupContent;
    deprecated?: boolean;
    preselect?: boolean;
    sortText?: string;
    filterText?: string;
    insertText?: string;
    insertTextFormat?: InsertTextFormat;
    textEdit?: TextEdit;
    additionalTextEdits?: TextEdit[];
    commitCharacters?: string[];
    command?: Command;
    data?: any;
}
export declare namespace CompletionItem {
    function create(label: string): CompletionItem;
}
export interface CompletionList {
    isIncomplete: boolean;
    items: CompletionItem[];
}
export declare namespace CompletionList {
    function create(items?: CompletionItem[], isIncomplete?: boolean): CompletionList;
}
export declare type MarkedString = string | {
    language: string;
    value: string;
};
export declare namespace MarkedString {
    function fromPlainText(plainText: string): string;
    function is(value: any): value is MarkedString;
}
export interface Hover {
    contents: MarkupContent | MarkedString | MarkedString[];
    range?: Range;
}
export declare namespace Hover {
    function is(value: any): value is Hover;
}
export interface ParameterInformation {
    label: string | [number, number];
    documentation?: string | MarkupContent;
}
export declare namespace ParameterInformation {
    function create(label: string | [number, number], documentation?: string): ParameterInformation;
}
export interface SignatureInformation {
    label: string;
    documentation?: string | MarkupContent;
    parameters?: ParameterInformation[];
}
export declare namespace SignatureInformation {
    function create(label: string, documentation?: string, ...parameters: ParameterInformation[]): SignatureInformation;
}
export interface SignatureHelp {
    signatures: SignatureInformation[];
    activeSignature: number | null;
    activeParameter: number | null;
}
export declare type Definition = Location | Location[];
export declare type DefinitionLink = LocationLink;
export declare type Declaration = Location | Location[];
export declare type DeclarationLink = LocationLink;
export interface ReferenceContext {
    includeDeclaration: boolean;
}
export declare namespace DocumentHighlightKind {
    const Text: 1;
    const Read: 2;
    const Write: 3;
}
export declare type DocumentHighlightKind = 1 | 2 | 3;
export interface DocumentHighlight {
    range: Range;
    kind?: DocumentHighlightKind;
}
export declare namespace DocumentHighlight {
    function create(range: Range, kind?: DocumentHighlightKind): DocumentHighlight;
}
export declare namespace SymbolKind {
    const File: 1;
    const Module: 2;
    const Namespace: 3;
    const Package: 4;
    const Class: 5;
    const Method: 6;
    const Property: 7;
    const Field: 8;
    const Constructor: 9;
    const Enum: 10;
    const Interface: 11;
    const Function: 12;
    const Variable: 13;
    const Constant: 14;
    const String: 15;
    const Number: 16;
    const Boolean: 17;
    const Array: 18;
    const Object: 19;
    const Key: 20;
    const Null: 21;
    const EnumMember: 22;
    const Struct: 23;
    const Event: 24;
    const Operator: 25;
    const TypeParameter: 26;
}
export declare type SymbolKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26;
export declare namespace SymbolTag {
    const Deprecated: 1;
}
export declare type SymbolTag = 1;
export interface SymbolInformation {
    name: string;
    kind: SymbolKind;
    deprecated?: boolean;
    location: Location;
    containerName?: string;
}
export declare namespace SymbolInformation {
    function create(name: string, kind: SymbolKind, range: Range, uri?: string, containerName?: string): SymbolInformation;
}
export interface DocumentSymbol {
    name: string;
    detail?: string;
    kind: SymbolKind;
    deprecated?: boolean;
    range: Range;
    selectionRange: Range;
    children?: DocumentSymbol[];
}
export declare namespace DocumentSymbol {
    function create(name: string, detail: string | undefined, kind: SymbolKind, range: Range, selectionRange: Range, children?: DocumentSymbol[]): DocumentSymbol;
    function is(value: any): value is DocumentSymbol;
}
export declare type CodeActionKind = string;
export declare namespace CodeActionKind {
    const Empty: CodeActionKind;
    const QuickFix: CodeActionKind;
    const Refactor: CodeActionKind;
    const RefactorExtract: CodeActionKind;
    const RefactorInline: CodeActionKind;
    const RefactorRewrite: CodeActionKind;
    const Source: CodeActionKind;
    const SourceOrganizeImports: CodeActionKind;
    const SourceFixAll: CodeActionKind;
}
export interface CodeActionContext {
    diagnostics: Diagnostic[];
    only?: CodeActionKind[];
}
export declare namespace CodeActionContext {
    function create(diagnostics: Diagnostic[], only?: CodeActionKind[]): CodeActionContext;
    function is(value: any): value is CodeActionContext;
}
export interface CodeAction {
    title: string;
    kind?: CodeActionKind;
    diagnostics?: Diagnostic[];
    isPreferred?: boolean;
    edit?: WorkspaceEdit;
    command?: Command;
}
export declare namespace CodeAction {
    function create(title: string, command: Command, kind?: CodeActionKind): CodeAction;
    function create(title: string, edit: WorkspaceEdit, kind?: CodeActionKind): CodeAction;
    function is(value: any): value is CodeAction;
}
export interface CodeLens {
    range: Range;
    command?: Command;
    data?: any;
}
export declare namespace CodeLens {
    function create(range: Range, data?: any): CodeLens;
    function is(value: any): value is CodeLens;
}
export interface FormattingOptions {
    tabSize: number;
    insertSpaces: boolean;
    trimTrailingWhitespace?: boolean;
    insertFinalNewline?: boolean;
    trimFinalNewlines?: boolean;
    [key: string]: boolean | number | string | undefined;
}
export declare namespace FormattingOptions {
    function create(tabSize: number, insertSpaces: boolean): FormattingOptions;
    function is(value: any): value is FormattingOptions;
}
export interface DocumentLink {
    range: Range;
    target?: string;
    tooltip?: string;
    data?: any;
}
export declare namespace DocumentLink {
    function create(range: Range, target?: string, data?: any): DocumentLink;
    function is(value: any): value is DocumentLink;
}
export interface SelectionRange {
    range: Range;
    parent?: SelectionRange;
}
export declare namespace SelectionRange {
    function create(range: Range, parent?: SelectionRange): SelectionRange;
    function is(value: any): value is SelectionRange;
}
export declare const EOL: string[];
export interface TextDocument {
    readonly uri: DocumentUri;
    readonly languageId: string;
    readonly version: number;
    getText(range?: Range): string;
    positionAt(offset: number): Position;
    offsetAt(position: Position): number;
    readonly lineCount: number;
}
export declare namespace TextDocument {
    function create(uri: DocumentUri, languageId: string, version: number, content: string): TextDocument;
    function is(value: any): value is TextDocument;
    function applyEdits(document: TextDocument, edits: TextEdit[]): string;
}
export interface TextDocumentChangeEvent {
    document: TextDocument;
}
export interface TextDocumentWillSaveEvent {
    document: TextDocument;
    reason: 1 | 2 | 3;
}
export { };
